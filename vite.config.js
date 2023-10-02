import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";
import path from 'path';

export default defineConfig({
    envPrefix: 'REACT_APP_',
  build: {
    outDir: "build",
  },
  reoslve: {
    alias: {
        '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    envCompatible(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
});