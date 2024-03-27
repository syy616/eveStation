<script setup>
import { list } from "postcss";
import { onMounted, onBeforeMount, getCurrentInstance, ref, nextTick } from "vue";
import { useI18n } from 'vue-i18n'
const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t, locale } = useI18n();
const dataList = ref(
  {
    power: 989.23,
    tem: 23.3,
    voltage: 750.23,
    current: 23.3,
    list: [
      { label: t('systemPage.maxSingleV'), data: 999.99, unit: "V" },
      { label: t('systemPage.soh'), data: 34, unit: "%" },
      { label: t('systemPage.maxSingleT'), data: 33, unit: "℃" },
      { label: t('systemPage.minSingleV'), data: 349.34, unit: "V" },
      { label: t('systemPage.wet'), data: 24, unit: "%" },
      { label: t('systemPage.minSingleT'), data: 40, unit: "℃" },
    ]
  });
const waterHeight = ref([0.45, 0.76]);
const waterOption = ref({
  title: [
    {
      text: '',
      x: '22%',
      y: '70%',
      textStyle: {
        fontSize: 14,
        fontWeight: '100',
        color: '#5dc3ea',
        lineHeight: 16,
        textAlign: 'center',
      },
    }
  ],
  series: {
    type: 'liquidFill',
    radius: '100%',
    center: ['50%', '50%'],
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#446bf5',
          },
          {
            offset: 1,
            color: '#2ca3e2',
          },
        ],
        globalCoord: false,
      },
    ],
    data: [0, 0], // data个数代表波浪数
    backgroundStyle: {
      borderWidth: 1,
      color: 'RGBA(51, 66, 127, 0.7)',
    },
    label: {
      fontSize: 50,
      color: '#fff',
    },
    outline: {
      // show: false
      borderDistance: 0,
      itemStyle: {
        borderWidth: 2,
        borderColor: '#112165',
      },
    },
  },
});
const socChartBox = ref(null);
let socChart = null;
const getData = () => {
  waterOption.value.series.data = waterHeight.value;
  nextTick(() => {
    socChartInit();
  })
}
//init图表
const socChartInit = () => {
  socChart = echarts.init(socChartBox.value);
  socChart.setOption(waterOption.value);
  window.onresize = function () {
    socChart.resize();
  };
};

//生命周期
onMounted(() => {
  // getData();
});
</script>

<template>
  <div class="waterBall">
    <div class="waterContent">
      <van-row class="waterTitle">
        <span>{{ $t('systemPage.sysRunStateTitle') }}</span>
      </van-row>
      <van-row class="topContent">
        <div class="leftContent sideContent">
          <div class="topDataBox">
            <div class="topData">{{ dataList.power }}<span>kW</span></div>
            <div class="leftTopDash dashLine"></div>
            <div class="topTitle">{{ $t('systemPage.power') }}</div>
          </div>
          <div class="bottomDataBox">
            <div class="topData">{{ dataList.tem }}<span>℃</span></div>
            <div class="leftBottomDash dashLine"></div>
            <div class="topTitle">{{ $t('systemPage.tem') }}</div>
          </div>
        </div>
        <div class="waterChart" id="waterChart" ref="socChartBox">

        </div>
        <div class="rightContent sideContent">
          <div class="topDataBox">
            <div class="topData">{{ dataList.voltage }}<span>V</span></div>
            <div class="rightTopDash dashLine"></div>
            <div class="topTitle">{{ $t('systemPage.voltage') }}</div>
          </div>
          <div class="bottomDataBox">
            <div class="topData">{{ dataList.current }}<span>A</span></div>
            <div class="rightBottomDash dashLine"></div>
            <div class="topTitle">{{ $t('systemPage.current') }}</div>
          </div>
        </div>
      </van-row>
      <van-row class="bottomContent" :gutter="[12, 12]">
        <van-col span="8" class="bottomCol" v-for="(item, index) in dataList.list">
          <van-row class="bottomDataBox">
            <van-col class="bottomData">{{ item.data }}</van-col>
            <van-col class="bottomDataUnit">{{ item.unit }}</van-col>
          </van-row>
          <van-row>
            <van-col class="bottomTitle">{{ item.label }}</van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<style scoped lang="less">
