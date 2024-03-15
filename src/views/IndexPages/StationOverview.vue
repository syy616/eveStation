<script setup>
//数据导入
import { defineComponent, onMounted, getCurrentInstance, ref } from "vue";
import TopTitle from "@components/TopTitle/TopTitle.vue";
import { useI18n } from "vue-i18n";
//data
const echarts =
  getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t } = useI18n();
const tabActive = ref(0);
const tabList = ref([
  {
    label: t("allStation.tabTitle1"),
    name: "station",
    path: "/IndexPage/StationOverview/allStation",
  },
  {
    label: t("allStation.tabTitle2"),
    name: "income",
    path: "/IndexPage/StationOverview/allProfit",
  },
  {
    label: t("allStation.tabTitle3"),
    name: "energy",
    path: "/IndexPage/StationOverview/allEnergy",
  },
]);

//生命周期
onMounted(() => {
  systemCountChart();
});

//methods
const systemCountChart = () => {
  let sysCountChart = echarts.init(document.getElementById("sysCountChart"));
  sysCountChart.setOption({
    color: ["#2A83FF", "#FFBA00", "#FF616D", "#A9A9A9", "#20CFED"],
    series: [
      {
        // name: i18n.t("menus.footer[0]"),
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

<template>
    <div class="stationOverview">
        <TopTitle />
        <van-row gutter="10" class="mainDataBox">
            <van-col span="12">
                <div class="allPowerData">
                    <div class="powerDataTitle">{{ $t('allStation.allCharge') }}</div>
                    <div class="powerData">9999.99 <span class="powerUnit">kWh</span></div>
                </div>
            </van-col>
            <van-col span="12">
                <div class="allPowerData">
                    <div class="powerDataTitle">{{ $t('allStation.allDisCharge') }}</div>
                    <div class="powerData">9999.99 <span class="powerUnit">kWh</span></div>
                </div>
            </van-col>
        </van-row>
        <van-row class="sysChartBox">
            <van-col span="24">
                <div class="systemCount">
                    <div class="sysCountTitle">{{ $t('allStation.sysCount') }}</div>
                    <div id="sysCountChart"></div>
                </div>
            </van-col>
        </van-row>
        <van-row class="tabBox">
            <van-tabs class="tabFirst" v-model:active="tabActive">
                <van-tab class="tabFirst" v-for="(item, index) in tabList" :title="item.label" :to="item.path">
                    <router-view></router-view>
                </van-tab>
            </van-tabs>
        </van-row>
    </div>
</template>
<style scoped lang="less">
.stationOverview {
  width: 100%;
  height: calc(100% - 88px);
  box-sizing: border-box;
  background: var(--topTitle-bg);

    .mainDataBox {
        padding: 88px 24px 0 24px;
        // margin-top: 88px;
        box-sizing: border-box;
    .allPowerData {
      height: 132px;
      background-color: var(--allStation-box-bg);
      border-radius: 16px 16px 16px 16px;
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.12),
        0px 4px 8px 0px rgba(0, 0, 0, 0.08),
        0px 1px 10px 0px rgba(0, 0, 0, 0.05);
      padding: 22px 24px;
      box-sizing: border-box;

      .powerDataTitle {
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 28px;
        color: var(--allStation-box-title-color);
      }

      .powerData {
        margin-top: 16px;
        font-weight: 500;
        font-size: 36px;
        color: var(--allStation-box-data-color);

        .powerUnit {
          color: var(--allStation-box-title-color);
          font-size: 22px;
          font-weight: 400;
        }
      }
    }
  }

  .sysChartBox {
    margin-top: 20px;
    padding: 0 24px;

    .systemCount {
      width: 100%;
      height: 380px;
      background: var(--allStation-system-chart-bg);
      border-radius: 16px 16px 16px 16px;
      padding: 24px;
      box-sizing: border-box;

      .sysCountTitle {
        color: var(--allStation-box-title-color);
        font-weight: 400;
        font-size: 28px;
      }

      #sysCountChart {
        height: 290px;
      }
    }
  }

  .tabBox {
    width: 100%;
    min-height: calc(100% - 662px);
    margin-top: 20px;
    background: var(--allStation-tab-bg);
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
