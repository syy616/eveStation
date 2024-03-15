<template>
  <div class="station">
    <van-row class="header">
      <span class="back"> <van-icon name="arrow-left" /></span>
      <van-row class="title">
        <span>亿纬时代B区<van-icon name="play" /></span>
      </van-row>
    </van-row>
    <van-row class="banner">
      <img src="@/assets/images/station/Topo_dark.png" alt="" />
    </van-row>
    <van-row class="sysChartBox">
      <van-col span="24">
        <div class="systemCount">
          <div class="sysCountTitle">{{ $t("allStation.sysCount") }}</div>
          <div id="sysCountChart"></div>
        </div>
      </van-col>
    </van-row>
    <van-row class="tabBox">
      <van-tabs class="tabFirst" v-model:active="tabActive" sticky>
        <van-tab
          class="tabFirst"
          v-for="(item, index) in tabList"
          :title="item.label"
          :to="item.path"
        >
          <router-view></router-view>
        </van-tab>
      </van-tabs>
    </van-row>
  </div>
</template>

<script setup>
//数据导入
import { onMounted, getCurrentInstance, ref } from "vue";
import { useI18n } from "vue-i18n";

const echarts =
  getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t } = useI18n();
const tabActive = ref(0);
const tabList = ref([
  {
    label: t("allStation.tabTitle1"),
    name: "system",
    path: "/station/system",
  },
  {
    label: t("allStation.tabTitle2"),
    name: "income",
    path: "/station/income",
  },
  {
    label: t("allStation.tabTitle3"),
    name: "equipment",
    path: "/station/equipment",
  },
  {
    label: t("allStation.tabTitle3"),
    name: "energy",
    path: "/station/energy",
  },
]);

//生命周期
onMounted(() => systemCountChart());

//methods
const systemCountChart = () => {
  let sysCountChart = echarts.init(document.getElementById("sysCountChart"));
  sysCountChart.setOption({
    color: ["#2A83FF", "#FFBA00", "#FF616D", "#A9A9A9", "#20CFED"],
    series: [
      {
        name: t("allStation.sysCount"),
        type: "pie",
        radius: [0, 70],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 2,
        },
        label: {
          color: "inherit",
          formatter: "{b}: {c}",
        },
        labelLine: {
          showAbove: true,
          length: 15,
          length2: 10,
          lineStyle: {
            type: "dashed",
            width: 2,
          },
        },
        data: [
          { value: 28, name: t("allStation.stateCharge") },
          { value: 30, name: t("allStation.stateDisCharge") },
          { value: 40, name: t("allStation.stateFailure") },
          { value: 38, name: t("allStation.stateShutDown") },
          { value: 32, name: t("allStation.stateStandby") },
        ],
      },
    ],
  });
};
</script>

<style scoped lang="less">
.station {
  display: flex;
  flex-direction: column;
  .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    .back {
      height: 100%;
      position: absolute;
      left: 20px;
      display: flex;
      align-items: center;
      .van-icon {
        font-size: 38px;
        color: var(--text-color);
      }
    }
    .title {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
      line-height: 80px;
      text-align: center;
      font-size: 38px;
      color: var(--text-color);
      .van-icon {
        margin-left: 8px;
        font-size: 30px;
        transform: rotate(90deg);
      }
    }
  }
  .banner {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .sysChartBox {
    margin-top: -50px;
    padding: 0 24px;
    .systemCount {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 440px;
      background: #343434;
      border-radius: 16px 16px 16px 16px;
      padding: 24px;
      // padding-bottom: 10px;
      box-sizing: border-box;

      .sysCountTitle {
        color: var(--allStation-box-title-color);
        font-weight: 400;
        font-size: 28px;
      }

      #sysCountChart {
        flex: 1;
        height: 290px;
      }
    }
  }
  .tabBox {
    width: 100%;
    // min-height: calc(100% - 662px);
    height: 600px;
    margin-top: 20px;
    background: #2c2c2c;
    border-radius: 24px 24px 0 0;
    :deep(.tabFirst) {
      width: 100%;
      border-radius: 24px 24px 0 0;

      //    .van-sticky {
      .van-tabs__wrap {
        height: 73px;

        .van-tabs__nav {
          background: none;

          .van-tab {
            border-radius: 16px;
            color: var(--allStation-tab-title);
            background: var(--allStation-tab-bg);
          }

          .van-tab--active {
            color: #40e2c1;
          }

          .van-tabs__line {
            background: #40e2c1;
            // }
          }
        }
      }
    }
  }
}
</style>
