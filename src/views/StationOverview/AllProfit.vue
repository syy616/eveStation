<script setup>
//数据导入
import { defineComponent, watch, onMounted, onUnmounted, onActivated, getCurrentInstance, ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { unitMoney } from '../../utils/unitChange';
import useLocalStorage from "@/store/modules/localStorage";
const store = useLocalStorage();
const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t, locale } = useI18n();

//主题色
const theme = store.theme;
const lengendColor = ref('#FFFFFF8C');
const labelColor = ref('#FFFFFF59');

//日历绑定'
const esDate = ref(['2024', '01']);  //日历默认值
const pvDate = ref(['2024', '01']);
const cpDate = ref(['2024', '01']);
const columnsType = ['year', 'month'];
const esTime = ref('');  //页面默认值
const pvTime = ref('');
const cpTime = ref('');
//弹出层绑定
const esShow = ref(false);  //单独弹出页面
const pvShow = ref(false);
const cpShow = ref(false);

const allData = ref({
    esData: {
        allRevenue: 1134577988.23, dayRevenue: 2332.878, JRevenue: 4543.33, FRevenue: 334.568, PRevenue: 24465.67, GRevenue: 3434.98,
        esList: [
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "1" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "2" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "3" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "4" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "5" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "6" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "7" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "8" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "9" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "10" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "11" },
            { allCharge: 23329.00, allDisCharge: 976767.878, allProfit: 12345678, date: "12" },
        ],
    },
    pvData: {
        allRevenue: 12232323.23, dayRevenue: 2332.878,
        pvList: [
            { dayProfit: 1234, date: "1" },
            { dayProfit: 1234, date: "2" },
            { dayProfit: 1234, date: "3" },
            { dayProfit: 1234, date: "4" },
            { dayProfit: 1234, date: "5" },
            { dayProfit: 1234, date: "6" },
            { dayProfit: 1234, date: "7" },
            { dayProfit: 1234, date: "8" },
            { dayProfit: 1234, date: "9" },
            { dayProfit: 1234, date: "10" },
            { dayProfit: 1234, date: "11" },
            { dayProfit: 1234, date: "12" },
        ],
    },
    cpData: {
        allRevenue: 12232323.23, dayRevenue: 2332.878,
        cpList: [
            { dayProfit: 1234, date: "1" },
            { dayProfit: 1234, date: "2" },
            { dayProfit: 1234, date: "3" },
            { dayProfit: 1234, date: "4" },
            { dayProfit: 1234, date: "5" },
            { dayProfit: 1234, date: "6" },
            { dayProfit: 1234, date: "7" },
            { dayProfit: 1234, date: "8" },
            { dayProfit: 1234, date: "9" },
            { dayProfit: 1234, date: "10" },
            { dayProfit: 1234, date: "11" },
            { dayProfit: 1234, date: "12" },
        ],
    }
})
const esOption = ref({
    color: ["#40E2C1FF", "#2A83FF", "#FFCB3EFF", "#A9A9A9", "#20CFED"],
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        left: '10%',
        bottom: '12%',
    },
    legend: {
        type: "scroll",
        right: 0,
        itemWidth: 8,
        itemHeight: 8,
        itemStyle: {
            color: 'inherit'
        },
        lineStyle: {
            type: "dashed"
        },
        textStyle: {
            color: lengendColor
        },
        data: [t('allStation.profitEsChart1'), t('allStation.profitEsChart2'), t('allStation.profitEsChart3')]
    },
    xAxis: [
        {
            type: 'category',
            nameTextStyle: {
                color: labelColor
            },
            axisLabel: {
                show: true,
                interval: 1,
                color: labelColor
            },
            data: [],
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: t('allStation.profitEsChartYxis') + '(kWh)',
            axisLabel: {
                rotate: 15,
                color: labelColor
            },
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                overflow: 'truncate', // 名称过长自动截断
                color: labelColor
            },
        },
        {
            type: 'value',
            name: t('allStation.profitEsChartYxis1') + t('allStation.profitUnit'),
            axisLabel: {
                rotate: 15,
                color: labelColor
            },
            nameTextStyle: {
                overflow: 'truncate', // 名称过长自动截断
                color: labelColor
            },
        }
    ],
    series: [
        {
            name: t('allStation.profitEsChart1'),
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' kWh';
                }
            },
            data: []
        },
        {
            name: t('allStation.profitEsChart2'),
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' kWh';
                }
            },
            data: []
        },
        {
            name: t('allStation.profitEsChart3'),
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
                valueFormatter: function (value) {
                    return value + t('allStation.profitUnit');
                }
            },
            data: []
        }
    ]
})
const pvOption = ref({
    color: ["#0052D9FF"],
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        left: '15%',
        right: 10,
        bottom: '10%',
    },
    legend: {
        type: "scroll",
        right: 0,
        itemWidth: 8,
        itemHeight: 8,
        itemStyle: {
            color: 'inherit'
        },
        lineStyle: {
            type: "dashed"
        },
        textStyle: {
            color: lengendColor
        },
        data: [t('allStation.esTitle2')]
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                interval: 1,
                color: labelColor
            },
            data: [],
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: t('allStation.profitEsChartYxis1') + "(" + t('allStation.profitUnit') + ")",
            axisLabel: {
                rotate: 15,
                color: labelColor
            },
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                overflow: 'truncate', // 名称过长自动截断
                color: labelColor
            },
        }
    ],
    series: [
        {
            name: t('allStation.esTitle2'),
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + t('allStation.profitUnit');
                }
            },
            data: []
        }
    ]
})
const cpOption = ref({
    color: ["#40E2C1FF", "#2A83FF", "#FFCB3EFF", "#A9A9A9", "#20CFED"],
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        left: '15%',
        right: 10,
        bottom: '8%',
    },
    legend: {
        type: "scroll",
        right: 0,
        itemWidth: 8,
        itemHeight: 8,
        itemStyle: {
            color: 'inherit'
        },
        lineStyle: {
            type: "dashed"
        },
        textStyle: {
            color: lengendColor
        },
        data: [t('allStation.esTitle2')]
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                interval: 1,
                color: labelColor
            },
            data: [],
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: t('allStation.profitEsChartYxis1') + "(" + t('allStation.profitUnit') + ")",
            axisLabel: {
                rotate: 15,
                color: labelColor
            },
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                overflow: 'truncate', // 名称过长自动截断
                color: labelColor
            },
        }
    ],
    series: [
        {
            name: t('allStation.esTitle2'),
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + t('allStation.profitUnit');
                }
            },
            data: []
        }
    ]
})
const esChartBox = ref(null);
let esChart = null;
const pvChartBox = ref(null);
let pvChart = null;
const cpChartBox = ref(null);
let cpChart = null;
//生命周期
onMounted(() => {
    getNowTime();
    esChartData();
    pvChartData();
    cpChartData();
    chartColor();
});

