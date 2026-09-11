import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
const walk = (path) => readdirSync(new URL(path, root)).flatMap((name) => {
  const file = join(path, name)
  return statSync(new URL(file, root)).isDirectory() ? walk(file) : [file]
})
const files = walk('dist')
const expected = ['index.html', '.htaccess', 'api/contact.php', 'robots.txt', 'sitemap.xml', 'favicon.svg']
for (const path of expected) assert(files.includes(`dist/${path}`), `Missing ${path}`)
for (const file of files) {
  const relative = file.slice(5)
  assert(expected.includes(relative) || /^assets\/[\w.-]+\.(js|css|svg|png|webp|woff2?)$/.test(relative), `Unexpected upload file: ${relative}`)
}
assert.equal(read('dist/api/contact.php'), read('lolipop/api/contact.php'))
assert.equal(read('dist/.htaccess'), read('lolipop/.htaccess'))
const js = files.filter((file) => file.endsWith('.js')).map(read).join('\n')
assert(js.includes('/api/contact.php'), 'PHP endpoint missing from frontend')
assert(!js.includes('SMTP_PASS') && !js.includes('nodemailer'), 'Server code in browser bundle')
for (const file of ['dist/index.html', 'dist/robots.txt', 'dist/sitemap.xml']) {
  assert(!read(file).includes('teiresias-website-system.vercel.app'), `Old canonical in ${file}`)
  assert(read(file).includes('https://teiresias.jp'), `Production URL missing in ${file}`)
}
assert.equal((read('dist/sitemap.xml').match(/<loc>/g) || []).length, 9)
assert(js.includes('https://teiresias.jp'), 'Dynamic canonical missing')
console.log(`Lolipop dist verified (${files.length} files):\n${files.join('\n')}`)
