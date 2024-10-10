import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: "widget-chatbot.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'widget-chatbot.css'; 
          }
          return 'assets/[name]-[hash][extname]'; 
        },
      },
    },
  },
});
