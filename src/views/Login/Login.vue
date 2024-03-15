<template>
  <div class="login">
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
      router.push("/IndexPage");
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
  .login-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: 450px;
    box-sizing: border-box;

    .title-logo {
      height: 140px;
      margin-left: 32px;
      background-size: 100%;
      div {
        display: flex;
        img {
          height: 70px;
          width: 200px;
        }
      }
      span {
        font-weight: 600;
        font-size: 44px;
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
      }
      .submit-button {
        margin-top: 30px;
        width: 100%;
        background-color: #40e2c1;
        border-color: #40e2c1;
        :deep(.van-button__content) {
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
