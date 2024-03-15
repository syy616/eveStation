import { defineStore } from "pinia";

let userInfo = JSON.parse(localStorage.getItem("userInfo"));

//声明了一个useUserStore方法
const useLocalStorage = defineStore("localStorage", {
  //准备state——用于存储数据
  state: () => {
    return {
      userInfo: userInfo || "",
    };
  },
  getters: {},

  //准备actions——用于响应组件中的动作和用于操作数据（state）,pinia中只有state、getter、action，抛弃了Vuex中的Mutation
  actions: {
    setUserInfo(info) {
      this.userInfo = info;
      localStorage.setItem("userInfo", JSON.stringify(info));
      return this.userInfo;
    },
  },
});
export default useLocalStorage;
