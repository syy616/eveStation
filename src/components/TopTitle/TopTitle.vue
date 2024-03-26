<script setup>
import { ref } from 'vue';
//数据定义
const title = ref('电站总览')
</script>

<template>
    <div class="topTitle">
        <div class="titleBox">{{ $t("topTitle.title") }}</div>
    </div>
</template>
<style scoped lang="less">
    .topTitle{
        width: 100%;
        height: 88px;
        line-height: 88px;
        background: var(--topTitle-bg);
        text-align: center;
        font-size: 36px;
        font-weight: 500;
        color: var(--topTitle-color);
        position: fixed;
        top: 0;
        z-index: 9999;
    }
</style>