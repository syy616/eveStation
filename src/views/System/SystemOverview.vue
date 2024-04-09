<script setup>
    //数据导入
    import { onMounted, getCurrentInstance, ref } from "vue";
    import { useI18n } from "vue-i18n";
    import { useRouter } from "vue-router";
    import WaterChart from "./Tabs/WaterChart.vue";
    import singleSystem from './Tabs/SingleSystem.vue';
    import cluster from './Tabs/Cluster.vue';
    import cell from './Tabs/Cell.vue';
    const router = useRouter();
    const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
    const { t } = useI18n();
    const active = ref(0);
    const tabActived = ref('system');
    const selectActive = ref(0);
    const fieldValue = ref("亿纬时代B区");
    const showClass = ref("");
    const myArrow = ref("");
    const showTop = ref(false);
    const overlayShow = ref(false);
    const tabList = ref([
        { label: "ES-W-00082(#1)", },
        { label: "ES-W-00082(#2)", },
        { label: "ES-W-00082(#3)", },
        { label: "ES-W-00082(#4)", },
        { label: "ES-W-00082(#5)", },
        { label: "ES-W-00082(#6)", },
        { label: "ES-W-00082(#7)", },
        { label: "ES-W-00082(#8)", },
        { label: "ES-W-00082(#9)", },
        { label: "ES-W-00082(#10)", },
    ]);
    const dataList = ref(
        {
            power: 989.23,
            tem: 23.3,
            voltage: 750.23,
            current: 23.3,
            soc: 0.7,
            list: [
                { label: t('systemPage.maxSingleV'), data: 999.99, unit: "V", color: "" },
                { label: t('systemPage.soh'), data: 34, unit: "%", color: "" },
                { label: t('systemPage.maxSingleT'), data: 33, unit: "℃", color: "red" },
                { label: t('systemPage.minSingleV'), data: 349.34, unit: "V", color: "" },
                { label: t('systemPage.wet'), data: 24, unit: "%", color: "" },
                { label: t('systemPage.minSingleT'), data: 40, unit: "℃", color: "blue" },
            ]
        });
    const systemName = ref("");
    const chooseSystemName = ref("");
    //生命周期
    onMounted(() => {
        systemName.value = tabList.value[0].label;
    });

    //methods
    const showAllsys = () => {
        showTop.value = !showTop.value;
        showTop.value ? showClass.value = 'myPopShow' : showClass.value = 'myPopNone';
        showTop.value ? myArrow.value = 'myarrowShow' : myArrow.value = 'myarrowNone';
        showTop.value ? overlayShow.value = true : overlayShow.value = false;
        if (selectActive.value !== active.value) {
            selectActive.value = active.value;
            chooseSystemName.value = systemName.value;
        }
    }
    //点击tab栏更改下拉框中的选中值
    const chooseSystemData = (index, title) => {
        // selectActive.value = index.name;
        // systemName.value = index.title;
        selectActive.value = index;
        systemName.value = title;
    }
    //点击下拉框中的div，更改值并同步更改背景图
    const selectSystem = (index, title) => {
        selectActive.value = index;
        chooseSystemName.value = title;
    }
    //确认按钮，确认选择的系统div，并将tab切换为选中的系统
    const confirmSystem = () => {
        active.value = selectActive.value;
        systemName.value = chooseSystemName.value;
        overlayShow.value = false;
        showTop.value = false;
        showClass.value = 'myPopNone';
        myArrow.value = 'myarrowNone';
    }
</script>
<template>
    <div class="systemOverview">
        <van-row class="header">
            <span class="back" @click="router.go(-1)">
                <van-icon name="arrow-left" /></span>
            <van-row class="title">
                <span>{{ fieldValue }}</span>
            </van-row>
        </van-row>
        <van-row class="tabBox">
            <van-col span="22">
                <van-tabs v-model:active="active" @change="chooseSystemData">
                    <van-tab v-for="(item, index) in tabList" :title="item.label">
                    </van-tab>
                </van-tabs>
            </van-col>
            <van-col span="2" class="arrowBox">
                <van-icon name="arrow-up" :class="myArrow" @click="showAllsys" />
            </van-col>
        </van-row>
        <van-row class="waterRow">
            <WaterChart :dataList="dataList" :isTop="true"></WaterChart>
        </van-row>
        <van-row class="sysTabBox">
            <van-tabs class="tabFirst" v-model:active="tabActived">
                <van-tab name="system" :title="$t('systemPage.systemTitle1')">
                    <singleSystem v-if="tabActived === 'system'" :sysName="systemName" />
                </van-tab>
                <van-tab name="cluster" :title="$t('systemPage.systemTitle2')">
                    <cluster v-if="tabActived === 'cluster'" />
                </van-tab>
                <van-tab name="cell" :title="$t('systemPage.systemTitle3')">
                    <cell v-if="tabActived === 'cell'" :sysName="systemName" :sysId="selectActive" />
                </van-tab>
            </van-tabs>
        </van-row>
        <van-overlay :show="overlayShow" z-index="998" close-on-click-overlay="false" />
        <div :class="[showClass, 'myPop']">
            <van-row>
                <van-col span="24">
                    <span class="myPopTitle">{{ $t('systemPage.myPopTitle') }}</span>
                </van-col>
                <div class="sysListBox">
                    <van-row :gutter="[10, 10]">
                        <van-col v-for="(item, index) in tabList" span="12">
                            <div class="systemNameBox" :class="selectActive == index ? 'systemNameBoxCheck' : ''"
                                @click="selectSystem(index,item.label)">{{ item.label }}</div>
                        </van-col>
                    </van-row>
                </div>
                <van-col class="btnCol">
                    <van-button type="primary" class="confirm" @click="confirmSystem">确定</van-button>
                </van-col>
            </van-row>
        </div>

    </div>
