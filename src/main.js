import { createApp } from "vue";
import "./assets/fonts/font.css";
import "./themes/themes.css";
import "./themes/themes1.css";
import App from "./App.vue";
import "amfe-flexible/index.js"; //设置根字体
import router from "./router"; //路由
import i18n from "./local/index"; //多语言
import { Toast } from "vant";
import { Lazyload } from "vant";
import "vant/lib/index.css";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import pinia from "./store/index";
import * as echarts from "echarts";
import "echarts-liquidfill";
import "default-passive-events";
import { Locale } from "vant";
// 引入英文语言包
import enUS from "vant/es/locale/lang/en-US";

import "vxe-table/lib/style.css"; //vxe-table 样式

// Locale.use('en-US', enUS);
const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$i18n = i18n;
// app.config.globalProperties.$toast = showToast;

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register(
//     import.meta.env.MODE === "production"
//       ? "/service-worker.js"
//       : "/dev-sw.js?dev-sw"
//   );
// }
app.use(Lazyload, {
  lazyComponent: true,
});
app.use(i18n).use(router).use(pinia).use(Toast);
app.mount("#app");
// createApp(App).use(router).mount('#app')
