<script setup>
import { onMounted, onUnmounted, getCurrentInstance, ref, nextTick } from "vue";
import { useI18n } from 'vue-i18n'
import useLocalStorage from "@/store/modules/localStorage";
import { Lazyload } from 'vant';

const store = useLocalStorage();
const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t, locale } = useI18n();
//主题色
const labelColor = ref('#FFFFFF8C');
const props = defineProps({
    dataList: Object,
    isTop: Boolean
})
const waterHeight = ref([props.dataList.soc, props.dataList.soc + 0.05]);
const waterOption = ref({
    series: {
        type: 'liquidFill',
        radius: '99%',
        center: ['50%', '50%'],
        color: [
            {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: '#446bf5',
                    },
                    {
                        offset: 1,
                        color: '#40E2C1FF',
                    },
                ],
                globalCoord: false,
            },
        ],
        data: [0, 0], // data个数代表波浪数
        backgroundStyle: {
            borderWidth: 1,
            color: 'RGBA(51, 66, 127, 0)',
        },
        label: {
            formatter: function (params) {
                return `{a|SOC}\n ${(params.value * 100).toFixed(0)}{b|%} `
            },
            rich: {
                a: {
                    fontSize: 18,
                    align: 'center',
                    fontWeight: 400,
                    padding: [0, 0, 5, 0]
                },
                b: {
                    fontSize: 20,
                    fontWeight: 500,
                }
            },
            fontSize: 28,
            fontWeight: 500,
            color: labelColor,
        },
        outline: {
            // show: false
            borderDistance: 0,
            itemStyle: {
                borderWidth: 2,
                borderColor: '#40E2C1FF',
            },
        },
    },
});
const socChartBox = ref(null);
let socChart = null;
const getData = () => {
    waterOption.value.series.data = waterHeight.value;
    nextTick(() => {
        // Lazyload.lazyLoad(socChartBox.value, () => {
            socChartInit();
        // });
    })
}
//init图表
const socChartInit = () => {
    socChart = echarts.init(socChartBox.value);
    socChart.setOption(waterOption.value);
    window.onresize = function () {
        socChart.resize();
    };
};
//判断主题颜色,修改图表颜色
const chartColor = () => {
    let theme = store.theme;
    switch (theme) {
        case 'dark':
            labelColor.value = "#FFFFFF";
            break;
        case 'light':
            labelColor.value = "#000000";
            break;
        default:
            labelColor.value = "#FFFFFF";
            break;
    }
};
//生命周期
onMounted(() => {
    getData();
    chartColor();
});
onUnmounted(() => {
    window.removeEventListener('resize', socChart.resize);
    socChart.dispose();
});
</script>

<template>
    <div class="waterBall">
        <div class="waterContent">
            <van-row class="waterTitle" v-if="isTop">
                <span>{{ $t('systemPage.sysRunStateTitle') }}</span>
            </van-row>
            <van-row class="topContent">
                <div class="leftContent sideContent">
                    <div class="topDataBox">
                        <div class="topData">{{ props.dataList.power }}<span>kW</span></div>
                        <div class="leftTopDash dashLine"></div>
                        <div class="topTitle">{{ $t('systemPage.power') }}</div>
                    </div>
                    <div class="bottomDataBox">
                        <div class="topData">{{ props.dataList.tem }}<span>℃</span></div>
                        <div class="leftBottomDash dashLine"></div>
                        <div class="topTitle">{{ $t('systemPage.tem') }}</div>
                    </div>
                </div>
                <div class="waterChart" id="waterChart" ref="socChartBox">

                </div>
                <div class="rightContent sideContent">
                    <div class="topDataBox">
                        <div class="topData">{{ props.dataList.voltage }}<span>V</span></div>
                        <div class="rightTopDash dashLine"></div>
                        <div class="topTitle">{{ $t('systemPage.voltage') }}</div>
                    </div>
                    <div class="bottomDataBox">
                        <div class="topData">{{ props.dataList.current }}<span>A</span></div>
                        <div class="rightBottomDash dashLine"></div>
                        <div class="topTitle">{{ $t('systemPage.current') }}</div>
                    </div>
                </div>
            </van-row>
            <van-row class="bottomContent" :gutter="[12, 12]">
                <van-col span="8" class="bottomCol" v-for="(item, index) in props.dataList.list">
                    <van-row class="bottomDataBox">
                        <van-col class="bottomData"
                            :class="item.color == 'red' ? 'redColor' : (item.color == 'blue' ? 'blueColor' : '')">{{
                item.data
            }}</van-col>
                        <van-col class="bottomDataUnit"
                            :class="item.color == 'red' ? 'redColor' : (item.color == 'blue' ? 'blueColor' : '')">{{
                item.unit
                            }}</van-col>
                    </van-row>
                    <van-row>
                        <van-col class="bottomTitle">{{ item.label }}</van-col>
                    </van-row>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<style scoped lang="less">
