<template>
  <div class="historyData">
    <van-row class="header">
      <van-row class="title"> {{ $t("history.title") }} </van-row>
    </van-row>
    <van-tabs v-model:active="active" class="tabs">
      <van-tab title="BMS"><BMS></BMS> </van-tab>
      <van-tab title="PCS"><PCS></PCS></van-tab>
      <van-tab title="BCMS"><BCMS></BCMS></van-tab>
      <van-tab title="BMU"><BMU></BMU></van-tab>
      <van-tab title="Meter"><Meter></Meter></van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import BMS from "../HistoryTabsPage/bms.vue";
import PCS from "../HistoryTabsPage/pcs.vue";
import BCMS from "../HistoryTabsPage/bcms.vue";
import BMU from "../HistoryTabsPage/bmu.vue";
import Meter from "../HistoryTabsPage/meter.vue";
const active = ref();
</script>

<style lang="less" scoped>
.historyData {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: var(--TotalEvent-image);
  background-repeat: no-repeat;
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
.tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  :deep(.van-tabs__wrap) {
    .van-tabs__nav {
      background-color: transparent;
      .van-tab {
        font-size: 34px;
        color: var(--text-color);
      }

      .van-tab--active {
        color: #40e2c1;
      }
      .van-tabs__line {
        background: #40e2c1;
      }
    }
  }
  :deep(.van-tabs__content) {
    flex: 1;
    overflow: hidden;
    padding-top: 18px;
    overflow: hidden;
    .van-tab__panel {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
