<script setup>
//数据导入
import { onMounted, getCurrentInstance, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";


const router = useRouter();
const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t } = useI18n();
const active = ref(0);
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


//生命周期
onMounted(() => {

});

//methods
const showAllsys = () => {
    showTop.value = !showTop.value;
    showTop.value ? showClass.value = 'myPopShow' : showClass.value = 'myPopNone';
    showTop.value ? myArrow.value = 'myarrowShow' : myArrow.value = 'myarrowNone';
    showTop.value ? overlayShow.value = true : overlayShow.value = false;

}
const overlayClick = () => {
    overlayShow.value = false;
    showTop.value = false;
    showClass.value = 'myPopNone';
    myArrow.value = 'myarrowNone';
}
//点击tab栏更改下拉框中的选中值
const chooseSystemData=(index)=>{
    selectActive.value = index.name;
}
//点击下拉框中的div，更改值并同步更改背景图
const selectSystem=(e,index)=>{
    selectActive.value = index;
}
//确认按钮，确认选择的系统div，并将tab切换为选中的系统
const confirmSystem=()=>{
    active.value =selectActive.value;
    showAllsys();
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
                <van-tabs v-model:active="active" @click-tab="chooseSystemData">
                    <van-tab v-for="(item, index) in tabList" :title="item.label" >

                    </van-tab>
                </van-tabs>
            </van-col>
            <van-col span="2" class="arrowBox">
                <van-icon name="arrow-up" :class="myArrow" @click="showAllsys" />
            </van-col>
        </van-row>
        <van-overlay :show="overlayShow" @click="overlayClick" z-index="998" />
        <div :class="[showClass, 'myPop']">
            <van-row>
                <van-col span="24">
                    <span class="myPopTitle">{{ $t('systemPage.myPopTitle') }}</span>
                </van-col>
                <div class="sysListBox">
                    <van-row :gutter="[10, 10]">
                        <van-col v-for="(item, index) in tabList" span="12">
                            <div class="systemNameBox" :class="selectActive==index?'systemNameBoxCheck':''" @click="selectSystem($event,index)">{{ item.label }}</div>
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
    display: flex;
    flex-direction: column;
    background-color: var(--stations-background-color);

    .header {
        position: fixed;
        z-index: 999;
        width: 100%;
        background-color: var(--stations-head-color);

        .back {
            height: 100%;
            position: absolute;
            left: 20px;
            display: flex;
            align-items: center;

            .van-icon {
                font-size: 38px;
                color: var(--text-color);
            }
        }

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

    :deep(.tabBox) {
        margin-top: 80px;
        z-index: 999;
        background-color: var(--stations-head-color);

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
                        // }
                    }
                }
            }
        }

        .arrowBox {
            height: 70px;
            color: var(--text-color);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--systemOverview-arrow);
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

    @keyframes myarrow {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(180deg);
        }
    }

    @keyframes myarrownone {
        0% {
            transform: rotate(180deg);
        }

        100% {
            transform: rotate(0deg);
        }
    }

    .myPop {
        z-index: 998;
        display: none;
        background-color: var(--systemOverview-showBg);
        border-radius: 0 0 24px 24px;
        padding: 24px 24px 0 24px;
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

            .systemNameBoxCheck{
                color: #40e2c1;
                background: var(--systemOverview-SubSys-bg) no-repeat;
                background-size: 100% 100%;
            }
        }

        .btnCol {
            width: 100%;
            height: 104px;
            display: flex;
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

    @keyframes mymove {
        0% {
            opacity: 0;
            transform: translate3d(0, -200px, 0);
        }

        100% {
            display: block;
            transform: translate3d(0, 0px, 0);

            opacity: 1;
        }
    }

    @keyframes mymovenone {
        0% {
            transform: translate3d(0, 0px, 0);
            opacity: 1;
        }

        100% {
            transform: translate3d(0, -200px, 0);
            opacity: 0;
        }
    }

    .van-overlay {
        top: 166px;
    }


}
</style>