onUnmounted(() => {
    // 清理操作
    window.removeEventListener('resize', resizeChart);
    esChart.dispose();
});

//watch监听颜色变化
// watch(() => theme, (newValue) => {
//     // state.count = newValue;
//     console.log(1);
// });


//methods
//判断主题颜色,修改图表颜色
const chartColor = () => {
    let theme = store.theme;
    switch (theme) {
        case 'dark':
            lengendColor.value = "#FFFFFF8C";
            labelColor.value = "#FFFFFF59";
            break;
        case 'light':
            lengendColor.value = "#00000099";
            labelColor.value = "#00000066";
            break;
        default:
            lengendColor.value = "#FFFFFF8C";
            labelColor.value = "#FFFFFF59";
            break;
    }
};
//获取当前时间
const getNowTime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    cpTime.value = pvTime.value = esTime.value = year + "-" + month;  //页面默认初始当月
    esDate.value[0] = pvDate.value[0] = cpDate.value[0] = year;  //日历组件设置当月默认值
    esDate.value[1] = pvDate.value[1] = cpDate.value[1] = month; //日历组件设置当月默认值
}
//resize图表
const resizeChart = () => {
    if (esChart) {
        esChart.resize();
    }
};
//处理echart数据
const esChartData = () => {
    let xData = esOption.value.xAxis[0].data;
    xData.splice(0, xData.length);
    for (var i = 0; i < esOption.value.series.length; i++) {
        let seriesData = esOption.value.series[i].data
        seriesData.splice(0, seriesData.length);
    }
    for (var i = 0; i < allData.value.esData.esList.length; i++) {
        esOption.value.xAxis[0].data.push(allData.value.esData.esList[i].date);
        esOption.value.series[0].data.push(allData.value.esData.esList[i].allCharge);
        esOption.value.series[1].data.push(allData.value.esData.esList[i].allDisCharge);
        esOption.value.series[2].data.push(allData.value.esData.esList[i].allProfit);
    }
    nextTick(() => {
        esChartInit();
    })
}
//init图表
const esChartInit = () => {
    esChart = echarts.init(esChartBox.value);
    esChart.setOption(esOption.value);
    window.onresize = function () {
        esChart.resize();
    };
    // window.addEventListener('resize', resizeChart);
};
//处理echart数据
const pvChartData = () => {
    let xData = pvOption.value.xAxis[0].data;
    xData.splice(0, xData.length);
    for (var i = 0; i < pvOption.value.series.length; i++) {
        let seriesData = pvOption.value.series[i].data
        seriesData.splice(0, seriesData.length);
    }
    for (var i = 0; i < allData.value.pvData.pvList.length; i++) {
        pvOption.value.xAxis[0].data.push(allData.value.pvData.pvList[i].date);
        pvOption.value.series[0].data.push(allData.value.pvData.pvList[i].dayProfit);
    }
    nextTick(() => {
        pvChartInit();
    })
}
//init图表
const pvChartInit = () => {
    pvChart = echarts.init(pvChartBox.value);
    pvChart.setOption(pvOption.value);
    window.onresize = function () {
        pvChart.resize();
    };
    // window.addEventListener('resize', resizeChart);
};
//处理echart数据
const cpChartData = () => {
    let xData = cpOption.value.xAxis[0].data;
    xData.splice(0, xData.length);
    for (var i = 0; i < cpOption.value.series.length; i++) {
        let seriesData = cpOption.value.series[i].data
        seriesData.splice(0, seriesData.length);
    }
    for (var i = 0; i < allData.value.cpData.cpList.length; i++) {
        cpOption.value.xAxis[0].data.push(allData.value.cpData.cpList[i].date);
        cpOption.value.series[0].data.push(allData.value.cpData.cpList[i].dayProfit);
    }
    nextTick(() => {
        cpChartInit();
    })
}
//init图表
const cpChartInit = () => {
    cpChart = echarts.init(cpChartBox.value);
    cpChart.setOption(cpOption.value);
    window.onresize = function () {
        cpChart.resize();
    };
    // window.addEventListener('resize', resizeChart);
};
//弹出es面板
const showPopup = () => {
    esShow.value = true;
}
const showPvPopup = () => {
    pvShow.value = true;
}
const showcpPopup = () => {
    cpShow.value = true;
}
//格式化日期面板
const formatter = (type, option) => {
    if (type === 'year') {
        option.text += '年';
    }
    if (type === 'month') {
        option.text += '月';
    }
    return option;
};
//关闭es日期面板并确认
const onConfirm = (type) => {
    if (type == 0) {
        esShow.value = false;
        esTime.value = esDate.value[0] + "-" + esDate.value[1];
    }
    else if (type == 1) {
        pvShow.value = false;
        pvTime.value = pvDate.value[0] + "-" + pvDate.value[1];
    }
    else {
        cpShow.value = false;
        cpTime.value = cpDate.value[0] + "-" + cpDate.value[1];
    }
}
</script>

