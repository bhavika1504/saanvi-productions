import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import ViteImagemin from "vite-plugin-imagemin";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },

  plugins: [
    react(),

    // Compress images automatically
    ViteImagemin({
      gifsicle: { optimizationLevel: 3 },
      mozjpeg: { quality: 75 },
      optipng: { optimizationLevel: 5 },
      webp: { quality: 75 },
    }),

    // Bundle analyzer (only in build mode)
    mode === "production" &&
    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    target: "es2020", // modern JS = smaller bundle
    sourcemap: false, // remove source maps in prod
    minify: "esbuild", // fastest minifier
    cssCodeSplit: true,

    // smarter chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
          vendor: ["lucide-react"],
        },
      },
    },

    chunkSizeWarningLimit: 600,
  },

  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