</template>

<style scoped lang="less">
.systemOverview {
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    background: var(--systemOverview-bg);

    .header {
        position: fixed;
        z-index: 1000;
        width: 100%;
        background-color: var(--systemOverview-header-bg);

        .back {
            height: 100%;
            position: absolute;
            left: 20px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
                -ms-flex-align: center;
                    align-items: center;

            .van-icon {
                font-size: 38px;
                color: var(--text-color);
            }
        }

        .title {
            width: 100%;
            height: 80px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
                -ms-flex-pack: center;
                    justify-content: center;
            line-height: 80px;
            text-align: center;
            font-size: 38px;
            color: var(--text-color);
        }
    }

    :deep(.tabBox) {
        margin-top: 80px;
        z-index: 999;
        background-color: var(--systemOverview-header-bg);

        .van-tabs {
            .van-tabs__wrap {
                height: 73px;

                .van-tabs__nav {
                    background: none;

                    .van-tab {
                        color: var(--allStation-tab-title);
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
    }

    .arrowBox {
        height: 70px;
        color: var(--text-color);
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-shadow: var(--systemOverview-arrow);
                box-shadow: var(--systemOverview-arrow);
    }

    .waterRow {
        padding: 24px;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
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

    .myPop {
        z-index: 998;
        display: none;
        background-color: var(--systemOverview-showBg);
        border-radius: 0 0 24px 24px;
        padding: 24px 24px 0 24px;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;

        .myPopTitle {
            color: var(--allStation-tab-title);
            font-weight: 400;
            font-family: PingFang SC, PingFang SC;
            font-size: 30px;
            line-height: 38px;
            font-style: normal;
        }

        .sysListBox {
            width: 100%;
            height: 270px;
            overflow: scroll;
            margin-top: 24px;

            .systemNameBox {
                width: 100%;
                height: 70px;
                border-radius: 8px 8px 8px 8px;
                text-align: center;
                line-height: 70px;
                font-size: 30px;
                font-weight: 400;
                color: var(--allStation-tab-title);
                background-color: var(--systemOverview-sysBg);
            }

            .systemNameBoxCheck {
                color: #40e2c1;
                background: var(--systemOverview-SubSys-bg) no-repeat;
                background-size: 100% 100%;
            }
        }

        .btnCol {
            width: 100%;
            height: 104px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
                -ms-flex-align: center;
                    align-items: center;

            .confirm {
                width: 100%;
                height: 80px;
                border: 8px;
                border: none;
                background-color: #40e2c1;
                color: #FFFFFFFF;
                font-size: 34px;
                font-family: PingFang SC, PingFang SC;
            }
        }
    }

    .myPopShow {
        width: 100%;
        position: absolute;
        top: 166px;
        display: block;
        animation: mymove .25s linear;
        -webkit-animation: mymove .25s linear;
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode: forwards;
    }

    .myPopNone {
        width: 100%;
        position: absolute;
        z-index: 9999;
        top: 166px;
        display: none;
        animation: mymovenone .25s linear;
        animation-fill-mode: forwards;
        -webkit-animation: mymovenone .25s linear;
        -webkit-animation-fill-mode: forwards;
    }

    @-webkit-keyframes mymove {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -200px, 0);
                    transform: translate3d(0, -200px, 0);
        }

        100% {
            display: block;
            -webkit-transform: translate3d(0, 0px, 0);
                    transform: translate3d(0, 0px, 0);

            opacity: 1;
        }
    }

    @keyframes mymove {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -200px, 0);
                    transform: translate3d(0, -200px, 0);
        }

        100% {
            display: block;
            -webkit-transform: translate3d(0, 0px, 0);
                    transform: translate3d(0, 0px, 0);

            opacity: 1;
        }
    }

    @-webkit-keyframes mymovenone {
        0% {
            -webkit-transform: translate3d(0, 0px, 0);
                    transform: translate3d(0, 0px, 0);
            opacity: 1;
        }

        100% {
            -webkit-transform: translate3d(0, -200px, 0);
                    transform: translate3d(0, -200px, 0);
            opacity: 0;
        }
    }

    @keyframes mymovenone {
        0% {
            -webkit-transform: translate3d(0, 0px, 0);
                    transform: translate3d(0, 0px, 0);
            opacity: 1;
        }

        100% {
            -webkit-transform: translate3d(0, -200px, 0);
                    transform: translate3d(0, -200px, 0);
            opacity: 0;
        }
    }

    .van-overlay {
        top: 166px;
    }

    :deep(.sysTabBox) {
        width: 100%;
        background-color: var(--systemOverview-header-bg);
        border-radius: 24px 24px 0px 0px;

        .van-tabs {
            width: 100%;

            .van-tabs__wrap {
                height: 73px;

                .van-tabs__nav {
                    background: none;

                    .van-tab {
                        color: var(--allStation-tab-title);
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
    }

}
</style>