<template>
  <div class="login">
    <div class="login-content">
      <div class="title-logo"></div>
      <div class="form">
        <van-field
          v-model="userInfo.uid"
          label="账 号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="userInfo.pwd"
          label="密 码"
          placeholder="请输入密码"
        />
        <van-checkbox class="remember-password" v-model="isRemember"
          >记住密码
        </van-checkbox>
        <van-button class="submit-button">登 录</van-button>
      </div>
      <div class="link-area">
        <span>暂无账户？</span> <span class="link">请联系管理员开通</span>
      </div>
    </div>
  </div>
</template>

<script setup>
//模块导入
import { ref, onMounted, getCurrentInstance } from "vue";
import { loginPage, test } from "@/api/index.js";
import { showToast } from "vant";
//生命周期
onMounted(() => {});

//数据定义
const userInfo = ref({ uid: null, pwd: null });
//定义是否记住密码
const isRemember = ref(true);
//方法
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: var(--login-bg-img) no-repeat;
  background-size: 100%;
  .login-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: 450px;
    box-sizing: border-box;

    .title-logo {
      width: 367px;
      height: 140px;
      margin-left: 32px;
      background: var(--login-logo-img) no-repeat;
      background-size: 100%;
    }

    .form {
      margin-top: 30px;
      padding: 0 24px;

      .van-field {
        margin-top: 2px;
        background-color: transparent;

        border: none;
        color: var(--text-color);
        :deep .van-field__label,
        :deep .van-field__value {
          label {
            color: var(--text-color);
          }
          .van-field__body {
            .van-field__control {
              color: var(--text-color);
            }
            .van-field__control::placeholder {
              color: var(--vant-placeholder); /* 设置 placeholder 的颜色 */
            }
          }
        }
      }
      .van-cell::after {
        border-color: var(--vant-cell-border);
      }
      .remember-password {
        display: flex;
        justify-content: right;
        align-items: center;
        margin-top: 30px;

        :deep .van-checkbox__icon {
          height: 34px;
          width: 34px;
          i {
            height: 34px;
            width: 34px;
            line-height: 34px;
            font-size: 28px;
          }
        }
        :deep .van-checkbox__label {
          font-size: 30px;
          line-height: 30px;
          color: var(--text-color);
        }
      }
      .submit-button {
        margin-top: 30px;
        width: 100%;
        background-color: #40e2c1;
        border-color: #40e2c1;
        :deep .van-button__content {
          .van-button__text {
            font-size: 32px;
            color: var(--text-color);
          }
        }
      }
    }

    .link-area {
      flex: 1;
      min-height: 300px;
      display: flex;
      justify-content: center;
      align-items: end;
      padding: 0 24px;
      padding-bottom: 20px;
      span {
        font-size: 24px;
        color: var(--text-color);
      }
      .link {
        color: #0052d9;
      }
    }
  }
}
</style>
