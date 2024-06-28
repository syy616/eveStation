import { createI18n } from "vue-i18n";

// 导入你自己创建的语言 js 文件
import cn from "./cn";
import en from "./en";

// 创建 i18n 对象
const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
  locale: localStorage.getItem("language") || "cn",
  messages: {
    cn: cn,
    en,
  },
});

export default i18n;
