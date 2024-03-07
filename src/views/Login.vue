<script setup>
//模块导入
import { ref, onMounted, getCurrentInstance } from 'vue'
import { loginPage, test } from "@/api/index.js";
import { showToast } from 'vant';

//生命周期
onMounted(() => {


});

//数据定义
const userInfo = {
  token: "kkajxuahbn"
};

//方法

</script>

<template>
  <div class="login">
    <div class="login-content">
      <div class="title-logo">
      </div>

    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/login/bg.png") no-repeat;
  background-size: 100%;

  .login-content {
    width: 100%;
    height: 100%;
    padding-top: 450px;
    box-sizing: border-box;

    .title-logo {
      width: 367px;
      height: 140px;
      margin-left: 32px;
      background: url("@/assets/images/login/logo.png") no-repeat;
      background-size: 100%;
    }
  }

}
</style>
