<template>
  <div class="equipment">
    <van-row class="header">
      <van-col span="12">{{ t("equipment.equipment") }}</van-col>
      <van-col span="12">{{ t("equipment.state") }}</van-col>
    </van-row>
    <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
      <van-row class="equipment-list" v-for="(item, index) in list">
        <van-col span="12">{{ item.label }}</van-col>
        <van-col span="12">{{ item.value }}</van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const list = reactive([
  { label: "PCS-1", value: "正常" },
  { label: "PCS-2", value: "正常" },
  { label: "PCS-3", value: "正常" },
  { label: "PCS-4", value: "正常" },
  { label: "PCS-5", value: "正常" },
  { label: "PCS-6", value: "正常" },
  { label: "PCS-7", value: "正常" },
  { label: "PCS-8", value: "正常" },
]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  finished.value = true;
};
</script>

<style lang="less" scoped>
.equipment {
  width: 100%;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
}
.header {
  height: 58px;
  line-height: 58px;
  color: var(--equipment-listTitle-color);
  .van-col {
    background-color: var(--equipment-list-bg);
    text-align: center;
    font-size: 26px;
  }
}
.equipment-list {
  height: 58px;
  line-height: 58px;
  background-color: var(--equipment-list-bg);
  .van-col {
    text-align: center;
    font-size: 26px;
    color: var(--text-color);
  }
}
.equipment-list:nth-child(2n-1) {
  background-color: transparent;
}
</style>
