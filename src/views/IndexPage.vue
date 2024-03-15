<script setup>
import FooterPage from "@components/Footer/Footer.vue";
</script>

<template>
  <div class="indexPage">
    <router-view></router-view>
    <FooterPage />
  </div>
</template>
<style lang="less">
.indexPage {
  width: 100%;
  height: 100%;
  .footerPage {
    background-color: var(--footer-bg);
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
  }
}
</style>
