<script setup>
import { ref } from 'vue';
import footerItem from "@components/Footer/FooterItem.vue";

//数据定义
const menuList = ref([
    { label: "电站总览", id: "1001", isActive: true, icon: new URL("@/assets/images/Index/chart.png", import.meta.url), activeIcon: new URL("@/assets/images/Index/chart_selected.png", import.meta.url) },
    { label: "总事件", id: "1002", isActive: false, icon: new URL("@/assets/images/Index/rmon.png", import.meta.url), activeIcon: new URL("@/assets/images/Index/rmon_selected.png", import.meta.url) },
    { label: "历史数据", id: "1003", isActive: false, icon: new URL("@/assets/images/Index/user.png", import.meta.url), activeIcon: new URL("@/assets/images/Index/user_selected.png", import.meta.url) },
    { label: "我的", id: "1004", isActive: false, icon: new URL("@/assets/images/Index/worktop.png", import.meta.url), activeIcon: new URL("@/assets/images/Index/worktop_selected.png", import.meta.url) }
])

</script>

<template>
    <div class="footerPage">
        <footerItem v-for="(item, index) in menuList" :key="index" path="" isActive="item.isActive">
            <template v-slot:item-icon>
                <img :src="item.icon">
            </template>

            <template #item-icon-active>
                <img :src="activeIcon">
            </template>

            <template #item-text>
                {{ item.label }}
            </template>
        </footerItem>
    </div>
</template>

<style lang="less">
.footerPage {
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .footerItem {
        width: 25%;
        .menuItem{
            text-align: center;
            img{
                width: 49px;
                height: 49px;
            }
        }
        .menuTitle {
            color: rgba(255, 255, 255, 0.55);
            font-size: 20px;
            text-align: center;
        }
    }
}
</style>