.waterBall {
  width: 100%;
  height: 626px;
  padding: 24px;
  box-sizing: border-box;

  .waterContent {
    width: 100%;
    height: 100%;
    border-radius: 24px 24px 24px 24px;
    background-color: var(--systemOverview-showBg);
    padding: 24px;
    box-sizing: border-box;

    .waterTitle {
      width: 100%;
      height: 38px;
      color: var(--allStation-tab-title);
      font-weight: 400;
      font-family: PingFang SC, PingFang SC;
      font-size: 28px;
      line-height: 38px;
      font-style: normal;
    }

    .topContent {
      width: 100%;
      height: 280px;
      display: flex;
      justify-content: center;
      position: relative;
      margin-bottom: 34px;

      .sideContent {
        width: 176px;
        height: 280px;
        position: absolute;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      }

      .leftContent {
        left: 0;

        .topDataBox,
        .bottomDataBox {
          width: 100%;
          height: 100px;
          margin: 24px 0 0 26px;
        }

        .leftTopDash {
          height: 24px;
          background: url("@/assets/images/system/line1.png") no-repeat;
          background-size: 100% 100%;
        }

        .leftBottomDash {
          height: 24px;
          margin-top: -20px;
          margin-bottom: 24px;
          background: url("@/assets/images/system/line1.png") no-repeat;
          background-size: 100% 100%;
          transform: scaleY(-1);
        }
      }

      .waterChart {
        width: 272px;
        height: 272px;
      }

      .rightContent {
        right: 26px;

        .topDataBox,
        .bottomDataBox {
          width: 100%;
          height: 100px;
          margin: 24px 0px 0 0;
          box-sizing: border-box;

          .topData {
            text-align: right;
          }

          .topTitle {
            text-align: right;
          }
        }
      }

      .topData {
        height: 40px;
        line-height: 40px;
        margin-bottom: 3px;
        color: var(--allStation-box-title-color);
        font-size: 32px;
      }

      .topTitle {
        height: 36px;
        line-height: 36px;
        margin-top: -10px;
        color: var(--allStation-data-title);
        font-size: 28px;
      }

      .rightTopDash {
        height: 24px;
        background: url("@/assets/images/system/line2.png") no-repeat;
        background-size: 100% 100%;
      }

      .rightBottomDash {
        height: 24px;
        margin-top: -20px;
        margin-bottom: 24px;
        background: url("@/assets/images/system/line2.png") no-repeat;
        background-size: 100% 100%;
        transform: scaleY(-1);
      }
    }

    .bottomContent {
      // height: 220px;
      width: 100%;

      .bottomCol {
        box-sizing: border-box;
        height: 84px;

        .bottomDataBox {
          display: flex;
          align-items: baseline;
          justify-content: center;

          .bottomData {
            font-weight: 500;
            font-size: 32px;
            color: var(--allStation-box-title-color);
          }

          .bottomDataUnit {
            font-weight: 400;
            font-size: 22px;
            color: var(--allStation-data-title);
            margin-left: 5px;
          }
        }

        .bottomTitle {
          width: 100%;
          display: flex;
          justify-content: center;
          font-weight: 400;
          font-size: 28px;
          color: var(--allStation-data-title);
          font-style: normal;
        }
      }

      .bottomCol:nth-child(3) {
        .bottomDataBox {
          .bottomData {
            color: #F02023FF;
          }

          .bottomDataUnit {
            color: #F02023FF;
          }
        }
      }

      .bottomCol:nth-child(6) {
        .bottomDataBox {
          .bottomData {
            color: #5487FFFF;
          }

          .bottomDataUnit {
            color: #5487FFFF;
          }
        }
      }
    }
  }
}
</style>