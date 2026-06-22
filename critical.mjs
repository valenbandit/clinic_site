import { generate } from 'critical';
import { readdir } from 'fs/promises';
import path from 'path';

const pages = [
  { src: 'index.html',              dest: 'index.html' },
  { src: 'career.html',             dest: 'career.html' },
  { src: 'hakomi.html',             dest: 'hakomi.html' },
  { src: 'psychotherapy.html',      dest: 'psychotherapy.html' },
  { src: 'depression-anxiety.html', dest: 'depression-anxiety.html' },
  { src: 'relationships.html',      dest: 'relationships.html' },
  { src: 'young-adults.html',       dest: 'young-adults.html' },
  { src: 'trauma.html',             dest: 'trauma.html' },
  { src: 'mindfulness.html',        dest: 'mindfulness.html' },
  { src: 'accessibility.html',      dest: 'accessibility.html' },
  { src: 'privacy-policy.html',     dest: 'privacy-policy.html' },
];

for (const page of pages) {
  console.log(`Processing: ${page.src}`);
  try {
    await generate({
      base: './',
      src: page.src,
      target: page.dest,
      inline: true,
      dimensions: [
        { width: 375, height: 812 },   // mobile
        { width: 1280, height: 900 },  // desktop
      ],
      css: ['assets/tailwind.css', 'assets/shared.css'],
    });
    console.log(`  done: ${page.dest}`);
  } catch (err) {
    console.error(`  error: ${page.src}`, err.message);
  }
}

console.log('All pages processed.');
