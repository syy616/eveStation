<template>
  <div class="mypage">
    <van-row class="header">
      <van-row class="title"> {{ $t("mine.title") }} </van-row>
    </van-row>
    <van-row class="avatar">
      <van-image
        round
        width="10rem"
        height="10rem"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <span>{{ $t("mine.userName") }}</span>
    </van-row>
    <van-row class="list">
      <van-cell
        v-for="item in list"
        :title="item.label"
        class="collect"
        @click="listClick(item.pageUrl)"
      >
        <template #icon><img :src="item.icon" alt="" /></template>
        <template #right-icon><van-icon name="arrow" /></template>
      </van-cell>
    </van-row>
    <van-row class="logout">
      <span @click="popupShow = true">{{ $t("mine.logout") }}</span>
    </van-row>
    <van-popup v-model:show="popupShow" position="bottom">
      <van-col @click="router.replace('/login')">{{
        $t("mine.logout")
      }}</van-col>
      <van-divider />
      <van-col @click="popupShow = false">{{ $t("mine.cancel") }}</van-col>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
const router = useRouter();
const list = [
  {
    icon: new URL(`../../assets/images/mine/collect.png`, import.meta.url),
    label: t("mine.collect"),
    class: "collect",
    pageUrl: "/IndexPage/myPage/myCollect",
  },
  {
    icon: new URL(`../../assets/images/mine/language.png`, import.meta.url),
    label: t("mine.language"),
    class: "language",
    pageUrl: "/IndexPage/myPage/language",
  },
  {
    icon: new URL(`../../assets/images/mine/theme.png`, import.meta.url),
    label: t("mine.theme"),
    class: "theme",
    pageUrl: "/IndexPage/myPage/theme",
  },
  {
    icon: new URL(`../../assets/images/mine/aboutAPP.png`, import.meta.url),
    label: t("mine.aboutApp"),
    class: "about",
    pageUrl: "/IndexPage/myPage/aboutApp",
  },
];
const listClick = (url) => router.push(url);

// 退出登录逻辑
const popupShow = ref(false);
</script>

<style lang="less" scoped>
.mypage {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background-size: 100%;
}
.header {
  width: 100%;

  .title {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    line-height: 80px;
    text-align: center;
    font-size: 38px;
    color: var(--text-color);
  }
}
.avatar {
  display: flex;
  align-items: center;
  padding: 24px;
  height: 98px;
  .van-image {
    height: 98px !important;
    width: 98px !important;
    .van-image__img {
      height: 100%;
    }
  }
  span {
    margin-left: 24px;
    font-weight: 500;
    font-size: 34px;
    color: var(--text-color);
  }
}
.list {
  .van-cell {
    cursor: pointer;
    background-color: transparent;
    img {
      width: 42px;
      height: 42px;
    }
    :deep(.van-cell__title) {
      span {
        font-size: 34px;
      }
    }
    .van-icon {
      display: flex;
      align-items: center;
      color: var(--text-color);
      font-size: 34px;
    }
  }
  .van-cell::after {
    display: none;
  }
  .collect {
    :deep(.van-cell__left-icon) {
      color: #ffd338;
    }
  }
  .about {
    :deep(.van-cell__left-icon) {
      color: #1a6bee;
    }
  }
  :deep(.van-cell__title) {
    margin-left: 16px;
    span {
      font-size: 34px;
      color: var(--text-color);
    }
  }
}
.logout {
  width: calc(100% - 48px);
  padding: 10px;
  position: absolute;
  bottom: 25px;
  left: 50%;
  border-radius: 16px;
  transform: translate(-50%);
  font-size: 32px;
  background-color: #40e2ce;
  span {
    width: 100%;
    display: block;
    text-align: center;
    color: #fff;
    font-size: 34px;
  }
}
.van-popup {
  border-radius: 16px 16px 0 0;
  padding: 32px 16px;
  background-color: var(--logou-popup-bg);
  .van-col {
    text-align: center;
    font-size: 34px;
    color: var(--text-color);
  }
  .van-divider {
    margin: 24px 0;
  }
}
</style>
