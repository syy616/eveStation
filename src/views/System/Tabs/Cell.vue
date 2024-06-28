<template>
  <div class="cell">
    <van-row class="titleRow">
      <van-col span="24" class="titleCol">
        <div class="clusterName">
          <van-dropdown-menu active-color="#40e2c1" swipe-threshold="4" direction="down" :auto-locate="true">
            <van-dropdown-item v-model="clusterId" :options="clusterList" />
          </van-dropdown-menu>
        </div>
        <div class="clisterDate" @click="showPopup">
          {{ socTime }}
          <van-icon name="arrow-down" :class="dateArrow" />
        </div>
      </van-col>
    </van-row>
    <van-row class="packRow">
      <van-col span="24">
        <div class="boxTitle">
          <van-row>
            <van-col span="1">
              <div class="leftBorder"></div>
            </van-col>
            <van-col span="23">
              <div class="leftTitle">
                PACK
              </div>
            </van-col>
          </van-row>
        </div>
      </van-col>
      <van-row :gutter="[10, 10]" class="diffContent">
        <van-col span="8" v-for="(item, index) in packList" :key="index">
          <div class="packBox" :class="checkPackId==item.packId?'packBoxCheck':''">
            <div class="idBox" :class="checkPackId==item.packId?'idBoxCheck':''">#{{ item.packId }}</div>
            <div class="diffBox">
              <div class="volDiff diff">压差:{{ item.volDiff }}V</div>
              <div class="temDiff diff">温差:{{ item.volDiff }}℃</div>
            </div>
          </div>
        </van-col>
      </van-row>
      <div class="simpleTitle">{{ $t('systemPage.volSimpleTitle') }}</div>
      <SimpleContent chartId="volSimple" :option="volOPt" :allData="volSimple"></SimpleContent>
      <div class="simpleTitle">{{ $t('systemPage.temSimpleTitle') }}</div>
      <SimpleContent chartId="temSimple" :option="temOPt" :allData="temSimple"></SimpleContent>
    </van-row>
    <van-popup round position="bottom" :show="dateShow">
      <van-date-picker v-model="defaultDate" :title="$t('allStation.dateDate')" :columns-type="columnsType"
        @confirm="onConfirm" @cancel="onCancel" :cancel-button-text="$t('allStation.cancel')"
        :confirm-button-text="$t('allStation.confirm')" />
    </van-popup>


  </div>
