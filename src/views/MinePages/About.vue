<template>
  <div class="about">
    <van-nav-bar
      :title="$t('mine.aboutApp')"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
//返回事件
const onClickLeft = () => history.back();
</script>

<style lang="less" scoped>
.about {
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
</style>
