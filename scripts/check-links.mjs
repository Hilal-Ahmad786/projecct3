
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';
const START_URLS = [`${BASE_URL}/en`, `${BASE_URL}/en/services`];
const MAX_DEPTH = 3;
const CONCURRENT_REQUESTS = 5;

const visited = new Set();
const queue = [...START_URLS.map(url => ({ url, depth: 0 }))];
const brokenLinks = [];
const localLinkRegex = /href=["']((?:\/|http:\/\/localhost:3000)[^"']*)["']/g;

console.log('Starting link check...');

async function checkUrl(url, fromUrl) {
    if (visited.has(url)) return;
    visited.add(url);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                console.error(`❌ Broken link: ${url} (found on ${fromUrl})`);
                brokenLinks.push({ url, from: fromUrl, status: response.status });
            } else {
                console.warn(`⚠️  Status ${response.status}: ${url} (found on ${fromUrl})`);
            }
            return;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) return;

        const text = await response.text();
        let match;
        while ((match = localLinkRegex.exec(text)) !== null) {
            let nextUrl = match[1];

            // Normalize URL
            if (nextUrl.startsWith('/')) {
                nextUrl = `${BASE_URL}${nextUrl}`;
            }

            // Remove anchors
            nextUrl = nextUrl.split('#')[0];

            if (nextUrl.startsWith(BASE_URL) && !visited.has(nextUrl)) {
                queue.push({ url: nextUrl, depth: 0, from: url }); // We treat depth differently in simple queue, but this is fine for now
            }
        }

    } catch (error) {
        console.error(`Error checking ${url}:`, error.message);
        brokenLinks.push({ url, from: fromUrl, error: error.message });
    }
}

async function processQueue() {
    // Simple BFS with limit
    // To make it robust we would execute strictly, but let's just do a limited crawl
    // Actually, simple sequential or small batch is better to not kill the dev server

    // We'll just run until queue empty, but let's restrict to internal links discovery
    // The queue will grow as we find new links.

    let processedCount = 0;

    while (queue.length > 0) {
        const currentBatch = queue.splice(0, CONCURRENT_REQUESTS);
        const promises = currentBatch.map(item => checkUrl(item.url, item.from || 'START'));
        await Promise.all(promises);
        processedCount += currentBatch.length;
        if (processedCount % 10 === 0) process.stdout.write(`Processed ${processedCount} pages...\r`);

        // Limit total pages to avoid infinite loops on calendars/filters etc if any
        if (processedCount > 500) {
            console.log('\nReached document limit (500). Stopping.');
            break;
        }
    }

    console.log('\n\n--- Scan Complete ---');
    if (brokenLinks.length === 0) {
        console.log('✅ No broken links found!');
    } else {
        console.log(`❌ Found ${brokenLinks.length} broken links:`);
        brokenLinks.forEach(link => {
            console.log(`- ${link.url} (Status: ${link.status || link.error}) linked from ${link.from}`);
        });
    }
}

processQueue();
