<template>
  <div class="indexPage">
    <div class="views">
      <router-view v-slot="{ Component }">
        <transition :name="transition_name">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <FooterPage />
  </div>
</template>

<script setup>
import FooterPage from "@components/Footer/Footer.vue";
import { ref, onBeforeMount, watchEffect } from "vue";
import router from "../router/index.js";
import useSessionStorage from "@/store/modules/sessionStorage";

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
</script>

<style scoped lang="less">
.indexPage {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .views {
    flex: 1;
    overflow: auto;
  }
  .footerPage {
    background-color: var(--footer-bg);
    // position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
  }
}
</style>
