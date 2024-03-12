<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="indexHome">
    <router-view></router-view>
    <!-- <van-button type="primary" class="btn">1</van-button>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>-->
  </div>
  <!-- <HelloWorld msg="Vite + Vue" />  -->
</template>

<style scoped lang="less">
.indexHome {
  width: 100%;
  height: 100%;
}
</style>
