#!/usr/bin/env node

/**
 * Translation Audit Script
 * Scans the codebase for hardcoded text and missing translations
 *
 * Usage: node scripts/find-untranslated.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  srcDir: path.join(__dirname, '..', 'src'),
  localesDir: path.join(__dirname, '..', 'src', 'locales'),
  languages: ['en', 'tr', 'de', 'ur', 'ar'],
  baseLanguage: 'en',
  // File extensions to scan
  extensions: ['.tsx', '.jsx', '.ts', '.js'],
  // Directories to skip
  skipDirs: ['node_modules', '.next', 'dist', '.git'],
  // Patterns that indicate translated text (should NOT flag these)
  translationPatterns: [
    /\bt\s*\(\s*['"]/,           // t('key') or t("key")
    /\bt\s*\(\s*`/,              // t(`key`)
    /useTranslations/,           // Using translation hook
    /useSectionTranslations/,    // Using section translation hook
    /\{t\(/,                     // {t( in JSX
  ],
  // Patterns to detect hardcoded text in JSX
  hardcodedPatterns: [
    // Text between JSX tags (excluding variables and expressions)
    />([A-Z][a-zA-Z\s]{2,})</g,
    // Common UI text patterns
    />\s*(Submit|Cancel|Save|Delete|Edit|Add|Remove|Close|Open|View|Learn More|Read More|Get Started|Contact Us|Sign In|Sign Up|Log In|Log Out)\s*</gi,
  ],
  // Minimum string length to consider
  minStringLength: 3,
  // Strings to ignore (common non-translatable content)
  ignoreStrings: [
    'use client',
    'use server',
    'className',
    'onClick',
    'onChange',
    'onSubmit',
    'href',
    'src',
    'alt',
    'id',
    'key',
    'ref',
    'style',
    'type',
    'name',
    'value',
    'placeholder',
    'div',
    'span',
    'button',
    'input',
    'form',
    'section',
    'article',
    'header',
    'footer',
    'nav',
    'main',
    'aside',
    'null',
    'undefined',
    'true',
    'false',
    'px',
    'rem',
    'em',
    '%',
    'flex',
    'grid',
    'block',
    'inline',
    'relative',
    'absolute',
    'fixed',
    'hidden',
    'visible',
    'auto',
    'none',
    'inherit',
    'initial',
    'rgba',
    'rgb',
    'hsl',
    'hsla',
    '#',
    'http',
    'https',
    'mailto',
    'tel',
    'localhost',
    'svg',
    'path',
    'circle',
    'rect',
    'polygon',
    'line',
    'polyline',
    'g',
    'defs',
    'pattern',
    'linearGradient',
    'radialGradient',
    'stop',
    'mask',
    'clipPath',
    'use',
    'symbol',
    'image',
    'text',
    'tspan',
    'textPath',
    'switch',
    'foreignObject',
    'desc',
    'title',
    'metadata',
    'motion',
    'animate',
    'animateMotion',
    'animateTransform',
    'set',
    'mpath',
    'Link',
    'Image',
    'motion.div',
    'motion.span',
    'motion.section',
    'AnimatePresence',
    'Suspense',
    'Fragment',
    'React',
    'useState',
    'useEffect',
    'useRef',
    'useMemo',
    'useCallback',
    'useContext',
    'useReducer',
    'memo',
    'forwardRef',
    'lazy',
    'createContext',
    'createRef',
    'cloneElement',
    'isValidElement',
    'Children',
    'Component',
    'PureComponent',
    'StrictMode',
    'Profiler',
    'import',
    'export',
    'default',
    'from',
    'as',
    'const',
    'let',
    'var',
    'function',
    'return',
    'if',
    'else',
    'for',
    'while',
    'do',
    'switch',
    'case',
    'break',
    'continue',
    'try',
    'catch',
    'finally',
    'throw',
    'new',
    'this',
    'super',
    'class',
    'extends',
    'implements',
    'interface',
    'type',
    'enum',
    'namespace',
    'module',
    'declare',
    'abstract',
    'readonly',
    'private',
    'protected',
    'public',
    'static',
    'async',
    'await',
    'yield',
    'typeof',
    'instanceof',
    'in',
    'of',
    'delete',
    'void',
    'never',
    'unknown',
    'any',
    'string',
    'number',
    'boolean',
    'object',
    'symbol',
    'bigint',
    'undefined',
    'null',
    'NaN',
    'Infinity',
    'Array',
    'Object',
    'String',
    'Number',
    'Boolean',
    'Function',
    'Symbol',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'Promise',
    'Proxy',
    'Reflect',
    'Error',
    'TypeError',
    'ReferenceError',
    'SyntaxError',
    'RangeError',
    'EvalError',
    'URIError',
    'JSON',
    'Math',
    'Date',
    'RegExp',
    'console',
    'window',
    'document',
    'navigator',
    'location',
    'history',
    'localStorage',
    'sessionStorage',
    'fetch',
    'XMLHttpRequest',
    'FormData',
    'URLSearchParams',
    'URL',
    'Blob',
    'File',
    'FileReader',
    'ArrayBuffer',
    'DataView',
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array',
  ],
  // Additional patterns to ignore (regex)
  ignorePatterns: [
    /^[0-9.,\s%$€£¥₹+-/*=<>!&|^~?:;@#]+$/,  // Numbers and symbols only
    /^[a-z_][a-z0-9_]*$/i,                    // Variable names
    /^(sm|md|lg|xl|2xl|xs)$/,                 // Tailwind breakpoints
    /^(primary|secondary|tertiary|accent|muted|destructive)$/,  // Color variants
    /^(top|bottom|left|right|center|start|end|between|around|evenly)$/, // Position/alignment
    /^\d+(\.\d+)?(px|rem|em|%|vh|vw|deg|s|ms)?$/, // CSS values
    /^#[0-9a-fA-F]{3,8}$/,                    // Hex colors
    /^rgba?\([^)]+\)$/,                       // RGB colors
    /^hsla?\([^)]+\)$/,                       // HSL colors
    /^[A-Z][a-z]+Icon$/,                      // Icon component names
    /^(get|set|is|has|can|should|will|did|on|handle)[A-Z]/,  // Method names
    /^\$\{.*\}$/,                             // Template literal expressions
    /^\/[^\/]+/,                              // Paths starting with /
    /^\.[a-z]+$/i,                            // File extensions
    /^(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)$/, // HTTP methods
    /^[a-z]+:\/\//i,                          // URLs with protocol
  ],
};

// Results storage
const results = {
  hardcodedStrings: [],
  missingTranslations: [],
  unusedTranslationKeys: [],
  filesScanned: 0,
  totalHardcoded: 0,
  summary: {},
};

// Load translation files
function loadTranslations() {
  const translations = {};
  for (const lang of CONFIG.languages) {
    const filePath = path.join(CONFIG.localesDir, `${lang}.json`);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      translations[lang] = JSON.parse(content);
    } catch (error) {
      console.error(`Error loading ${lang}.json:`, error.message);
      translations[lang] = {};
    }
  }
  return translations;
}

// Get all keys from a nested object
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Check if a string should be ignored
function shouldIgnoreString(str) {
  const trimmed = str.trim();

  // Check minimum length
  if (trimmed.length < CONFIG.minStringLength) return true;

  // Check if in ignore list
  if (CONFIG.ignoreStrings.some(ignore =>
    trimmed.toLowerCase() === ignore.toLowerCase()
  )) return true;

  // Check against ignore patterns
  if (CONFIG.ignorePatterns.some(pattern => pattern.test(trimmed))) return true;

  // Check if it's all lowercase with underscores/hyphens (likely a key or class name)
  if (/^[a-z][a-z0-9_-]*$/.test(trimmed)) return true;

  // Check if it's a Tailwind class pattern
  if (/^[a-z]+-[a-z0-9-]+$/.test(trimmed)) return true;

  return false;
}

// Check if line uses translation
function usesTranslation(line) {
  return CONFIG.translationPatterns.some(pattern => pattern.test(line));
}

// Extract hardcoded strings from a file
function extractHardcodedStrings(filePath, content) {
  const findings = [];
  const lines = content.split('\n');

  lines.forEach((line, lineIndex) => {
    const lineNum = lineIndex + 1;

    // Skip lines that use translation functions
    if (usesTranslation(line)) return;

    // Skip import/export statements
    if (/^\s*(import|export)\s/.test(line)) return;

    // Skip comments
    if (/^\s*(\/\/|\/\*|\*)/.test(line)) return;

    // Skip console statements
    if (/console\.(log|warn|error|info|debug)/.test(line)) return;

    // Pattern 1: Text content between JSX tags
    // Matches: >Some Text< or >Some Text</Tag>
    const jsxTextPattern = />([^<>{}`]+)</g;
    let match;
    while ((match = jsxTextPattern.exec(line)) !== null) {
      const text = match[1].trim();
      if (text && !shouldIgnoreString(text) && /[A-Za-z]{2,}/.test(text)) {
        // Check if it looks like user-facing text (has spaces or starts with capital)
        if (/\s/.test(text) || /^[A-Z]/.test(text)) {
          findings.push({
            file: filePath,
            line: lineNum,
            text: text,
            context: line.trim().substring(0, 100),
            type: 'jsx-text'
          });
        }
      }
    }

    // Pattern 2: String literals that look like UI text
    // Look for strings in common UI props
    const uiPropsPattern = /(title|label|placeholder|alt|aria-label|description|message|error|success|warning|info|hint|tooltip|buttonText|linkText|heading|subheading|caption)\s*[=:]\s*["'`]([^"'`]+)["'`]/gi;
    while ((match = uiPropsPattern.exec(line)) !== null) {
      const propName = match[1];
      const text = match[2].trim();
      if (text && !shouldIgnoreString(text) && /[A-Za-z]{2,}/.test(text)) {
        findings.push({
          file: filePath,
          line: lineNum,
          text: text,
          context: line.trim().substring(0, 100),
          type: `prop-${propName}`
        });
      }
    }

    // Pattern 3: Hardcoded strings in objects/arrays that look like UI content
    const objectStringPattern = /["']([A-Z][^"']*[a-z][^"']*)["']/g;
    while ((match = objectStringPattern.exec(line)) !== null) {
      const text = match[1].trim();
      // Only flag if it looks like a sentence or phrase (has space and not a key)
      if (text.includes(' ') && !shouldIgnoreString(text) && text.length > 10) {
        // Skip if it's a translation key pattern
        if (!/^[a-z]+\.[a-z]+/.test(text)) {
          findings.push({
            file: filePath,
            line: lineNum,
            text: text,
            context: line.trim().substring(0, 100),
            type: 'string-literal'
          });
        }
      }
    }
  });

  return findings;
}

// Scan a file for hardcoded strings
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(CONFIG.srcDir, filePath);

    const findings = extractHardcodedStrings(relativePath, content);

    if (findings.length > 0) {
      results.hardcodedStrings.push(...findings);
      results.totalHardcoded += findings.length;
    }

    results.filesScanned++;
  } catch (error) {
    console.error(`Error scanning ${filePath}:`, error.message);
  }
}

// Recursively scan directory
function scanDirectory(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (!CONFIG.skipDirs.includes(entry.name)) {
          scanDirectory(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (CONFIG.extensions.includes(ext)) {
          scanFile(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
}

// Compare translation keys across languages
function compareTranslations(translations) {
  const baseKeys = getAllKeys(translations[CONFIG.baseLanguage]);
  const missing = {};

  for (const lang of CONFIG.languages) {
    if (lang === CONFIG.baseLanguage) continue;

    const langKeys = getAllKeys(translations[lang]);
    const missingInLang = baseKeys.filter(key => !langKeys.includes(key));

    if (missingInLang.length > 0) {
      missing[lang] = missingInLang;
    }
  }

  return missing;
}

// Generate report
function generateReport() {
  const reportLines = [];

  reportLines.push('═'.repeat(80));
  reportLines.push('  TRANSLATION AUDIT REPORT');
  reportLines.push('═'.repeat(80));
  reportLines.push('');
  reportLines.push(`Generated: ${new Date().toISOString()}`);
  reportLines.push(`Files scanned: ${results.filesScanned}`);
  reportLines.push(`Total hardcoded strings found: ${results.totalHardcoded}`);
  reportLines.push('');

  // Group hardcoded strings by file
  const byFile = {};
  for (const finding of results.hardcodedStrings) {
    if (!byFile[finding.file]) {
      byFile[finding.file] = [];
    }
    byFile[finding.file].push(finding);
  }

  reportLines.push('─'.repeat(80));
  reportLines.push('  HARDCODED STRINGS BY FILE');
  reportLines.push('─'.repeat(80));
  reportLines.push('');

  // Sort files by number of findings (most first)
  const sortedFiles = Object.entries(byFile)
    .sort((a, b) => b[1].length - a[1].length);

  for (const [file, findings] of sortedFiles) {
    reportLines.push(`\n📁 ${file} (${findings.length} issues)`);
    reportLines.push('-'.repeat(60));

    // Group by unique text to avoid duplicates
    const uniqueTexts = new Map();
    for (const f of findings) {
      const key = f.text;
      if (!uniqueTexts.has(key)) {
        uniqueTexts.set(key, []);
      }
      uniqueTexts.get(key).push(f.line);
    }

    for (const [text, lines] of uniqueTexts) {
      reportLines.push(`  Line ${lines.join(', ')}: "${text.substring(0, 60)}${text.length > 60 ? '...' : ''}"`);
    }
  }

  // Missing translations section
  if (Object.keys(results.missingTranslations).length > 0) {
    reportLines.push('\n');
    reportLines.push('─'.repeat(80));
    reportLines.push('  MISSING TRANSLATION KEYS');
    reportLines.push('─'.repeat(80));
    reportLines.push('');

    for (const [lang, keys] of Object.entries(results.missingTranslations)) {
      reportLines.push(`\n🌐 ${lang.toUpperCase()} - Missing ${keys.length} keys:`);
      reportLines.push('-'.repeat(40));
      for (const key of keys.slice(0, 50)) {  // Limit to first 50
        reportLines.push(`  - ${key}`);
      }
      if (keys.length > 50) {
        reportLines.push(`  ... and ${keys.length - 50} more`);
      }
    }
  }

  // Summary by component type
  reportLines.push('\n');
  reportLines.push('─'.repeat(80));
  reportLines.push('  SUMMARY BY DIRECTORY');
  reportLines.push('─'.repeat(80));
  reportLines.push('');

  const byDir = {};
  for (const finding of results.hardcodedStrings) {
    const dir = path.dirname(finding.file).split(path.sep)[0] || 'root';
    byDir[dir] = (byDir[dir] || 0) + 1;
  }

  const sortedDirs = Object.entries(byDir).sort((a, b) => b[1] - a[1]);
  for (const [dir, count] of sortedDirs) {
    const bar = '█'.repeat(Math.min(Math.ceil(count / 5), 40));
    reportLines.push(`  ${dir.padEnd(30)} ${String(count).padStart(4)} ${bar}`);
  }

  // Priority files to fix
  reportLines.push('\n');
  reportLines.push('─'.repeat(80));
  reportLines.push('  PRIORITY FILES TO FIX (Top 20)');
  reportLines.push('─'.repeat(80));
  reportLines.push('');

  for (const [file, findings] of sortedFiles.slice(0, 20)) {
    reportLines.push(`  ${findings.length.toString().padStart(3)} issues: ${file}`);
  }

  reportLines.push('\n');
  reportLines.push('═'.repeat(80));
  reportLines.push('  END OF REPORT');
  reportLines.push('═'.repeat(80));

  return reportLines.join('\n');
}

// Generate JSON report for programmatic use
function generateJsonReport() {
  const byFile = {};
  for (const finding of results.hardcodedStrings) {
    if (!byFile[finding.file]) {
      byFile[finding.file] = [];
    }
    byFile[finding.file].push({
      line: finding.line,
      text: finding.text,
      type: finding.type
    });
  }

  return {
    timestamp: new Date().toISOString(),
    summary: {
      filesScanned: results.filesScanned,
      totalHardcodedStrings: results.totalHardcoded,
      filesWithIssues: Object.keys(byFile).length,
      missingTranslationsByLanguage: Object.fromEntries(
        Object.entries(results.missingTranslations).map(([lang, keys]) => [lang, keys.length])
      )
    },
    hardcodedStringsByFile: byFile,
    missingTranslations: results.missingTranslations,
    priorityFiles: Object.entries(byFile)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 30)
      .map(([file, issues]) => ({ file, issueCount: issues.length }))
  };
}

// Main execution
async function main() {
  console.log('🔍 Starting translation audit...\n');

  // Load translations
  console.log('📚 Loading translation files...');
  const translations = loadTranslations();

  // Compare translations
  console.log('🔄 Comparing translations across languages...');
  results.missingTranslations = compareTranslations(translations);

  // Scan source files
  console.log('📂 Scanning source files for hardcoded strings...');
  scanDirectory(CONFIG.srcDir);

  // Generate reports
  console.log('\n📝 Generating reports...\n');

  const textReport = generateReport();
  const jsonReport = generateJsonReport();

  // Save reports
  const reportsDir = path.join(__dirname, '..', 'translation-audit');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  fs.writeFileSync(
    path.join(reportsDir, `audit-report-${timestamp}.txt`),
    textReport
  );

  fs.writeFileSync(
    path.join(reportsDir, `audit-report-${timestamp}.json`),
    JSON.stringify(jsonReport, null, 2)
  );

  fs.writeFileSync(
    path.join(reportsDir, 'latest-report.txt'),
    textReport
  );

  fs.writeFileSync(
    path.join(reportsDir, 'latest-report.json'),
    JSON.stringify(jsonReport, null, 2)
  );

  // Print summary to console
  console.log(textReport);

  console.log(`\n✅ Reports saved to: ${reportsDir}/`);
  console.log(`   - latest-report.txt`);
  console.log(`   - latest-report.json`);
}

main().catch(console.error);
