import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite"; // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import autoprefixer from "autoprefixer";
import postCssPxToRem from "postcss-pxtorem";
import { VantResolver } from "unplugin-vue-components/resolvers";
// import viteImagemin from 'vite-plugin-imagemin'
// import viteCompression from 'vite-plugin-compression'    //代码压缩
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VantResolver({
          importStyle: false,
        }),
      ],
    }),
    //图片压缩
    // viteImagemin({
    //   gifsicle: { // gif图片压缩
    //     optimizationLevel: 7, // 选择1到3之间的优化级别
    //     interlaced: false, // 隔行扫描gif进行渐进式渲染
    //     // colors: 2 // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
    //   },
    //   optipng: { // png
    //     optimizationLevel: 7, // 选择0到7之间的优化级别
    //   },
    //   mozjpeg: { // jpeg
    //     quality: 20, // 压缩质量，范围从0(最差)到100(最佳)。
    //   },
    //   pngquant: { // png
    //     quality: [0.8, 0.9], // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
    //     speed: 4, // 压缩速度，1(强力)到11(最快)
    //   },
    //   svgo: {  // svg压缩
    //     plugins: [
    //       {
    //         name: 'removeViewBox',
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false,
    //       },
    //     ],
    //   },
    // }),
    // viteCompression({
    //   //生成压缩包gz
    //   verbose: true,
    //   disable: false,
    //   threshold: 10240,
    //   algorithm: 'gzip',
    //   ext: '.gz',
    // }),
    // VitePWA({
    //   strategies: "injectManifest",
    //   injectRegister: false,
    //   srcDir: "src",
    //   filename: "service-worker.js",
    //   devOptions: {
    //     enabled: true,
    //     /* other options */
    //   },
    //   injectManifest: {
    //     injectionPoint: undefined,
    //   },
    //   // workbox: {
    //   //   globPatterns: ['**/*.{js,css,ico,png,svg}'],
    //   // },
    //   manifest: {
    //     name: "chatGPTdemo",
    //     short_name: "chatGPTdemo",
    //     icons: [
    //       { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
    //       { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
    //     ],
    //   },
    // }),
  ],
  build: {
    outDir: "dist", //指定打包输出路径
    assetsDir: "assets", //指定静态资源存放路径
    cssCodeSplit: false, //css代码拆分,禁用则所有样式保存在一个css里面
    sourcemap: false, //是否构建source map 文件,即是否在浏览器展示node_modules、src下的源文件
    // 生产环境取消 console
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    //会打包出 css js 等文件夹 目录显得清晰
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        // assetFileNames: '[ext]/[name]-[hash].[ext]'
        assetFileNames(assetInfo) {
          // 判断后缀分别放到不用的文件夹中
          if (assetInfo.name.endsWith(".css")) {
            return "assets/css/[name]-[hash].[ext]";
          }
          if (
            ["png", "jpg", "svg", "PNG"].some((ext) =>
              assetInfo.name.endsWith(ext)
            )
          ) {
            return "assets/img/[name]-[hash].[ext]";
          }
          if (
            ["ttf", "woff", "woff2"].some((ext) => assetInfo.name.endsWith(ext))
          ) {
            return "assets/fonts/[name]-[hash].[ext]";
          }
          return "assets/css/[name]-[hash].[ext]";
        },
      },
    },
    emptyOutDir: true, //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
  },
  css: {
    // postCss 共享配置
    postcss: {
      plugins: [
        //扩展插件
        autoprefixer({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
          ],
        }),
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue({ file }) {
            return file.indexOf("vant") !== -1 ? 37.5 : 75;
          }, // 75表示750设计稿，37.5表示375设计稿
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          // selectorBlackList: [".van"], // 过滤掉van-开头的class，不进行rem转换
          // exclude: "/node_modules", // 忽略包文件转换rem
        }),
      ],
    },
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/css/common.less";`,
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "~": path.resolve(__dirname, "./"),
      "@": fileURLToPath(new URL("./src", import.meta.url)), //"@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"), // 使用时为 "@components/HelloWorld.vue"
    },
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
  },
  //本地运行配置，以及反向代理配置
  server: {
    port: "9000",
    host: "0.0.0.0", //ip地址例如192.168.1.177
    open: true, //服务启动时自动在浏览器中打开应用
    https: false, // 是否开启 https
    // 反向代理配置
    proxy: {
      "/dev-api": {
        target: "http://10.100.111.7:8888/", //实际请求地址
        changeOrigin: true, //设置访问目标地址允许跨域
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
      "/prod-api": {
        target: "http://10.100.111.7:8888/",
        changeOrigin: true, ///设置访问目标地址允许跨域
        rewrite: (p) => p.replace(/^\/prod-api/, ""),
      },
    },
  },
});
