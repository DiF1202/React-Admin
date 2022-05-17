import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", //使用当前的IP地址，没有这个就是以localhost作为本地地址
    port: 3000, //端口号为3000
    open: false, //是否在默认浏览器中自动打开该地址
    proxy: {
      //使用代理
      "/ajax": {
        target: "https://m.maoyan.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
// target: "https://m.maoyan.com", // 需要跨域代理的本地路径
