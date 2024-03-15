<script setup>
//数据导入
import tabListItem from "@components/StationCard/StationTabPage.vue";
import { onMounted,computed, reactive, ref, toRaw } from 'vue'
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n'
//data
const { t } = useI18n();
const router = useRouter();

const tabActive = ref(0);
const stationName = ref('');
const loading = ref(false);
const finished = ref(false);
const list = reactive([
    { label: "亿纬锂能B区", id: 1, imgSrc: new URL("@/assets/images/Index/pic.png", import.meta.url), power: 123.10, dayCharge: 232.32, dayDisCharge: 456.37, capacity: 133.23, addr: "广东省惠州市仲恺高新区回风8路2323号", state: 1, runTime: 1000 },
    { label: "亿纬锂能B区", id: 2, imgSrc: new URL("@/assets/images/Index/pic.png", import.meta.url), power: 123.40, dayCharge: 232.32, dayDisCharge: 456.35, capacity: 133.23, addr: "广东省惠州市仲恺高新区回风8路2323号", state: 2, runTime: 1000 },
    { label: "亿纬锂能B区", id: 3, imgSrc: new URL("@/assets/images/Index/pic.png", import.meta.url), power: 123.35, dayCharge: 232.32, dayDisCharge: 456.35, capacity: 133.23, addr: "广东省惠州市仲恺高新区回风8路2323号", state: 3, runTime: 1000 },
    { label: "亿纬锂能B区", id: 4, imgSrc: new URL("@/assets/images/Index/pic.png", import.meta.url), power: 123.14, dayCharge: 232.32, dayDisCharge: 456.35, capacity: 133.23, addr: "广东省惠州市仲恺高新区回风8路2323号", state: 5, runTime: 1000 },
    { label: "亿纬锂能B区", id: 5, imgSrc: new URL("@/assets/images/Index/pic.png", import.meta.url), power: 123.26, dayCharge: 232.32, dayDisCharge: 456.35, capacity: 133.23, addr: "广东省惠州市仲恺高新区回风8路2323号", state: 6, runTime: 1000 },
    { label: "亿纬锂能B区", id: 6, imgSrc: new URL("@/assets/images/Index/pic.png", import.meta.url), power: 123.28, dayCharge: 232.32, dayDisCharge: 456.35, capacity: 133.23, addr: "广东省惠州市仲恺高新区回风8路2323号", state: 4, runTime: 1000 },
]);
const newlist = [
    { label: "亿纬锂能潼湖厂区", id: 1, power: 12.10, dayCharge: 232.32, dayDisCharge: 456.37, capacity: 133.23, addr: "广东省惠州市仲恺高新区回风8路2323号", state: 1, runTime: 349 },
    { label: "亿纬锂能潼湖厂区", id: 2, power: 12.44, dayCharge: 232.32, dayDisCharge: 456.35, capacity: 133.23, addr: "广东省惠州市仲恺高新区回风8路2323号", state: 2, runTime: 349 },
];
const tabList = reactive([
    { label: t('stationType.tab1'), name: 1, count: 107 },
    { label: t('stationType.tab2'), name: 2, count: 4 },
    { label: t('stationType.tab3'), name: 3, count: 35 },
    { label: t('stationType.tab4'), name: 4, count: 14 },
    { label: t('stationType.tab5'), name: 5, count: 26 },
    { label: t('stationType.tab6'), name: 6, count: 28 },
])
//METHODS
const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    finished.value = true;

    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       list.value.push(list.value.length + 1);
    //     }

    //     // 加载状态结束
    //     loading.value = false;

    //     // 数据全部加载完成
    //     if (list.value.length >= 40) {
    //       finished.value = true;
    //     }
    //   }, 4000);
}
const selectType = (item) => {
    switch (item.name) {
        case 1:
            console.log(list);

            break;
        case 2:
            console.log(list);
            list.splice(0, list.length, ...newlist);
            break;
        case 3:
            list.splice(0, list.length)
            break;
        default:
            console.log(list);
            break;
    }
}
const goStation = () => {
    router.push("/station");
}
let changeBg = computed(()=>{
    return function(state){
        if(state ==1){return 'state1';}
        if(state==2){return 'state2';}
        if(state==3){return 'state3';}
        if(state==4){return 'state4';}
        else{return 'state5';}
    }
})
let cardBg = computed(()=>{
    return function(state){
        if(state ==1){return 'bg1';}
        if(state==2){return 'bg2';}
        if(state==3){return 'bg3';}
        if(state==4){return 'bg4';}
        else{return 'bg5';}
    }
})
</script>