</template>
<script setup>
import { onMounted, onBeforeMount, getCurrentInstance, ref, nextTick, watch } from "vue"
import { useI18n } from "vue-i18n"
import dayjs from "dayjs";
import SimpleContent from "../../../components/SystemCard/SimpleContent.vue";
const { t, locale } = useI18n();
const props = defineProps({
  sysName: String,
  sysId: Number
})
const columnsType = ['year', 'month', "day"];  //日历格式
const defaultDate = ref(dayjs(new Date()).format("YYYY-MM-DD").split("-"));  //日历默认值
const socTime = ref(dayjs(new Date()).format("YYYY-MM-DD"));  //soc默认值
const clusterList = ref([
  { value: 0, text: t("systemPage.cluster_name") + "#1", volDiff: 0.01, temDiff: 2 },
  { value: 1, text: t("systemPage.cluster_name") + "#2", volDiff: 0.01, temDiff: 2 },
  { value: 2, text: t("systemPage.cluster_name") + "#3", volDiff: 0.01, temDiff: 2 },
  { value: 3, text: t("systemPage.cluster_name") + "#4", volDiff: 0.01, temDiff: 2 },
  { value: 4, text: t("systemPage.cluster_name") + "#5", volDiff: 0.01, temDiff: 2 },
  { value: 5, text: t("systemPage.cluster_name") + "#6", volDiff: 0.01, temDiff: 2 },
  { value: 6, text: t("systemPage.cluster_name") + "#7", volDiff: 0.01, temDiff: 2 },
  { value: 7, text: t("systemPage.cluster_name") + "#8", volDiff: 0.01, temDiff: 2 },
  { value: 8, text: t("systemPage.cluster_name") + "#9", volDiff: 0.01, temDiff: 2 },
  { value: 9, text: t("systemPage.cluster_name") + "#10", volDiff: 0.01, temDiff: 2 },
])
const packList = ref([
  { packId: 1, volDiff: 0.01, temDiff: 2 },
  { packId: 2, volDiff: 0.01, temDiff: 2 },
  { packId: 3, volDiff: 0.01, temDiff: 2 },
  { packId: 4, volDiff: 0.01, temDiff: 2 },
  { packId: 5, volDiff: 0.01, temDiff: 2 },
  { packId: 6, volDiff: 0.01, temDiff: 2 },
  { packId: 7, volDiff: 0.01, temDiff: 2 },
  { packId: 8, volDiff: 0.01, temDiff: 2 },
  { packId: 9, volDiff: 0.01, temDiff: 2 },
  { packId: 10, volDiff: 0.01, temDiff: 2 },
])
const volSimple = ref({
  volList:[
  {time:"10:00",v:[3.23,3.24,3.25,3.26,3.27,3.28,3.29,3.31,3.32,3.33,3.34],v1:3.23,v2:3.23,v3:3.23,v4:3.23,v5:3.02,v6:3.23,v7:3.23,v8:3.01,v9:3.23,v10:3.23,v11:3.23,v12:3.23},
  {time:"11:00",v:[3.23,3.24,3.25,3.26,3.27,3.28,3.29,3.31,3.32,3.33,3.34],v1:1.23,v2:3.23,v3:3.23,v4:3.23,v5:3.04,v6:3.23,v7:3.23,v8:3.3,v9:3.23,v10:3.23,v11:3.23,v12:3.23},
  {time:"12:00",v:[3.23,3.24,3.25,3.26,3.27,3.28,3.29,3.31,3.32,3.33,3.34],v1:2.23,v2:3.23,v3:3.23,v4:3.23,v5:3.01,v6:2.1,v7:3.23,v8:3.44,v9:3.23,v10:3.23,v11:3.23,v12:3.23},
  {time:"13:00",v:[3.23,3.24,3.25,3.26,3.27,3.28,3.29,3.31,3.32,3.33,3.34],v1:3.23,v2:3.23,v3:3.23,v4:3.23,v5:3.02,v6:3.3,v7:1.23,v8:2.66,v9:3.23,v10:3.23,v11:3.23,v12:3.23},
  {time:"14:00",v:[3.23,3.24,3.25,3.26,3.27,3.28,3.29,3.31,3.32,3.33,3.34],v1:4.23,v2:3.23,v3:3.23,v4:3.23,v5:3.23,v6:3.23,v7:4.23,v8:3.23,v9:3.23,v10:3.23,v11:3.23,v12:3.23},
  {time:"15:00",v:[3.23,3.24,3.25,3.26,3.27,3.28,3.29,3.31,3.32,3.33,3.34],v1:3.23,v2:3.23,v3:3.23,v4:3.23,v5:3.23,v6:3.23,v7:2.23,v8:3.23,v9:3.23,v10:3.23,v11:3.23,v12:3.23},
  {time:"16:00",v:[3.23,3.24,3.25,3.26,3.27,3.28,3.29,3.31,3.32,3.33,3.34],v1:3.23,v2:3.23,v3:3.23,v4:3.23,v5:3.23,v6:3.23,v7:1.23,v8:3.23,v9:3.23,v10:3.23,v11:3.23,v12:3.23},
],
list:[{id:1,value:3.345},{id:2,value:3.336},{id:3,value:3.345},{id:4,value:3.345},{id:5,value:3.336},{id:6,value:3.345},
{id:7,value:3.345},{id:8,value:3.336},{id:9,value:3.345},{id:10,value:3.345},{id:11,value:3.336},{id:12,value:3.345}]
});
const temSimple = ref({
  temList:[
  {time:"10:00",t:[3.29,3.31,3.32,3.33,3.34],t1:3.23,t2:3.23,t3:3.23,t4:3.23,t5:3.02},
  {time:"11:00",t:[3.29,3.31,3.32,3.33,3.34],t1:1.23,t2:3.23,t3:3.23,t4:3.23,t5:3.04},
  {time:"12:00",t:[3.29,3.31,3.32,3.33,3.34],t1:2.23,t2:3.23,t3:3.23,t4:3.23,t5:3.01},
  {time:"13:00",t:[3.29,3.31,3.32,3.33,3.34],t1:3.23,t2:3.23,t3:3.23,t4:3.23,t5:3.02},
  {time:"14:00",t:[3.29,3.31,3.32,3.33,3.34],t1:4.23,t2:3.23,t3:3.23,t4:3.23,t5:3.33},
  {time:"15:00",t:[3.29,3.31,3.32,3.33,3.34],t1:3.23,t2:3.23,t3:3.23,t4:3.23,t5:3.23},
  {time:"16:00",t:[2.31,2.32,2.33,2.34,2.22],t1:3.23,t2:3.23,t3:3.23,t4:3.23,t5:3.03},
],
list:[{id:1,value:23},{id:2,value:25},{id:3,value:35},{id:4,value:34},{id:5,value:36}]
});
const clusterId = ref(0);
const checkPackId = ref(1);
const dateArrow = ref("");  //日历箭头
const showClass1 = ref(""); //右箭头动态class
const dateShow = ref(false);  //日历面板
const volOPt=ref({
  tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "17%",
        left: '10%',
        right: "2%",
        bottom: '20%',
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                interval: 1,
                color: "#9d9d9d"
            },
            data: [],
        }
    ],
    yAxis: [
        {
            name:t("systemPage.systemDcVol")+"(V)",
            type: 'value',
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: "#9d9d9d",
            },
        }
    ],
    dataZoom: [
        {
            show: true,
            realtime: true,
            height: 18,
            left: 5,
            right: 5,
            bottom: 0,
            borderColor: "rgba(119, 234, 211, 1)",
            backgroundColor: "rgba(255, 255, 255, 0)",
            fillerColor: "rgba(119, 234, 211, 0.5)"
        },
        {
            type: 'inside',
            realtime: true,
        }
    ],
    series: []
});
const temOPt=ref({
  tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "17%",
        left: '10%',
        right: "2%",
        bottom: '20%',
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                interval: 1,
                color: "#9d9d9d"
            },
            data: [],
        }
    ],
    yAxis: [
        {
            name:t("systemPage.pcs_Temp")+"(℃)",
            type: 'value',
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: "#9d9d9d",
            },
        }
    ],
    dataZoom: [
        {
            show: true,
            realtime: true,
            height: 18,
            left: 5,
            right: 5,
            bottom: 0,
            borderColor: "rgba(119, 234, 211, 1)",
            backgroundColor: "rgba(255, 255, 255, 0)",
            fillerColor: "rgba(119, 234, 211, 0.5)"
        },
        {
            type: 'inside',
            realtime: true,
        }
    ],
    series: []
});
onMounted(() => { });

