import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // Proxy API requests in development to your local backend
  //     '/api': {
  //       target: process.env.VITE_API_URL,
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')

  //     }
  //   }
  // },
  // define: {
  //   // You can expose the API URL to your frontend
  //   'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  // }
});
