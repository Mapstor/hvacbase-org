import fs from 'node:fs';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
const files = process.argv.slice(2);
let fail = 0;
for (const f of files) {
  let raw = fs.readFileSync(f, 'utf8');
  const body = raw.replace(/^---\n[\s\S]*?\n---/, ''); // strip frontmatter
  // strip import lines (bare specifiers fine for compile, but @/ alias not resolvable; compile doesn't resolve imports)
  try {
    await compile(body, { remarkPlugins: [remarkGfm], jsx: true });
    console.log('OK  ', f);
  } catch (e) {
    fail++;
    console.log('FAIL', f, '->', e.message.split('\n')[0]);
  }
}
process.exit(fail ? 1 : 0);
