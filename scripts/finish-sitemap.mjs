import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const index = join(dist, 'sitemap-index.xml');

if (!existsSync(index)) {
  console.error('sitemap-index.xml was not generated');
  process.exit(1);
}

copyFileSync(index, join(dist, 'sitemap.xml'));
