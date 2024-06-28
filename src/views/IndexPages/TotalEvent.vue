<template>
  <div class="allEvent">
    <van-row class="header">
      <van-row class="title"> {{ $t("event.pageTitle") }} </van-row>
    </van-row>
    <van-tabs v-model:active="active" class="tabs">
      <van-tab :title="$t('event.Today_faults')" />
      <van-tab :title="$t('event.Historical_faults')" />
    </van-tabs>
    <van-dropdown-menu
      active-color="#40e2c1"
      swipe-threshold="4"
      direction="down"
      :auto-locate="true"
    >
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
      <van-dropdown-item v-model="value4" :options="option4" />
    </van-dropdown-menu>
    <div class="totleNumber">
      <p>共<span> 8条 </span>数据</p>
      <div class="date" @click="showDataPick = true">
        {{ DataValue }} <van-icon name="arrow-down" />
      </div>
      <van-popup round position="bottom" :show="showDataPick">
        <van-date-picker
          v-model="DataPickDefault"
          :title="$t('event.popup_title')"
          :confirm-button-text="$t('event.confirm')"
          :cancel-button-text="$t('event.cancel')"
          :columns-type="['year', 'month']"
          @cancel="showDataPick = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
    <div class="card-content">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="$t('event.noMore')"
        @load="onLoad"
      >
        <div class="card-list" v-for="(item, index) in list">
          <van-row class="card-top">
            <div class="state">故障</div>
            <p>亿纬时代:ES-W-0001</p>
            <div class="isDispose">未处理</div>
          </van-row>
          <van-row class="card-center">
            <p>Pcs:2#空调通讯状态信号通讯故障。</p>
          </van-row>
          <van-row class="card-bottom">
            <p>2023-11-17 15:01:23</p>
          </van-row>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import dayjs from "dayjs";
const active = ref();
const value1 = ref(-1);
const value2 = ref("");
const value3 = ref("");
const value4 = ref("");
const option1 = [
  { text: "全部电站", value: -1 },
  { text: "亿纬时代", value: 0 },
  { text: "亿纬锂能A区", value: 1 },
  { text: "亿纬锂能B区", value: 2 },
  { text: "亿纬动力9座", value: 3 },
  { text: "亿纬锂能潼湖工厂", value: 4 },
];
const option2 = [
  { text: "全部系统", value: "" },
  { text: "ES-W-0001", value: "ES-W-0001" },
  { text: "ES-W-0002", value: "ES-W-0002" },
  { text: "ES-W-0003", value: "ES-W-0003" },
  { text: "ES-W-0004", value: "ES-W-0004" },
  { text: "ES-W-0005", value: "ES-W-0005" },
];
const option3 = [
  { text: "全部设备", value: "" },
  { text: "PCS", value: "PCS" },
  { text: "BMS", value: "BMS" },
];
const option4 = [
  { text: "全部告警", value: "" },
  { text: "一般警告", value: "一般警告" },
  { text: "严重警告", value: "严重警告" },
];

const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  finished.value = true;
};
const list = [
  {
    label: "系统#1",
    id: 1,
    state: 1,
    Charge: 232.32,
    DisCharge: 456.37,
    power: 99.99,
    soc: 100,
  },
  {
    label: "系统#2",
    id: 2,
    state: 2,
    Charge: 232.32,
    DisCharge: 456.37,
    power: 99.99,
    soc: 100,
  },
  {
    label: "系统#3",
    id: 3,
    state: 3,
    Charge: 232.32,
    DisCharge: 456.37,
    power: 99.99,
    soc: 100,
  },
  {
    label: "系统#4",
    id: 4,
    state: 4,
    Charge: 232.32,
    DisCharge: 456.37,
    power: 99.99,
    soc: 100,
  },
  {
    label: "系统#5",
    id: 5,
    state: 5,
    Charge: 232.32,
    DisCharge: 456.37,
    power: 99.99,
    soc: 100,
  },
];

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
</script>

<style lang="less" scoped>
.allEvent {
  display: flex;
  flex-direction: column;
  height: 100%;
  // background-image: url(../../assets/images/totleEvent/dark_bg.png);
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
  :deep(.van-tabs__wrap) {
    .van-tabs__nav {
      background-color: transparent;
      .van-tab {
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
}
.van-dropdown-menu {
  :deep(.van-dropdown-menu__bar) {
    background-color: transparent;
    box-shadow: none;
    padding: 0 10px;
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
      background: linear-gradient(
        360deg,
        rgba(44, 44, 44, 1),
        rgba(24, 24, 24, 1)
      );
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
.totleNumber {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  padding-bottom: 24px;
  p {
    font-size: 28px;
    color: var(--TotalEvent-text-lightColor);
    text-indent: 30px;
    span {
      color: #29e2c2;
    }
  }
  .date {
    font-size: 28px;
    // line-height: 38px;
    color: var(--text-color);
  }
}
.card-content {
  flex: 1;
  padding: 0 24px;

  overflow: auto;

  .van-list {
    .card-list {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 24px;
      box-sizing: border-box;
      height: 230px;
      margin-top: 24px;
      border-radius: 24px;
      background-color: var(--TotalEvent-card-bg);
      .card-top {
        display: flex;
        justify-content: space-between;
        font-size: 30px;
        .state {
          width: 92px;
          font-size: 26px;
          line-height: 38px;
          height: 38px;
          text-align: center;
          background: #f9ab3f;
          border-radius: 3px;
          color: var(--text-color);
        }
        p {
          flex: 1;
          text-indent: 24px;
          color: var(--text-color);
        }
      }
      .card-center {
        height: 66px;
        line-height: 52px;
        font-size: 28px;
        color: var(--TotalEvent-text-lightColor);
        border-bottom: 1px solid rgba(231, 231, 231, 1);
      }
      .card-bottom {
        font-size: 28px;
        color: var(--TotalEvent-text-lightColor);
      }
    }
    .card-list:first-child {
      margin-top: 0;
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
</style>
