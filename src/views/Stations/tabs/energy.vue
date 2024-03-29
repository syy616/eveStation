<template>
  <div class="energy">
    <van-row class="sys-energy">
      <van-row class="text-card">
        <van-row class="title"> {{ $t("energy.systemEnergy") }} </van-row>
        <van-row class="content" :gutter="[20, 10]">
          <van-col class="item" span="12">
            <div>{{ $t("energy.totleCharge") }}</div>
            <p>999.30<span>kWh</span></p>
          </van-col>
          <van-col class="item" span="12">
            <div>{{ $t("energy.totleDischarge") }}</div>
            <p>927.50<span>kWh</span></p>
          </van-col>
          <van-col class="item" span="12">
            <div>{{ $t("energy.dailyCharge") }}</div>
            <p>999.00<span>kWh</span></p>
          </van-col>
          <van-col class="item" span="12">
            <div>{{ $t("energy.dailyDischarge") }}</div>
            <p>99.00<span>kWh</span></p>
          </van-col>
        </van-row>
      </van-row>
      <van-row class="echart-card">
        <div class="header">
          <span>{{ $t("energy.chargTitle_ele") }}</span>
          <div class="date" @click="dateSelection('electricity')">
            {{ ele_DataValue }} <van-icon name="arrow-down" />
          </div>
        </div>
        <div ref="eleChartBox" class="echart"></div>
      </van-row>
      <van-row class="echart-card">
        <div class="header">
          <span>{{ $t("energy.chargTitle_power") }}</span>
          <div class="date" @click="dateSelection('power')">
            {{ pow_DataValue }} <van-icon name="arrow-down" />
          </div>
        </div>
        <div ref="powChartBox" class="echart"></div>
      </van-row>
      <van-row class="echart-card">
        <div class="header">
          <span>{{ $t("energy.chargTitle_energy") }}</span>
          <div class="date" @click="dateSelection('energy')">
            {{ ene_DataValue }} <van-icon name="arrow-down" />
          </div>
        </div>
        <div ref="eneChartBox" class="echart"></div>
      </van-row>
    </van-row>
    <!-- 日期选择面板 -->
    <van-popup round position="bottom" :show="showDataPick">
      <van-date-picker
        v-model="DataPickDefault"
        :title="$t('energy.popup_title')"
        :confirm-button-text="$t('energy.confirm')"
        :cancel-button-text="$t('energy.cancel')"
        :columns-type="['year', 'month']"
        @cancel="showDataPick = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, nextTick } from "vue";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const echarts =
  getCurrentInstance().appContext.config.globalProperties.$echarts;

