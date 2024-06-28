<template>
  <div class="content">
    <van-row class="header">
      <van-col>
        <van-dropdown-menu
          active-color="#40e2c1"
          swipe-threshold="4"
          direction="down"
          :auto-locate="true"
        >
          <van-dropdown-item
            v-model="systemvalue"
            :options="systemOption"
          /> </van-dropdown-menu
      ></van-col>

      <van-col>
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
      </van-col>
    </van-row>
    <van-row class="table">
      <Table :data="tableData">
        <Column
          field="time"
          width="60"
          align="center"
          :title="$t('history.time')"
        />
        <Column field="state" width="60" :title="$t('history.state')" />
        <Column
          field="charge"
          width="70"
          align="center"
          :title="$t('history.charge')"
        />
        <Column
          field="disCharge"
          width="70"
          align="center"
          :title="$t('history.disCharge')"
        />
        <Column
          field="power"
          width="90"
          align="center"
          :title="$t('history.active_power')"
        />
      </Table>
    </van-row>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import dayjs from "dayjs";
//使用外部组件vex-table(按需导入) 参考文档网址：https://vxetable.cn/#/table/start/install
import { Table, Column } from "vxe-table";
const tableData = ref([
  {
    id: 1,
    time: "00:00",
    state: "待机",
    charge: "-",
    disCharge: "-",
    power: "-",
  },
  {
    id: 2,
    time: "00:00",
    state: "充电",
    charge: "999.00",
    disCharge: "999.00",
    power: "999.00",
  },
  {
    id: 3,
    time: "00:00",
    state: "待机",
    charge: "-",
    disCharge: "-",
    power: "-",
  },
]);

const systemvalue = ref("ES-W-0001");
const systemOption = [
  { text: "ES-W-0001", value: "ES-W-0001" },
  { text: "ES-W-0002", value: "ES-W-0002" },
  { text: "ES-W-0003", value: "ES-W-0003" },
  { text: "ES-W-0004", value: "ES-W-0004" },
  { text: "ES-W-0005", value: "ES-W-0005" },
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
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  .van-col {
    .van-dropdown-menu {
      :deep(.van-dropdown-menu__bar) {
        background-color: transparent;
        box-shadow: none;
        height: 60px;
        .van-dropdown-menu__item {
          .van-dropdown-menu__title {
            color: var(--text-color);
            font-size: 32px;
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
            font-size: 32px;
          }
        }
      }
    }
    .date {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 32px;
      color: var(--text-color);
      i {
        margin-left: 10px;
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
}
.table {
  height: calc(100% - 80px);
  overflow: hidden;
  margin-top: 20px;
  background-color: var(--HistoryData-table-color);
  border-radius: 24px 24px 0 0;
  padding: 10px 24px 0 24px;
  box-sizing: border-box;

  .vxe-table {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: none;
    background-color: transparent;
    :deep(.vxe-table--render-wrapper) {
      height: 100%;
      font-size: 24px;
      color: var(--text-color);
      .vxe-table--main-wrapper {
        height: 100%;
        border: none;
        .vxe-table--header-wrapper {
          height: 64px;
          background-color: var(--HistoryData-table-color);
          .vxe-table--header {
            height: 64px;
            color: var(--HistoryData-table-headcolor);

            .vxe-header--row {
              .vxe-header--column {
                background: none !important;
              }
            }
          }
          .vxe-table--header-border-line {
            display: none !important;
          }
        }
        .vxe-table--body-wrapper {
          height: 100%;
          overflow: auto;

          .vxe-table--body {
            background-color: transparent;
            .vxe-body--row {
              height: 64px;
              border: none;

              .vxe-body--column {
                background: none;
              }
            }
            .vxe-body--row:nth-child(2n + 2) {
              background-color: var(--HistoryData-table-rowColor);
            }
          }
        }
      }
    }
    :deep(.vxe-table--border-line) {
      display: none;
    }
    :deep(.vxe-table--empty-placeholder) {
      .vxe-table--empty-content {
        font-size: 28px;
      }
    }
  }
}
</style>
