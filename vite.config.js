import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Phone-first web app. `host: true` lets you open it on your actual iPhone
// over the local network (Vite prints a Network URL when you run `npm run dev`).
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
})
