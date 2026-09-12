import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  define: {
    'import.meta.env.VITE_CONTACT_ENDPOINT': JSON.stringify(
      command === 'serve' || mode === 'vercel' ? '/api/contact' : '/api/contact.php',
    ),
  },
  plugins: [react(), {
    name: 'lolipop-production-files',
    apply: 'build',
    generateBundle() {
      if (mode === 'vercel') return
      for (const fileName of ['.htaccess', 'api/contact.php']) {
        this.emitFile({
          type: 'asset', fileName,
          source: readFileSync(new URL(`./lolipop/${fileName}`, import.meta.url), 'utf8'),
        })
      }
    },
  }, {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        try {
          const api = await server.ssrLoadModule('/api/contact.ts')
          await api.default(req, res)
        } catch (error) { next(error) }
      })
    },
  }],
}))
