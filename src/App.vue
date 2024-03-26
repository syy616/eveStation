<script setup>
import { onMounted, onBeforeMount } from "vue";
import useLocalStorage from "@/store/modules/localStorage";
const store = useLocalStorage();
import { useI18n } from 'vue-i18n'
const { t,locale } = useI18n();
onBeforeMount(() => {
  let theme = store.theme;
  document.getElementById("app").setAttribute("data-theme", theme);
});
const selectLanguage =()=>{
    let lang = window.localStorage.getItem("lang");
    lang=='cn'?window.localStorage.setItem("lang", 'en'):window.localStorage.setItem("lang", 'cn');
    lang=='cn'?locale.value = 'en':locale.value = 'cn';
}
</script>

<template>
  <div class="indexHome">
    <!-- <van-button class="btn" type="primary" @click = "selectLanguage">切换语言</van-button> -->
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.indexHome {
  width: 100%;
  height: 100%;
  // font-family: "Hiragino Sans GB" !important;
  .btn{
    margin-top:65px;
  }
}
</style>
