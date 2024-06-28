import { defineStore } from "pinia";

let route_transition_name =
  sessionStorage.getItem("route_transition_name") || "left";

const useSessionStorage = defineStore("sessionStorage", {
  //准备state——用于存储数据
  state: () => {
    return {
      route_transition_name: route_transition_name,
    };
  },
  getters: {},
  //准备actions——用于响应组件中的动作和用于操作数据（state）,pinia中只有state、getter、action，抛弃了Vuex中的Mutation
  actions: {
    setRoute_transition_name(info) {
      this.route_transition_name = info;
      sessionStorage.setItem("route_transition_name", JSON.stringify(info));
      return this.route_transition_name;
    },
  },
});
export default useSessionStorage;
