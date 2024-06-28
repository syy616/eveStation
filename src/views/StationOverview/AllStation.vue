<script setup>
//数据导入
import { defineComponent, onMounted, getCurrentInstance, ref } from "vue";
import stationCard from "@components/StationCard/StationTabPage.vue";
import { useI18n } from "vue-i18n";
//data
const echarts =
  getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t } = useI18n();
const tabActive = ref(0);
const list = ref([
  {
    label: "亿纬锂能B区",
    id: 1,
    power: 12.1,
    dayCharge: 23223.32,
    dayDisCharge: 45656.37,
    capacity: 1333.23,
    addr: "广东省惠州市仲恺高新区回风8路2323号",
    state: 1,
    runTime: 349,
  },
  {
    label: "亿纬锂能B区",
    id: 2,
    power: 12.4,
    dayCharge: 23223.32,
    dayDisCharge: 45656.35,
    capacity: 1333.23,
    addr: "广东省惠州市仲恺高新区回风8路2323号",
    state: 2,
    runTime: 349,
  },
  {
    label: "亿纬锂能B区",
    id: 3,
    power: 12.35,
    dayCharge: 23223.32,
    dayDisCharge: 45656.35,
    capacity: 1333.23,
    addr: "广东省惠州市仲恺高新区回风8路2323号",
    state: 3,
    runTime: 349,
  },
  {
    label: "亿纬锂能B区",
    id: 4,
    power: 12.14,
    dayCharge: 23223.32,
    dayDisCharge: 45656.35,
    capacity: 1333.23,
    addr: "广东省惠州市仲恺高新区回风8路2323号",
    state: 5,
    runTime: 349,
  },
  {
    label: "亿纬锂能B区",
    id: 5,
    power: 12.26,
    dayCharge: 23223.32,
    dayDisCharge: 45656.35,
    capacity: 1333.23,
    addr: "广东省惠州市仲恺高新区回风8路2323号",
    state: 6,
    runTime: 349,
  },
  {
    label: "亿纬锂能B区",
    id: 6,
    power: 12.28,
    dayCharge: 23223.32,
    dayDisCharge: 45656.35,
    capacity: 1333.23,
    addr: "广东省惠州市仲恺高新区回风8路2323号",
    state: 4,
    runTime: 349,
  },
]);
const loading = ref(false);
const finished = ref(false);
const tabList = ref([
  { label: t("stationType.tab1"), id: 1, count: 107 },
  { label: t("stationType.tab2"), id: 2, count: 4 },
  { label: t("stationType.tab3"), id: 3, count: 35 },
  { label: t("stationType.tab4"), id: 4, count: 14 },
  { label: t("stationType.tab5"), id: 5, count: 26 },
  { label: t("stationType.tab6"), id: 6, count: 28 },
]);
//METHODS
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  finished.value = true;

  //   setTimeout(() => {
  //     for (let i = 0; i < 10; i++) {
  //       list.value.push(list.value.length + 1);
  //     }

  //     // 加载状态结束
  //     loading.value = false;

  //     // 数据全部加载完成
  //     if (list.value.length >= 40) {
  //       finished.value = true;
  //     }
  //   }, 4000);
};
</script>

<template>
  <div class="allStation">
    <div class="tabTypeBox">
      <stationCard></stationCard>
    </div>
  </div>
</template>
<style scoped lang="less">
.allStation {
  width: 100%;
  height: 100%;
  padding-top: 10px;

  :deep(.tabTypeBox) {
    .van-tabs {
      // width: 100%;
      // border-radius: 24px 24px 0 0;
      .van-tabs__wrap {
        height: 73px;

        .van-tabs__nav--card {
          border: none;
          background: none;

          .van-tab {
            color: var(--allStation-tab-title) !important;
            background: var(--allStation-tab2-bg) !important;
            margin-right: 10px;
            border: none;
            border-radius: 4px;
          }

          .van-tab--active {
            color: #ffffff !important;
            background-color: #40e2c1 !important;
          }
        }
      }
      .van-tabs__content {
        .van-tab__panel {
          .van-list {
            padding: 0 32px;
            .stationCard {
              height: 232px;
              background-color: var(--allStation-station-bg);
              margin-bottom: 24px;
              border-radius: 0px 50px 16px 16px;
              -webkit-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.15);
              box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.15);
            }
          }
        }
      }
    }
  }
}
</style>