//弹出日期面板
const showPopup = () => {
  dateShow.value = true;
  dateShow.value ? dateArrow.value = 'myarrowShow' : dateArrow.value = 'myarrowNone';
  let nowTime = socTime.value.split("-");
  defaultDate.value = [nowTime[0], nowTime[1], nowTime[2]];
}
//关闭日期面板
const onConfirm = () => {
  dateShow.value = false
  dateShow.value ? dateArrow.value = 'myarrowShow' : dateArrow.value = 'myarrowNone';
  socTime.value = defaultDate.value[0] + "-" + defaultDate.value[1] + "-" + defaultDate.value[2];
}
const onCancel = () => {
  dateShow.value = false
  dateShow.value ? dateArrow.value = 'myarrowShow' : dateArrow.value = 'myarrowNone';
}

</script>
<style lang="less" scoped>
.cell {
  width: 100%;
  height: 100%;
  padding: 16px 24px;
  box-sizing: border-box;

  .titleRow {
    height: 70px;

    .titleCol {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .clusterName,
      .clisterDate {
        height: 44px;
        line-height: 44px;
        width: fit-content;
        padding: 0 8px;
        margin: 0 5px;
        box-sizing: border-box;
        color: var(--allStation-tab-title);
        font-size: 28px;
        font-weight: 400;
        font-family: PingFang SC, PingFang SC;
        background: var(--cell-titleBg)
      }
    }


    .myarrowShow {
      animation: myarrow .25s linear;
      -webkit-animation: myarrow .25s linear;
      animation-fill-mode: forwards;
      -webkit-animation-fill-mode: forwards;
    }

    .myarrowNone {
      animation: myarrownone .25s linear;
      -webkit-animation: myarrownone .25s linear;
      animation-fill-mode: forwards;
      -webkit-animation-fill-mode: forwards;
    }

    @-webkit-keyframes myarrow {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }

    @keyframes myarrow {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }

    @-webkit-keyframes myarrownone {
      0% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }

      100% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
    }

    @keyframes myarrownone {
      0% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }

      100% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
    }
  }

  .packRow {
    margin-top: 24px;

    .boxTitle {
      width: 100%;
      color: var(--allStation-tab-title);
      font-size: 34px;
      font-weight: 500;
      height: 42px;
      line-height: 42px;

      .van-row {
        height: 100%;

        .van-col {
          .leftBorder {
            border-radius: 8px;
            height: 86%;
            width: 8px;
            background-color: #40E2C1;
            border-radius: 8px;
            margin: 0 auto;
          }

          .leftTitle {
            height: 100%;
            margin-left: 5px;
          }
        }
      }

    }

    .diffContent {
      margin-top: 16px;

      .packBox {
        display: flex;
        justify-content: space-between;
        height: 100px;
        width: 220px;
        align-items: center;
        background-color: var(--systemOverview-sysBg);
        border-radius: 6px 6px 6px 6px;
        padding: 8px;
        box-sizing: border-box;

        .idBox {
          width: 48px;
          height: 48px;
          line-height: 48px;
          font-size: 28px;
          border-radius: 36px;
          text-align: center;
          color: var(--allStation-data-title);
          font-weight: 500;
        }
        .idBoxCheck{
          background: #ffffff;
          color: #40E2C1;
        }
        .diffBox {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;

          .diff {
            width: 100%;
            font-size: 28px;
            font-weight: 500;
            color: var(--allStation-tab-title);
          }
        }
      }

      .packBoxCheck {
        background: #40e2c1;
      }
    }

  }

  .simpleTitle{
    font-weight: 400;
    font-size: 28px;
    padding: 24px 0 ;
    box-sizing: border-box;
    color: var(--allStation-tab-title);
  }
  .van-dropdown-menu {
    height: 44px;

    :deep(.van-dropdown-menu__bar) {
      background-color: transparent;
      box-shadow: none;
      padding: 0 10px;
      height: 44px;
      box-sizing: border-box;

      .van-dropdown-menu__item {
        .van-dropdown-menu__title {
          color: var(--text-color);
        }

        .van-dropdown-menu__title::after {
          margin-right: 4px;
        }
      }
    }

    :deep(.van-dropdown-item--down) {
      .van-popup {
        background: linear-gradient(360deg,
            rgba(44, 44, 44, 1),
            rgba(24, 24, 24, 1));
        position: absolute;
        border-radius: 0 0 16px 16px;
        border: none;
        max-height: 400px;
        overflow: auto;

        .van-cell {
          background-color: transparent;
          color: var(--text-color);
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