.waterBall {
    width: 100%;
    height: 626px;

    .waterContent {
        width: 100%;
        height: 100%;
        border-radius: 24px 24px 24px 24px;
        background-color: var(--systemOverview-showBg);
        padding-top: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;

        .waterTitle {
            width: 100%;
            height: 38px;
            margin-left: 24px;
            color: var(--allStation-tab-title);
            font-weight: 400;
            font-size: 28px;
            line-height: 38px;
            font-style: normal;
        }

        .topContent {
            width: 100%;
            height: 280px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            position: relative;
            margin-bottom: 34px;

            .sideContent {
                width: 176px;
                height: 280px;
                position: absolute;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: justify;
                -webkit-justify-content: space-between;
                -ms-flex-pack: justify;
                justify-content: space-between;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
            }

            .leftContent {
                left: 0;

                .topDataBox,
                .bottomDataBox {
                    width: 100%;
                    height: 100px;
                    margin: 24px 0 0 26px;
                }

                .leftTopDash {
                    height: 24px;
                    background: url("@/assets/images/system/line1.png") no-repeat;
                    background-size: 100% 100%;
                }

                .leftBottomDash {
                    height: 24px;
                    margin-top: -20px;
                    margin-bottom: 24px;
                    background: url("@/assets/images/system/line1.png") no-repeat;
                    background-size: 100% 100%;
                    -webkit-transform: scaleY(-1);
                    transform: scaleY(-1);
                }
            }

            .waterChart {
                width: 272px;
                height: 272px;
            }

            .rightContent {
                right: 26px;

                .topDataBox,
                .bottomDataBox {
                    width: 100%;
                    height: 100px;
                    margin: 24px 0px 0 0;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;

                    .topData {
                        text-align: right;
                    }

                    .topTitle {
                        text-align: right;
                    }
                }
            }

            .topData {
                height: 40px;
                line-height: 40px;
                margin-bottom: 3px;
                font-weight: 500;
                color: var(--allStation-box-data-color);
                font-size: 32px;
            }

            .topTitle {
                height: 36px;
                line-height: 36px;
                margin-top: -10px;
                color: var(--allStation-data-title);
                font-size: 28px;
            }

            .rightTopDash {
                height: 24px;
                background: url("@/assets/images/system/line2.png") no-repeat;
                background-size: 100% 100%;
            }

            .rightBottomDash {
                height: 24px;
                margin-top: -20px;
                margin-bottom: 24px;
                background: url("@/assets/images/system/line2.png") no-repeat;
                background-size: 100% 100%;
                -webkit-transform: scaleY(-1);
                transform: scaleY(-1);
            }
        }

        .bottomContent {
            // height: 220px;
            width: 100%;

            .bottomCol {
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                height: 84px;

                .bottomDataBox {
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: baseline;
                    -webkit-align-items: baseline;
                    -ms-flex-align: baseline;
                    align-items: baseline;
                    -webkit-box-pack: center;
                    -webkit-justify-content: center;
                    -ms-flex-pack: center;
                    justify-content: center;

                    .bottomData {
                        font-weight: 500;
                        font-size: 32px;
                        color: var(--allStation-box-data-color);
                    }

                    .bottomDataUnit {
                        font-weight: 400;
                        font-size: 22px;
                        color: var(--allStation-data-title);
                        margin-left: 5px;
                    }
                }

                .bottomTitle {
                    width: 100%;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: center;
                    -webkit-justify-content: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    font-weight: 400;
                    font-size: 28px;
                    color: var(--allStation-data-title);
                    font-style: normal;
                }
            }

            .redColor {
                color: #F02023FF !important;
            }

            .blueColor {
                color: #5487FFFF !important;
            }
        }
    }
}
</style>