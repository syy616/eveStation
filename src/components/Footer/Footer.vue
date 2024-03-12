<script setup>
import { ref } from 'vue';
import footerItem from "@components/Footer/FooterItem.vue";
import { useI18n } from 'vue-i18n'

//数据定义
const i18n = useI18n()
const menuList = ref([
    { 
    label: i18n.t("menus.footer[0]") , id: "0", path:'/IndexPage/allStation',
    icon: new URL("@/assets/images/Index/chart.png", import.meta.url), 
    activeIcon: new URL("@/assets/images/Index/chart_selected.png", import.meta.url) },
    { label: i18n.t("menus.footer[1]"), id: "1",path:'/IndexPage/allEvent',  icon: new URL("@/assets/images/Index/rmon.png", import.meta.url), activeIcon: new URL("@/assets/images/Index/rmon_selected.png", import.meta.url) },
    { label: i18n.t("menus.footer[2]"), id: "2",path:'/IndexPage/historyData',  icon: new URL("@/assets/images/Index/user.png", import.meta.url), activeIcon: new URL("@/assets/images/Index/user_selected.png", import.meta.url) },
    { label: i18n.t("menus.footer[3]"), id: "3",path:'/IndexPage/myPage',  icon: new URL("@/assets/images/Index/worktop.png", import.meta.url), activeIcon: new URL("@/assets/images/Index/worktop_selected.png", import.meta.url) }
])

</script>

<template>
    <div class="footerPage">
        <footerItem v-for="(item, index) in menuList" :key="index" :clildProps="item.path" item-id="item.id">
            <template v-slot:item-icon>
                <img :src="item.activeIcon">
            </template>

            <template #item-icon-active>
                <img :src="item.icon">
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
    padding-bottom: 20px;
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
            color: var(--menuColor);
            font-size: 20px;
            text-align: center;
        }
    }
}
</style>