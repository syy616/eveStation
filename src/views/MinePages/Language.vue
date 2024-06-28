<template>
  <div class="language">
    <van-nav-bar
      :title="$t('mine.language')"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-radio-group v-model="checked" @change="languageChange">
      <van-cell-group inset>
        <van-cell title="简体中文" clickable @click="checked = 'cn'">
          <template #right-icon>
            <van-radio name="cn" />
          </template>
        </van-cell>
        <van-cell title="English" clickable @click="checked = 'en'">
          <template #right-icon>
            <van-radio name="en" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-button block @click="handleClick">确 认</van-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useLocalStorage from "@/store/modules/localStorage";
//返回事件
const onClickLeft = () => history.back();

const store = useLocalStorage();
const checked = ref(store.language);
const languageChange = () => store.setLanguage(checked.value);
const handleClick = () => window.location.reload();
</script>

<style lang="less" scoped>
.language {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background-size: 100%;
}
.van-nav-bar {
  background-color: transparent;
  border: none;
  :deep(.van-nav-bar__content) {
    // display: none;
    .van-haptics-feedback {
      .van-icon {
        font-size: 36px;
        color: var(--text-color);
      }
    }
    .van-nav-bar__title {
      color: var(--text-color);
    }
  }
}
.van-hairline--bottom::after {
  width: 0;
}
.van-radio-group {
  padding: 24px 0;
  .van-cell-group {
    margin: 0;
    border-radius: 0;
    background-color: transparent;
    .van-cell {
      background-color: transparent;
      color: var(--text-color);
      :deep(.van-icon) {
        background-color: transparent;
        border: none;
      }
    }
    :deep(.van-radio__icon--checked) {
      .van-icon-success {
        color: var(--text-color);
      }
    }
  }
}
.van-button {
  width: calc(100% - 48px);
  height: 64px;
  border: none;
  background-color: #40e2c1;
  margin: 0 24px;
  box-sizing: border-box;
  :deep(.van-button__content) {
    .van-button__text {
      // color: var(--text-color);
      color: #fff;
      font-size: 28px;
      font-weight: 600;
    }
  }
}
</style>
