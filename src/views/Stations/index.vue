<template>
  <div class="station">
    <van-row class="header">
      <span class="back" @click="router.go(-1)">
        <van-icon name="arrow-left"
      /></span>
      <van-row class="title">
        <span @click="StionSelect"
          >{{ fieldValue }}<van-icon name="play"
        /></span>
      </van-row>
    </van-row>
    <van-row class="banner">
      <div class="top-bg"></div>
    </van-row>
    <van-row class="sysChartBox">
      <div class="systemCount">
        <div class="sysCountTitle">{{ $t("station.chartTitle") }}</div>
        <div ref="sysCountChartBox" id="sysCountChart"></div>
      </div>
    </van-row>
    <van-row class="tabBox">
      <van-tabs class="tabFirst" v-model:active="tabActive" sticky>
        <van-tab name="system" :title="$t('station.system')">
          <system></system>
        </van-tab>
        <van-tab name="income" :title="$t('station.income')">
          <income></income>
        </van-tab>
        <van-tab name="energy" :title="$t('station.energy')">
          <energy></energy>
        </van-tab>
        <van-tab name="equipment" :title="$t('station.equipment')">
          <equipment></equipment>
        </van-tab>
      </van-tabs>
    </van-row>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="columns"
        :confirm-button-text="$t('station.confirm')"
        :cancel-button-text="$t('station.cancel')"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup>
//数据导入
import { onMounted, getCurrentInstance, ref, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import system from "./tabs/system.vue";
import income from "./tabs/income.vue";
import energy from "./tabs/energy.vue";
import equipment from "./tabs/equipment.vue";

const router = useRouter();

const echarts =
  getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t } = useI18n();
const tabActive = ref("system");

//methods
const sysCountChartBox = ref(null);
const systemCountChart = () => {
  let sysCountChart = echarts.init(sysCountChartBox.value);
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
          { value: 28, name: t("station.charge") }, //充电
          { value: 30, name: t("station.disCharge") }, //放电
          { value: 38, name: t("station.failure") }, //故障
          { value: 32, name: t("station.shutDown") }, //离网
          { value: 40, name: t("station.standby") }, //待机
        ],
      },
    ],
  });
  window.onresize = function () {
    sysCountChart.resize();
  };
};
//生命周期
onMounted(() => {
  nextTick(() => {
    systemCountChart();
  });
});

//切换场站相关
const columns = [
  { text: "亿纬时代", value: "亿纬时代" },
  { text: "亿纬锂能A区", value: "亿纬锂能A区" },
  { text: "亿纬锂能B区", value: "亿纬锂能B区" },
  { text: "亿纬动力9座", value: "亿纬动力9座" },
  { text: "亿纬锂能潼湖工厂", value: "亿纬锂能潼湖工厂" },
];

const fieldValue = ref("亿纬时代B区");
const showPicker = ref(false);
const StionSelect = () => {
  showPicker.value = true;
};

const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  fieldValue.value = selectedOptions[0].text;
};
</script>

<style scoped lang="less">
.station {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--stations-background-color);
  .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    background-color: var(--stations-head-color);
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
    margin-top: 20px;
    .top-bg {
      height: 584px !important;
      width: 100%;
      background: var(--stations-bg-img) no-repeat;
      background-size: 100%;
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
      padding: 24px;
      box-sizing: border-box;
      background: var(--stations-echart-bg);
      border-radius: 16px;
      border: 1px solid #b4b4b4;

      .sysCountTitle {
        color: var(--text-color);
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
    flex: 1;
    width: 100%;
    margin-top: 20px;
    background: #2c2c2c;
    border-radius: 24px 24px 0 0;
    background-color: transparent;
    :deep(.tabFirst) {
      width: 100%;
      border-radius: 24px 24px 0 0;
      background-color: var(--stations-tab-bg);
      //    .van-sticky {
      .van-tabs__wrap {
        height: 73px;

        .van-tabs__nav {
          background: transparent;

          .van-tab {
            border-radius: 16px;
            color: var(--text-color);
            background-color: transparent;
          }

          .van-tab--active {
            color: #40e2c1;
          }

          .van-tabs__line {
            background: #40e2c1;
          }
        }
      }
    }
  }
  .van-popup {
    .van-picker {
      background-color: var(--stations-van-picker-bg);
      :deep(.van-picker__toolbar) {
        border-bottom: 1px solid #8b8b8b;
        button {
          color: #40e2c1;
        }
        .van-picker__title {
          color: var(--text-color);
        }
      }
      :deep(.van-picker__columns) {
        background-color: var(--stations-van-picker-bg);

        .van-picker__mask {
          background-image: var(--stations-van-picker__mask);
        }
        .van-picker-column {
          .van-picker-column__item {
            color: var(--text-color);
          }
        }
      }
    }
  }
}
</style>
