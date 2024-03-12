/* eslint-disable no-console */

import { register } from "register-service-worker";
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    if (process.env.NODE_ENV === "production") {
      register(`${window.location.origin}/service-worker.js`, {
        ready() {
          console.log(
            "App is being served from cache by a service worker.\n" +
              "For more details, visit https://goo.gl/AFskqB"
          );
        },
        registered() {
          console.log("Service worker has been registered.");
        },
        cached() {
          console.log("Content has been cached for offline use.");
        },
        updatefound() {
          console.log("New content is downloading.");
        },
        updated() {
          console.log("New content is available; please refresh.");
        },
        offline() {
          console.log(
            "No internet connection found. App is running in offline mode."
          );
        },
        error(error) {
          console.error("Error during service worker registration:", error);
        },
      });
    }
  });
}
// 「弹出添加到主屏对话框」事件
window.addEventListener("beforeinstallprompt", (event) => {
  // 这个 `event.userChoice` 是一个 Promise ，在用户选择后 resolve
  event.userChoice.then((result) => {
    console.log(result.outcome);
    // 'accepted': 添加到主屏
    // 'dismissed': 用户不想理你并向你扔了个取消
  });
});
