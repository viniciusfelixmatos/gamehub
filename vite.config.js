import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy IGDB existente
      "/igdb": {
        target: "https://api.igdb.com/v4",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/igdb/, ""),
      },
      // Proxy para a Steam Web API (Conquistas e Estatísticas)
      "/steam": {
        target: "https://api.steampowered.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/steam/, ""),
      },
      // Proxy para a Steam Store API (Busca de Jogos e Preços)
      "/steam-store": {
        target: "https://store.steampowered.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/steam-store/, ""),
      },
    },
  },
});
