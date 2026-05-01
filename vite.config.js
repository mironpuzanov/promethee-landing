import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2018",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/promethee.js",
        chunkFileNames: "assets/promethee-[name].js",
        assetFileNames: (info) => {
          if (info.name && info.name.endsWith(".css")) return "assets/promethee.css";
          return "assets/[name][extname]";
        },
      },
    },
  },
});
