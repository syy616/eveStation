<template>
  <div class="indexHome">
    <router-view v-slot="{ Component }">
      <transition :name="transition_name">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, watchEffect } from "vue";
import router from "./router/index.js";
import useLocalStorage from "@/store/modules/localStorage";
import useSessionStorage from "@/store/modules/sessionStorage";
const store_local = useLocalStorage();
const store_session = useSessionStorage();

const transition_name = ref(store_session.route_transition_name);

router.beforeEach((to, from, next) => {
  let _id_to = to.meta.id || null;
  let _id_from = from.meta.id || null;
  if (_id_to > _id_from) {
    transition_name.value = "left";
    store_session.setRoute_transition_name("left");
  } else {
    transition_name.value = "right";
    store_session.setRoute_transition_name("right");
  }
  next();
});

onBeforeMount(() => {
  document.getElementById("app").setAttribute("data-theme", store_local.theme);
});
</script>

<style lang="less">
.indexHome {
  width: 100%;
  height: 100%;
  .btn {
    margin-top: 65px;
  }
}
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.left-enter-from {
  transform: translateX(750px);
}
.left-enter-active {
  transition: all 0.3s ease-out;
}

.right-enter-from {
  transform: translateX(-750px);
}
.right-enter-active {
  transition: all 0.3s ease-out;
}
</style>
