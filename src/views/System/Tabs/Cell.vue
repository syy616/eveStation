<template>
  <div class="cell">
    <van-row class="titleRow">
      <van-col span="24" class="titleCol">
        <div class="clusterName" @click="showAllCluster">
          <span>{{ $t("systemPage.cluster_name") + "#" + clusterList[0].id }}</span>
          <van-icon name="arrow-up" :class="myArrow" />
        </div>
        <div class="clisterDate" @click="showPopup">
          {{ socTime }}
          <van-icon name="arrow-down" :class="dateArrow" />
        </div>
      </van-col>
    </van-row>
    <van-overlay :show="overlayShow" z-index="998" close-on-click-overlay="false" />
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

const { t, locale } = useI18n();
const props = defineProps({
  sysName: String,
  sysId: Number
})
const columnsType = ['year', 'month', "day"];  //日历格式
const defaultDate = ref(dayjs(new Date()).format("YYYY-MM-DD").split("-"));  //日历默认值
const socTime = ref(dayjs(new Date()).format("YYYY-MM-DD"));  //soc默认值
const clusterList = ref([
  { id: 1, volDiff: 0.01, temDiff: 2 },
  { id: 2, volDiff: 0.01, temDiff: 2 },
  { id: 3, volDiff: 0.01, temDiff: 2 },
  { id: 4, volDiff: 0.01, temDiff: 2 },
  { id: 5, volDiff: 0.01, temDiff: 2 },
  { id: 6, volDiff: 0.01, temDiff: 2 },
  { id: 7, volDiff: 0.01, temDiff: 2 },
  { id: 8, volDiff: 0.01, temDiff: 2 },
  { id: 9, volDiff: 0.01, temDiff: 2 },
  { id: 10, volDiff: 0.01, temDiff: 2 },
])
const overlayShow = ref(false); //簇面板遮罩层
const myArrow = ref("");  //簇名称箭头
const showClass = ref(""); //箭头动态class
const showTop = ref(false); //簇面板

const dateArrow = ref("");  //日历箭头
const showClass1 = ref(""); //右箭头动态class
const dateShow = ref(false);  //日历面板

onMounted(() => { });
//展示簇面板
const showAllCluster = () => {
  showTop.value = !showTop.value;
  showTop.value ? showClass.value = 'myPopShow' : showClass.value = 'myPopNone';
  showTop.value ? myArrow.value = 'myarrowShow' : myArrow.value = 'myarrowNone';
  showTop.value ? overlayShow.value = true : overlayShow.value = false;
  // if (selectActive.value !== active.value) {
  //   selectActive.value = active.value;
  //   chooseSystemName.value = systemName.value;
  // }
}
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
        width: fit-content;
        padding: 8px;
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
