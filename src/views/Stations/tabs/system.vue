<template>
  <div class="system">
    <div class="tabTypeBox">
      <van-tabs v-model:active="tabActive" type="card" :ellipsis="false">
        <van-tab
          v-for="(item, index) in tabList"
          :title="item.label + '(' + item.count + ')'"
        >
        </van-tab>
      </van-tabs>
      <div class="searchBox">
        <van-search v-model="stationName" :placeholder="$t('system.search')" />
      </div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="$t('system.noMore')"
        @load="onLoad"
      >
        <div
          class="systemCard"
          @click="goSystem"
          v-for="(item, index) in syslist"
        >
          <img :src="changeBg(item.state).url" />
          <div
            class="state"
            :style="'background-color:' + changeBg(item.state).color"
          >
            {{ changeBg(item.state).label }}
          </div>
          <div class="system">
            <div class="systemName">{{ item.label }}</div>
            <div class="inner">
              <div class="item">
                <p class="item-title">{{ $t("system.charge_value") }}</p>
                <p class="item-value">
                  <span>{{ item.Charge }}</span>
                  <span>kWh</span>
                </p>
              </div>
              <div class="item">
                <p class="item-title">{{ $t("system.disCharge_value") }}</p>
                <p class="item-value">
                  <span>{{ item.DisCharge }}</span>
                  <span>kWh</span>
                </p>
              </div>
              <div class="item">
                <p class="item-title">{{ $t("system.power") }}</p>
                <p class="item-value">
                  <span>{{ item.power }}</span>
                  <span>kW</span>
                </p>
              </div>
              <div class="item">
                <p class="item-title">{{ $t("system.soc") }}</p>
                <p class="item-value">
                  <span>{{ item.soc }}</span>
                  <span>%</span>
                </p>
              </div>
            </div>
            <van-progress :show-pivot="false" :percentage="80" />
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script setup>
//数据导入
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import useLocalStorage from "@/store/modules/localStorage";
//data
const { t } = useI18n();
const router = useRouter();

const stationName = ref("");
const loading = ref(false);
const finished = ref(false);
const tabActive = ref(0);

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

const tabList = reactive([
  { label: t("system.all"), name: 0, count: 5 },
  { label: t("system.charge"), name: 1, count: 1 },
  { label: t("system.disCharge"), name: 2, count: 1 },
  { label: t("system.standby"), name: 3, count: 1 },
  { label: t("system.failure"), name: 4, count: 1 },
  { label: t("system.shutDown"), name: 5, count: 1 },
]);
//METHODS
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  finished.value = true;
};
const store = useLocalStorage();
const goSystem = () => {
  router.push("/systemOverview");
};

//根据充电状态切换背景图

let changeBg = computed(() => {
  let theme = store.theme;
  let base_url = "../../../assets/images/station/";
  return function (state) {
    if (state == 1) {
      return {
        label: t("system.all"), //充电
        color: "#2A83FF",
        url: new URL(`${base_url}charge_${theme}.png`, import.meta.url),
      };
    }
    if (state == 2) {
      return {
        label: t("system.disCharge"), //"放电",
        color: "#FFBA00",
        url: new URL(`${base_url}disCharge_${theme}.png`, import.meta.url),
      };
    }
    if (state == 3) {
      return {
        label: t("system.standby"), //"待机",
        color: "#15cdea",
        url: new URL(`${base_url}standby_${theme}.png`, import.meta.url),
      };
    }
    if (state == 4) {
      return {
        label: t("system.failure"), //"故障",
        color: "#ff646f",
        url: new URL(`${base_url}failure_${theme}.png`, import.meta.url),
      };
    } else {
      return {
        label: t("system.shutDown"), //"离网",
        color: "#a9a9a9",
        url: new URL(`${base_url}shutDown_${theme}.png`, import.meta.url),
      };
    }
  };
});
//根据选定的tab 筛选系统列表
const syslist = computed({
  get: () => {
    if (tabActive.value == 0) return list;
    return list.filter((item) => item.state == tabActive.value);
  },
});
</script>

<style lang="less" scoped>
.system {
  width: 100%;
  height: 100%;
  padding-top: 10px;

  .tabTypeBox {
    padding-top: 10px;
    background-color: transparent;
    .van-tabs {
      :deep(.van-tabs__wrap) {
        height: 73px;
        .van-tabs__nav {
          border: none;
          .van-tab {
            margin-right: 10px;
            border: none;
            border-radius: 4px;
            background-color: var(--system-tab-bg);
            span {
              line-height: 1;
              color: var(--text-color);
            }
          }
          .van-tab--active {
            background-color: #40e2c1 !important;
            span {
              color: #fff;
            }
          }
        }
      }
    }

    :deep(.searchBox) {
      .van-search {
        padding: 0 24px;
        background: none;

        .van-search__content {
          background: var(--system-tab-bg);
          border-radius: 64px 64px 64px 64px;

          .van-cell__value {
            input {
              text-indent: 20px;
              color: var(--text-color);
            }

            .van-field__body {
              .van-field__control {
                color: var(--text-color);
              }

              .van-field__control::placeholder {
                color: var(--vant-placeholder);
              }
            }
          }
        }
      }
    }

    .van-list {
      padding: 0 24px;

      .systemCard {
        position: relative;

        height: 222px;
        border-radius: 16px;
        margin-top: 24px;
        img {
          position: absolute;
          z-index: 1;
          width: 99.5%;
        }

        .state {
          position: absolute;
          top: 10px;
          right: 6px;
          width: 100px;
          height: 50px;
          background-color: #ffba00;
          text-align: center;
          font-size: 22px;
          line-height: 46px;
          text-indent: 14px;
          color: #fff;
          border-top-right-radius: 16px;
        }
        .system {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          height: 222px;
          padding: 24px;
          box-sizing: border-box;
          position: absolute;
          z-index: 1;
          .systemName {
            height: 40px;
            font-size: 32px;
            line-height: 40px;
            color: var(--system-text-color);
          }
          .inner {
            display: flex;
            justify-content: space-between;
            .item {
              color: var(--text-color);
              .item-title {
                font-size: 28px;
                color: var(--system-text-lightColor);
                margin-bottom: 14px;
              }
              .item-value {
                font-size: 32px;
                span:last-child {
                  margin-left: 6px;
                  font-size: 22px;
                  color: var(--system-text-lightColor);
                }
              }
            }
          }
          .van-progress {
            overflow: hidden;
            background-color: rgba(76, 87, 85, 1);
            :deep(.van-progress__portion) {
              background: linear-gradient(90deg, #3bffff 0%, #7ec0ff 100%);
            }
            :deep(.van-progress__portion)::after {
              content: "";
              position: absolute;
              right: 0;
              width: 80px;
              height: 10px;
              background: linear-gradient(
                270deg,
                #ffffff 0%,
                rgba(255, 255, 255, 0) 100%
              );
              border-radius: 8px 8px 8px 8px;
              filter: blur(2px);
            }
          }
        }
      }
    }
  }
}
</style>
