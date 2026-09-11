import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
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
})
