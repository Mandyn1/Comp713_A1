import { defineConfig } from 'vite';
import port from "../port-numbers.json" with { type: 'json' };

//pull from backend server rather than own server
export default defineConfig({
  server: {
    port: port.vite,
    proxy: {
      '/api': {
        target: 'http://localhost:' + port.gateway,
        changeOrigin: true,
      }
    }
  }
});
