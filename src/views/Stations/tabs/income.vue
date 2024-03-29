<template>
  <div class="income">
    <van-row class="price">
      <div class="title">{{ $t("income.timePrice") }}</div>
      <div class="pric-list">
        <div class="item">
          <div>{{ $t("income.Jtext") }}</div>
          <p>9.99<span>元</span></p>
        </div>
        <div class="item">
          <div>{{ $t("income.Ftext") }}</div>
          <p>9.99<span>元</span></p>
        </div>
        <div class="item">
          <div>{{ $t("income.Ptext") }}</div>
          <p>9.99<span>元</span></p>
        </div>
        <div class="item">
          <div>{{ $t("income.Gtext") }}</div>
          <p>9.99<span>元</span></p>
        </div>
      </div>
    </van-row>
    <van-row class="sys-income">
      <van-row class="text-card">
        <van-row class="title"> {{ $t("income.system_profits") }} </van-row>
        <van-row class="content" :gutter="[20, 10]">
          <van-col class="item" span="8">
            <div>{{ $t("income.Title1") }}</div>
            <p>9999.30<span>元</span></p>
          </van-col>
          <van-col class="item" span="8">
            <div>{{ $t("income.Title2") }}</div>
            <p>3927.50<span>元</span></p>
          </van-col>
          <van-col class="item" span="8">
            <div>{{ $t("income.Title3") }}</div>
            <p>999.00<span>元</span></p>
          </van-col>
          <van-col class="item" span="8">
            <div>{{ $t("income.Title4") }}</div>
            <p>99.00<span>元</span></p>
          </van-col>
          <van-col class="item" span="8">
            <div>{{ $t("income.Title5") }}</div>
            <p>99.00<span>元</span></p>
          </van-col>
          <van-col class="item" span="8">
            <div>{{ $t("income.Title6") }}</div>
            <p>99.00<span>元</span></p>
          </van-col>
        </van-row>
      </van-row>
      <van-row class="echart-card">
        <div class="header">
          <span>{{ $t("income.totleCount") }}</span>
          <div class="date" @click="showDataPick = true">
            {{ DataValue }} <van-icon name="arrow-down" />
          </div>
          <van-popup round position="bottom" :show="showDataPick">
            <van-date-picker
              v-model="DataPickDefault"
              :title="$t('energy.popup_title')"
              :confirm-button-text="$t('income.confirm')"
              :cancel-button-text="$t('income.cancel')"
              :columns-type="['year', 'month']"
              @cancel="showDataPick = false"
              @confirm="onConfirm"
            />
          </van-popup>
        </div>
        <div ref="ChartBox" class="echart"></div>
      </van-row>
    </van-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, nextTick } from "vue";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
//日历绑定
const DataPickDefault = ref(["2024", "01"]); //日历默认值
const DataValue = ref(dayjs().format("YYYY-MM"));
const showDataPick = ref(false);
//格式化日期面板

//关闭es日期面板并确认
const onConfirm = () => {
  showDataPick.value = false;
  let year = DataPickDefault.value[0];
  let month = DataPickDefault.value[1];
  DataValue.value = year + "-" + month;
};

const echarts =
  getCurrentInstance().appContext.config.globalProperties.$echarts;
let ChartBox = ref(null);
let MyEchart = ref();
const EchartOption = reactive({
  color: ["#407af9", "#fe988b", "#fecf54", "#b7d0f3", "#0052D9"],
  tooltip: { trigger: "axis", confine: true },
  grid: { top: "60", left: "40", right: "10", bottom: "20" },
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
    name: "单位(元)",
    axisLabel: {
      color: "#9d9d9d",
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
      name: t("income.Jtext"),
      type: "bar",
      data: [18, 53, 34, 41, 14, 59, 44, 19, 56, 98],
    },
    {
      name: t("income.Ftext"),
      type: "bar",
      data: [28, 43, 57, 67, 82, 46, 37, 91, 73, 27],
    },
    {
      name: t("income.Ptext"),
      type: "bar",
      data: [68, 13, 77, 27, 32, 96, 87, 18, 23, 97],
    },
    {
      name: t("income.Gtext"),
      type: "bar",
      data: [82, 28, 58, 18, 67, 28, 75, 35, 56, 75],
    },
    {
      name: t("income.Cost"),
      type: "line",
      symbol: "none",
      data: [28, 59, 68, 76, 68, 90, 80, 100, 68, 49],
    },
  ],
});
const initEchart = () => {
  nextTick(() => {
    MyEchart = echarts.init(ChartBox.value);
    MyEchart.setOption(EchartOption);
    window.onresize = () => MyEchart.resize();
  });
};
onMounted(() => initEchart());
</script>

<style lang="less" scoped>
.income {
  padding: 24px;
}
.price {
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 702px;
  height: 190px;
  background-color: transparent;

  .title {
    font-size: 26px;
    height: 36px;
    line-height: 36px;
    color: var(--text-color);
  }
  .pric-list {
    height: 90px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    .item {
      div {
        font-size: 26px;
        margin-bottom: 10px;
        color: var(--text-shallow-color);
      }
      p {
        font-size: 26px;
        color: var(--text-color);
        span {
          margin-left: 6px;
          font-size: 22px;
          color: var(--text-shallow-color);
        }
      }
    }
  }
}

.sys-income {
  display: flex;
  flex-direction: column;
  background-image: var(--allStation-es-bg);
  background-size: cover;
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
        text-indent: 16px;
        div {
          font-size: 26px;
          margin-bottom: 10px;
          color: var(--system-text-lightColor);
        }
        p {
          font-size: 28px;
          color: var(--text-color);
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
