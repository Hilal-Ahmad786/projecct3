// Turkish title case for section headings, matching the e-commerce and
// corporate pages ("Ödeme, Kargo ve Sipariş Akışları", "Taşımayı mı
// Planlıyorsunuz?"). Conjunctions and question particles stay lowercase,
// brand names written in lowercase (ikas) are preserved, acronyms are kept.

const SMALL = new Set(['ve', 'veya', 'ile', 'ya', 'da', 'de', 'ki']);
const PARTICLE = /^m[iıuü](y[iıuü]m|s[iıuü]n|y[iıuü]z|s[iıuü]n[iıuü]z|d[iıuü]r|yd[iıuü])?[?!.,:]*$/;
const KEEP_LOWER = /^ikas/;

function upperFirst(word: string) {
  return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1);
}

export function trTitleCase(text: string) {
  return text.split(' ').map((word, index) => {
    if (!word || KEEP_LOWER.test(word) || /[A-ZÇĞİÖŞÜ]{2,}/.test(word)) return word;
    const bare = word.toLocaleLowerCase('tr-TR').replace(/[?!.,:;]+$/, '');
    if (index > 0 && (SMALL.has(bare) || PARTICLE.test(word))) return word;
    // Hyphenated compounds: "e-ticaret" → "E-Ticaret".
    return word.split('-').map(upperFirst).join('-');
  }).join(' ');
}