//日历绑定
const DataPickDefault = ref(["2024", "01"]); //日历默认值
const ele_DataValue = ref(dayjs().format("YYYY-MM"));
const pow_DataValue = ref(dayjs().format("YYYY-MM"));
const ene_DataValue = ref(dayjs().format("YYYY-MM"));
const showDataPick = ref(false);
let nowDatePick = null;
// 日期选择事件
const dateSelection = (type) => {
  nowDatePick = type;
  showDataPick.value = true;
};
//关闭es日期面板并确认
const onConfirm = () => {
  showDataPick.value = false;
  let year = DataPickDefault.value[0];
  let month = DataPickDefault.value[1];
  let date = year + "-" + month;
  if (nowDatePick == "electricity") ele_DataValue.value = date;
  if (nowDatePick == "power") pow_DataValue.value = date;
  if (nowDatePick == "energy") ene_DataValue.value = date;
};
//充放电量图表模块
let eleChartBox = ref(null);
let eleEchart = ref();
const eleOption = reactive({
  color: ["#3f7bf8", "#febe37"],
  tooltip: { trigger: "axis", confine: true },
  grid: { top: "40", left: "40", right: "10", bottom: "20" },
  legend: {
    type: "scroll",
    right: 0,
    top: 8,
    itemWidth: 8,
    itemHeight: 8,
    itemStyle: {
      color: "inherit",
    },
    lineStyle: { type: "inherit" },
    textStyle: { color: "#9d9d9d" },
  },
  xAxis: {
    type: "category",
    axisLabel: {
      color: "#9d9d9d",
    },
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  yAxis: {
    type: "value",
    name: t("energy.unit") + "：kWh",
    axisLabel: {
      color: "9d9d9d",
    },
    splitLine: {
      show: true, //网格线
      lineStyle: {
        color: "#676870",
      },
    },
  },

  series: [
    {
      name: t("energy.Ri_Chong"),
      type: "bar",
      stack: "total",
      barWidth: "30%",
      data: [18, 53, 34, 41, 14, 59, 44, 19, 56, 98],
    },
    {
      name: t("energy.Ri_Fang"),
      type: "bar",
      stack: "total",
      data: [28, 43, 57, 67, 82, 46, 37, 91, 73, 27],
    },
  ],
});
onMounted(() => {
  nextTick(() => {
    eleEchart = echarts.init(eleChartBox.value);
    eleEchart.setOption(eleOption);
    window.onresize = () => eleEchart.resize();
  });
});
//功率曲线图表模块
let powChartBox = ref(null);
let powEchart = ref();
const powerOption = reactive({
  color: ["#407af9", "#fe988b"],
  tooltip: { trigger: "axis", confine: true },
  grid: { top: "40", left: "40", right: "10", bottom: "20" },
  legend: {
    type: "scroll",
    right: 0,
    top: 8,
    itemWidth: 16,
    itemHeight: 8,
    itemStyle: {
      color: "inherit",
    },
    lineStyle: { type: "inherit" },
    textStyle: { color: "#9d9d9d" },
  },
  xAxis: {
    type: "category",
    axisLabel: {
      color: "9d9d9d",
    },
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  yAxis: {
    type: "value",
    name: t("energy.unit") + "：kWh",
    axisLabel: {
      color: "9d9d9d",
    },
    splitLine: {
      show: true, //网格线
      lineStyle: {
        color: "#676870",
      },
    },
  },

  series: [
    {
      name: t("energy.BMS_Power"),
      type: "line",
      symbol: "none",
      data: [18, 53, 34, 41, 14, 59, 44, 19, 56, 98],
    },
    {
      name: t("energy.PCS_Power"),
      type: "line",
      symbol: "none",
      data: [28, 43, 57, 67, 82, 46, 37, 91, 73, 27],
    },
  ],
});
onMounted(() => {
  nextTick(() => {
    powEchart = echarts.init(powChartBox.value);
    powEchart.setOption(powerOption);
    window.onresize = () => powEchart.resize();
  });
});
//能耗排行图表模块
let eneChartBox = ref(null);
let eneEchart = ref();
const eneOption = reactive({
  color: ["#2b46d3"],
  tooltip: { trigger: "axis", confine: true },
  grid: { top: "30", left: "50", right: "10", bottom: "20" },
  xAxis: {
    type: "value",
    splitLine: { show: false }, //网格线
    alignTicks: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: "#9d9d9d",
      },
    },
  },
  yAxis: {
    type: "category",
    axisLabel: { color: "#9d9d9d" },
    name: t("energy.unit") + "：kWh",
    nameTextStyle: {
      lineHeight: 0,
      padding: [0, 0, 0, -30],
    },
    axisLabel: { color: "#9d9d9d" },
    data: ["系统#1", "系统#2", "系统#3", "系统#4", "系统#5", "系统#6"],
  },
  series: {
    type: "bar",
    barWidth: "30%",
    itemStyle: {
      borderRadius: [0, 10, 10, 0],
    },
    data: [18, 53, 34, 41, 14, 59, 44, 19, 56, 98],
  },
});
onMounted(() => {
  nextTick(() => {
    eneEchart = echarts.init(eneChartBox.value);
    eneEchart.setOption(eneOption);
    window.onresize = () => eneEchart.resize();
  });
});
</script>

<style lang="less" scoped>
.energy {
  padding: 24px;
}
.sys-energy {
  display: flex;
  flex-direction: column;
  background-image: var(--allStation-es-bg);
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: 16px;
  padding: 24px;
  .text-card {
    display: flex;
    .title {
      position: relative;
      font-weight: 500;
      font-size: 30px;
      line-height: 42px;
      text-indent: 14px;
      color: var(--text-color);
    }
    .title:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      width: 6px;
      height: 26px;
      background: #40e2c1;
      border-radius: 8px;
    }
    .content {
      margin-top: 20px;
      width: 100%;
      .item {
        div {
          text-align: center;
          font-size: 26px;
          margin-bottom: 10px;
          color: var(--system-text-lightColor);
        }
        p {
          font-size: 28px;
          color: var(--text-color);
          text-align: center;

          span {
            margin-left: 6px;
            font-size: 20px;
            color: var(--system-text-lightColor);
          }
        }
      }
    }
  }
}
.echart-card {
  margin-top: 34px;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 26px;
    color: var(--text-color);
  }
  .echart {
    width: 100%;
    height: 436px;
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
</style>
