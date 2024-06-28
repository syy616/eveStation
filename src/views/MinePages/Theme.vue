<template>
  <div class="language">
    <van-nav-bar
      :title="$t('mine.theme')"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-radio-group v-model="checked" @change="languageChange">
      <van-cell-group inset>
        <van-cell title="暗色主题" clickable @click="checked = 'dark'">
          <template #right-icon>
            <van-radio name="dark" />
          </template>
        </van-cell>
        <van-cell title="亮色主题" clickable @click="checked = 'light'">
          <template #right-icon>
            <van-radio name="light" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useLocalStorage from "@/store/modules/localStorage";
//返回事件
const onClickLeft = () => history.back();

const store = useLocalStorage();
const checked = ref(store.theme);
const languageChange = () => store.setTheme(checked.value);
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
</style>
