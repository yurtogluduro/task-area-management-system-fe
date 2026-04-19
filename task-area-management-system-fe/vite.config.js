import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cesium from "vite-plugin-cesium";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cesium(), // Bu satır dünyayı getirecek olan "sihirli" dokunuştur.
  ],
});