<template>
    <div class="StationTabPage">
        <div class="tabTypeBox">
            <van-tabs v-model:active="tabActive" type="card" @click-tab="selectType">
                <van-tab v-for="(item, index) in tabList" :title="item.label + ' (' + item.count + ')'">
                </van-tab>
            </van-tabs>
            <div class="searchBox">
                <van-search v-model="stationName" placeholder="请输入电站名称" />
            </div>
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="stationCard" v-for="(item, index) in list" @click="goStation">
                    <van-row :class="cardBg(item.state)">
                        <van-col span="7">
                            <div class="imgBox">
                                <div class="stateTip" :class="changeBg(item.state)" v-if="item.state == 1">{{ $t('allStation.stateCharge') }}</div>
                                <div class="stateTip" :class="changeBg(item.state)" v-else-if="item.state == 2">{{$t('allStation.stateDisCharge') }}</div> 
                                <div class="stateTip" :class="changeBg(item.state)" v-else-if="item.state == 3">{{$t('allStation.stateFailure') }}</div> 
                                <div class="stateTip" :class="changeBg(item.state)" v-else-if="item.state == 4">{{$t('allStation.stateShutDown') }}</div> 
                                <div class="stateTip" :class="changeBg(item.state)" v-else>{{ $t('allStation.stateStandby') }}</div>
                                <van-image radius="8" :src="item.imgSrc" />
                            </div>
                        </van-col>
                        <van-col span="17">
                            <div class="rightBox">
                                <div class="runTime" :class="changeBg(item.state)">安全运行<span>{{ item.runTime }}</span>天</div>
                                <div class="stationInfo">
                                    <div class="stationName">
                                        <p>{{ item.label }}</p> <van-icon name="arrow" />
                                    </div>
                                    <div class="powerInfo">
                                        <div class="powerDataBox">
                                            <div class="powerTitle">{{ $t('stationData.capacity') }}</div>
                                            <div class="powerData">{{ item.capacity }}<span>kWh</span></div>
                                        </div>
                                        <div class="powerDataBox">
                                            <div class="powerTitle">{{ $t('stationData.dailyCharge') }}</div>
                                            <div class="powerData">{{ item.dayCharge }}<span>kWh</span></div>
                                        </div>
                                        <div class="powerDataBox">
                                            <div class="powerTitle">{{ $t('stationData.dailyDisCharge') }}</div>
                                            <div class="powerData">{{ item.dayDisCharge }}<span>kWh</span></div>
                                        </div>
                                        <div class="powerDataBox">
                                            <div class="powerTitle">{{ $t('stationData.power') }}</div>
                                            <div class="powerData">{{ item.power }}<span>kW</span></div>
                                        </div>
                                    </div>
                                    <div class="addrInfo">地址：{{ item.addr }}</div>
                                </div>
                            </div>

                        </van-col>
                    </van-row>
                </div>
            </van-list>
        </div>

    </div>
