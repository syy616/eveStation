<template>
  <div class="login safe-area-inset-bottom">
    <div class="login-content">
      <div class="title-logo">
        <div><img src="@/assets/images/login/eve_logo.png" alt="" /><br /></div>
        <span>{{ $t("login.welcome") }}</span>
      </div>
      <van-form class="form">
        <van-field
          v-model.trim="userInfo.uid"
          :label="$t('login.account')"
          type="text"
          :placeholder="$t('login.placeholder_label')"
        />
        <van-field
          v-model.trim="userInfo.pwd"
          :label="$t('login.password')"
          type="password"
          :placeholder="$t('login.placeholder_input')"
        />
        <van-checkbox class="remember-password" v-model="isRemember"
          >{{ $t("login.remmberPassord") }}
        </van-checkbox>
        <van-button class="submit-button" @click="onSubmit">{{
          $t("login.register")
        }}</van-button>
      </van-form>
      <div class="link-area">
        <span>{{ $t("login.tip") }}</span>
        <span class="link">{{ $t("login.linktext") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
//模块导入
import { ref, reactive } from "vue";
import { showFailToast } from "vant";
import _ from "lodash";
import { useRouter } from "vue-router";
import useLocalStorage from "@/store/modules/localStorage";
const store = useLocalStorage();
//生命周期
//  onMounted(() => console.log(store.userInfo));
//数据定义
const userInfo = reactive({ uid: "admin", pwd: "admin" });
//定义是否记住密码
const isRemember = ref(false);
const router = useRouter();

function onSubmit(params) {
  _.debounce(() => {
    if (!userInfo.uid || !userInfo.pwd) return;
    if (userInfo.uid != "admin" && userInfo.pwd != "admin") {
      return showFailToast("账号或密码错误！");
    } else {
      store.setUserInfo(userInfo);
      router.replace("/IndexPage");
    }
  }, 150)();
}
</script>

<style scoped lang="less">
.login {
    width: 100%;
    height: 100%;
    background: var(--login-bg-img) no-repeat;
    background-size: 100%;
    background-color: var(--bg-color);
    .login-content {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
          -ms-flex-direction: column;
              flex-direction: column;
      width: 100%;
      height: 100%;
      padding-top: 450px;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
  
      .title-logo {
        height: 140px;
        margin-left: 32px;
        background-size: 100%;
        div {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          img {
            height: 70px;
            width: 200px;
          }
        }
        span {
          font-weight: 600;
          font-size: 48px;
          font-style: normal;
          font-family: 'PingFang_Semibold';
          color: var(--text-color);
        }
      }
  
      .form {
        margin-top: 40px;
        padding: 0 24px;
        .van-field {
          margin-top: 2px;
          background-color: transparent;
  
          border: none;
          color: var(--text-color);
          :deep(.van-field__label),
          :deep(.van-field__value) {
            label {
              color: var(--text-color);
            }
            .van-field__body {
              .van-field__control {
                color: var(--text-color);
              }
              .van-field__control::-webkit-input-placeholder {
                color: var(--vant-placeholder); /* 设置 placeholder 的颜色 */
              }
              .van-field__control::-moz-placeholder {
                color: var(--vant-placeholder); /* 设置 placeholder 的颜色 */
              }
              .van-field__control:-ms-input-placeholder {
                color: var(--vant-placeholder); /* 设置 placeholder 的颜色 */
              }
              .van-field__control::-ms-input-placeholder {
                color: var(--vant-placeholder); /* 设置 placeholder 的颜色 */
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
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: right;
          -webkit-justify-content: right;
              -ms-flex-pack: right;
                  justify-content: right;
          -webkit-box-align: center;
          -webkit-align-items: center;
              -ms-flex-align: center;
                  align-items: center;
          margin-top: 30px;
  
          :deep(.van-checkbox__icon) {
            height: 34px;
            width: 34px;
            i {
              height: 34px;
              width: 34px;
              line-height: 34px;
              font-size: 28px;
            }
          }
          :deep(.van-checkbox__label) {
            font-size: 30px;
            line-height: 30px;
            color: var(--text-color);
          }
          :deep(.van-checkbox__icon--checked){
            .van-icon{
              background-color: #40e2c1;
            border-color: #40e2c1;
            }
          }
        }
        :deep(.submit-button) {
          margin-top: 30px;
          width: 100%;
          background-color: #40e2c1;
          border-color: #40e2c1;
          .van-button__content {
            .van-button__text {
              font-size: 32px;
              font-weight: 400;
              color: var(--text-color);
            }
          }
        }
      }
  
      .link-area {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
            -ms-flex: 1;
                flex: 1;
        min-height: 300px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: end;
        -webkit-align-items: flex-end;
            -ms-flex-align: end;
                align-items: flex-end;
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