<template>
    <div class="allProfit">
        <div class="storageBox">
            <div class="storageBoxBg">
                <div class="boxTitle">
                    <van-row>
                        <van-col span="1">
                            <div class="leftBorder"></div>
                        </van-col>
                        <van-col span="23">
                            <div class="leftTitle">
                                {{ $t('allStation.profitTitle1') }}
                            </div>
                        </van-col>
                    </van-row>
                </div>
                <van-row class="rowData" :gutter="[16, 24]" justify="end">
                    <van-col span="8">
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('allStation.esTitle1') }}</div>
                        </van-row>
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitMoney(2, allData.esData.allRevenue, '元', true).number }}
                                </div>
                                <div class="esUnit">{{ unitMoney(2, allData.esData.allRevenue, '元', true).unit }}</div>
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="8">
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('allStation.esTitle2') }}</div>
                        </van-row>
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitMoney(2, allData.esData.dayRevenue, '元', true).number }}
                                </div>
                                <div class="esUnit">{{ unitMoney(2, allData.esData.dayRevenue, '元', true).unit }}</div>
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="8">
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('allStation.esTitle3') }}</div>
                        </van-row>
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitMoney(2, allData.esData.JRevenue, '元', true).number }}</div>
                                <div class="esUnit">{{ unitMoney(2, allData.esData.JRevenue, '元', true).unit }}</div>
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="8">
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('allStation.esTitle4') }}</div>
                        </van-row>
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitMoney(2, allData.esData.FRevenue, '元', true).number }}</div>
                                <div class="esUnit">{{ unitMoney(2, allData.esData.FRevenue, '元', true).unit }}</div>
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="8">
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('allStation.esTitle5') }}</div>
                        </van-row>
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitMoney(2, allData.esData.PRevenue, '元', true).number }}</div>
                                <div class="esUnit">{{ unitMoney(2, allData.esData.PRevenue, '元', true).unit }}</div>
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="8">
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('allStation.esTitle6') }}</div>
                        </van-row>
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitMoney(2, allData.esData.GRevenue, '元', true).number }}</div>
                                <div class="esUnit">{{ unitMoney(2, allData.esData.GRevenue, '元', true).unit }}</div>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
                <div class="ChartBox">
                    <van-row>
                        <van-col span="12">
                            <div class="ChartTitle">{{ $t('allStation.esTitle7') }}</div>
                        </van-col>
                        <van-col span="12">
                            <div class="choseEsDate" @click="showPopup">{{ esTime }} <van-icon name="arrow-down" />
                            </div>
                            <van-popup round position="bottom" :show="esShow">
                                <van-date-picker v-model="esDate" :formatter="formatter"
                                    :title="$t('allStation.dateDate')" :columns-type="columnsType"
                                    @cancel="esShow = false" @confirm="onConfirm(0)" />
                            </van-popup>
                        </van-col>
                        <van-col span="24">
                            <div id="esChart" ref="esChartBox"></div>
                        </van-col>
                    </van-row>

                </div>
            </div>

        </div>
        <div class="storageBox">
            <div class="storageBoxBg">
                <div class="boxTitle">
                    <van-row>
                        <van-col span="1">
                            <div class="leftBorder"></div>
                        </van-col>
                        <van-col span="23">
                            <div class="leftTitle">
                                {{ $t('allStation.profitTitle2') }}
                            </div>
                        </van-col>
                    </van-row>
                </div>
                <van-row class="rowData" :gutter="[16, 24]" justify="end">
                    <van-col span="8" offset="2">
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('allStation.esTitle1') }}</div>
                        </van-row>
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitMoney(2, allData.esData.allRevenue, '元', true).number }}
                                </div>
                                <div class="esUnit">{{ unitMoney(2, allData.esData.allRevenue, '元', true).unit }}</div>
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="8" offset="6">
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('allStation.esTitle2') }}</div>
                        </van-row>
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitMoney(2, allData.esData.dayRevenue, '元', true).number }}
                                </div>
                                <div class="esUnit">{{ unitMoney(2, allData.esData.dayRevenue, '元', true).unit }}</div>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
                <div class="ChartBox">
                    <van-row>
                        <van-col span="12">
                            <div class="ChartTitle">{{ $t('allStation.esTitle7') }}</div>
                        </van-col>
                        <van-col span="12">
                            <div class="choseEsDate" @click="showPvPopup">{{ pvTime }} <van-icon name="arrow-down" />
                            </div>
                            <van-popup round position="bottom" :show="pvShow">
                                <van-date-picker v-model="pvDate" :formatter="formatter"
                                    :title="$t('allStation.dateDate')" :columns-type="columnsType"
                                    @cancel="pvShow = false" @confirm="onConfirm(1)" />
                            </van-popup>
                        </van-col>
                        <van-col span="24">
                            <div id="pvChart" ref="pvChartBox"></div>
                        </van-col>
                    </van-row>

                </div>
            </div>
        </div>
        <div class="storageBox">
            <div class="storageBoxBg">
                <div class="boxTitle">
                    <van-row>
                        <van-col span="1">
                            <div class="leftBorder"></div>
                        </van-col>
                        <van-col span="23">
                            <div class="leftTitle">
                                {{ $t('allStation.profitTitle3') }}
                            </div>
                        </van-col>
                    </van-row>
                </div>
                <van-row class="rowData" :gutter="[16, 24]" justify="end">
                    <van-col span="8" offset="2">
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('allStation.esTitle1') }}</div>
                        </van-row>
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitMoney(2, allData.esData.allRevenue, '元', true).number }}
                                </div>
                                <div class="esUnit">{{ unitMoney(2, allData.esData.allRevenue, '元', true).unit }}</div>
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="8" offset="6">
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('allStation.esTitle2') }}</div>
                        </van-row>
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitMoney(2, allData.esData.dayRevenue, '元', true).number }}
                                </div>
                                <div class="esUnit">{{ unitMoney(2, allData.esData.dayRevenue, '元', true).unit }}</div>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
                <div class="ChartBox">
                    <van-row>
                        <van-col span="12">
                            <div class="ChartTitle">{{ $t('allStation.esTitle7') }}</div>
                        </van-col>
                        <van-col span="12">
                            <div class="choseEsDate" @click="showcpPopup">{{ cpTime }} <van-icon name="arrow-down" />
                            </div>
                            <van-popup round position="bottom" :show="cpShow">
                                <van-date-picker v-model="cpDate" :formatter="formatter"
                                    :title="$t('allStation.dateDate')" :columns-type="columnsType"
                                    @cancel="cpShow = false" @confirm="onConfirm(2)" />
                            </van-popup>
                        </van-col>
                        <van-col span="24">
                            <div id="cpChart" ref="cpChartBox"></div>
                        </van-col>
                    </van-row>

                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.allProfit {
    width: 100%;
    padding: 0 24px 120px 24px;
    box-sizing: border-box;

    .storageBox {
        width: 100%;
        margin-top: 20px;

        .storageBoxBg {
            width: 100%;
            height: 100%;
            background-image: var(--allStation-es-bg);
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 16px;
            // backdrop-filter: blur(20px);
            // -webkit-backdrop-filter: blur(20px);
            // background-color: rgba(82, 82, 82, 0.493);
            // border-radius: 24px;
            padding: 24px;
            box-sizing: border-box;
            // border-radius: 16px;
            // box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.15);

            .boxTitle {
                width: 100%;
                color: var(--allStation-tab-title);
                font-size: 34px;
                font-weight: 500;
                height: 42px;

                .van-col {
                    .leftBorder {
                        border-radius: 8px;
                        height: 100%;
                        width: 8px;
                        background-color: #40E2C1;
                        border-radius: 8px;
                        margin: 0 auto;
                    }

                    .leftTitle {
                        height: 100%;
                    }
                }
            }

            .rowData {
                padding: 32px 40px 40px 40px;

                .row1 {
                    .esTitle {
                        color: var(--allStation-data-title);
                        font-size: 24px;
                        font-weight: 400;
                        line-height: 32px;
                    }
                }

                .row2 {
                    margin-top: 6px;
                    display: flex;
                    align-items: baseline;

                    .esData {
                        color: var(--allStation-box-title-color);
                        font-weight: 500;
                        font-size: 34px;
                        margin-right: 10px;
                    }

                    .esUnit {
                        color: var(--allStation-data-title);
                        font-size: 20px;
                    }
                }

            }

            .ChartBox {
                width: 100%;

                .ChartTitle {
                    font-size: 28px;
                    font-weight: 400;
                    color: var(--allStation-tab-title);
                }

                .choseEsDate {
                    font-size: 28px;
                    font-weight: 400;
                    text-align: right;
                    color: var(--allStation-tab-title);
                }

                #esChart {
                    width: 100%;
                    height: 400px;
                }

                #pvChart {
                    width: 100%;
                    height: 400px;
                }

                #cpChart {
                    width: 100%;
                    height: 400px;
                }
            }
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
        .van-picker__title{
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
</style>