</template>
<style scoped lang="less">
.allStation {
    width: 100%;
    height: 100%;
    padding-top: 10px;

    .tabTypeBox {
        .van-tabs {

            // width: 100%;
            // border-radius: 24px 24px 0 0;
            .van-tabs__wrap {
                height: 73px;

                .van-tabs__nav--card {
                    border: none;
                    background: none;

                    .van-tab {
                        color: var(--allStation-tab-title);
                        background: var(--allStation-tab2-bg);
                        margin-right: 10px;
                        border: none;
                        border-radius: 4px;
                    }

                    .van-tab--active {
                        color: #ffffff;
                        background-color: #40E2C1;
                    }
                }
            }
        }

        :deep(.searchBox) {
            .van-search {
                padding: 0 24px;
                background: none;

                .van-search__content {
                    background: var(--allStation-tab2-bg);
                    border-radius: 64px 64px 64px 64px;

                    .van-cell__value {
                        input {
                            color: #FFFFFF8C;
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

            .stationCard {
                height: 232px;
                margin-top: 24px;
                border-radius: 0px 50px 16px 16px;
                box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.15);
                .van-row {
                    height: 100%;
                    border-radius: 0px 50px 16px 16px;
                    background-size:cover;
                    background-repeat: no-repeat;
                    .van-col {
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .imgBox {
                            width: 176px;
                            height: 176px;
                            position: relative;

                            .stateTip {
                                width: 64px;
                                height: 32px;
                                line-height: 32px;
                                border-radius: 16px 0px 16px 0px;
                                position: absolute;
                                top: 0;
                                left: 0;
                                z-index: 2;
                                font-size: 20px;
                                color: #ffffff;
                                text-align: center;
                            }
                            .van-image {
                                width: 176px;
                                height: 176px;

                            }
                        }

                        .rightBox {
                            width: 100%;
                            height: 100%;

                            position: relative;
                            display: flex;
                            align-items: center;

                            .runTime {
                                height: 36px;
                                display: flex;
                                align-items: center;
                                position: absolute;
                                top: 8px;
                                right: 10px;
                                border-radius: 0px 32px 0px 32px;
                                padding: 5px 20px;
                                color: #ffffff;
                                font-size: 18px;

                                p{
                                font-size: 18px;
                                }
                                span {
                                    font-weight: bold;
                                    font-size: 28px;
                                }
                            }

                            .stationInfo {
                                width: 100%;
                                height: 179px;

                                .stationName {
                                    height: 60px;
                                    line-height: 60px;
                                    display: flex;
                                    align-items: center;

                                    color: var(--allStation-tab-title);
                                    font-size: 32px;
                                    font-weight: 500;

                                    i {
                                        font-weight: bold;
                                        font-size: 24px;
                                        margin-left: 10px;
                                    }
                                }

                                .powerInfo {
                                    height: 88px;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;

                                    .powerDataBox {
                                        padding-right: 20px;
                                        height: 88px;
                                        width: 100px;

                                        .powerTitle {
                                            font-size: 22px;
                                            font-weight: 400;
                                            color: var(--allStation-data-title);

                                        }

                                        .powerData {
                                            margin-top: 10px;
                                            font-weight: 500;
                                            font-size: 26px;
                                            color: var(--allStation-tab-title);

                                            span {
                                                font-size: 18px;
                                                font-weight: 400;
                                                color: var(--allStation-data-title);
                                                margin-left: 3px;
                                            }
                                        }
                                    }
                                }

                                .addrInfo {
                                    overflow: hidden;
                                    padding-right: 20px;
                                    white-space: inherit;
                                    color: var(--allStation-tab-title);
                                    height: 30px;
                                    font-size: 22px;
                                }
                            }
                        }

                        .state1 {
                                background-color: var(--allStation-state-charge)
                            }

                            .state2 {
                                background-color: var(--allStation-state-disCharge)
                            }

                            .state3 {
                                background-color: var(--allStation-state-Failure)
                            }

                            .state4 {
                                background-color: var(--allStation-state-OffGrid)
                            }

                            .state5 {
                                background-color: var(--allStation-state-Standby)
                            }
                    }
                }

                .bg1{
                    background-image:var(--allStation-state-charge-bg);
                }
                .bg2{
                    background-image:var(--allStation-state-disCharge-bg);
                }
                .bg3{
                    background-image:var(--allStation-state-Failure-bg);
                }
                .bg4{
                    background-image:var(--allStation-state-OffGrid-bg);
                }
                .bg5{
                    background-image:var(--allStation-state-Standby-bg);
                }
            }
        }
    }
}
</style>