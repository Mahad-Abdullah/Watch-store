import { globby } from 'globby';
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const IN = 'public/Images';
const OUT = 'public/opt-images';

await fs.mkdir(OUT, { recursive: true });
const files = await globby([`${IN}/**/*.{jpg,jpeg,png,webp}`]);

for (const f of files) {
  const rel = path.relative(IN, f);
  const dir = path.join(OUT, path.dirname(rel));
  await fs.mkdir(dir, { recursive: true });

  await sharp(f).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 72 })
    .toFile(path.join(dir, path.basename(rel, path.extname(rel)) + '-1000.webp'));

  await sharp(f).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 70 })
    .toFile(path.join(dir, path.basename(rel, path.extname(rel)) + '-1400.webp'));
  console.log('✔', rel);
}
