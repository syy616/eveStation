<script setup>
import StationSingleCardVue from '../../components/StationCard/StationSingleCard.vue';
import { defineComponent, onMounted, onUnmounted, onActivated, getCurrentInstance, ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { unitMoney, unitChange } from '../../utils/unitChange';
import useLocalStorage from "@/store/modules/localStorage";

const store = useLocalStorage();
const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t } = useI18n();
//主题色
const lengendColor = ref('#FFFFFF8C');
const labelColor = ref('#FFFFFF59');

//日历绑定
const esDate = ref(['2024', '01']);  //日历默认值
const pvDate = ref(['2024', '01']);
const cpDate = ref(['2024', '01']);
const esPowerDate = ref(['2024', '01']);
const columnsType = ['year', 'month'];
const esTime = ref('');  //页面默认值
const pvTime = ref('');
const cpTime = ref('');
const powerTime = ref('');

//弹出层绑定
const esShow = ref(false);  //单独弹出页面
const pvShow = ref(false);  //单独弹出页面
const cpShow = ref(false);  //单独弹出页面
const esPowerShow = ref(false);  //单独弹出页面

const allData = ref({
    esData: {
        allCharge: 11343.23, allDisCharge: 1111.878,
        esList: [
            { allCharge: 2333.00, allDisCharge: 9767.878, date: "1", PcspPower: 23, power: 123.4 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "2", PcspPower: 53, power: 153.4 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "3", PcspPower: 134, power: 134.4 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "4", PcspPower: 88, power: 88.45 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "5", PcspPower: 123, power: 123.3 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "6", PcspPower: 156, power: 156.5 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "7", PcspPower: 66, power: 166.4 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "8", PcspPower: 123, power: 123.3 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "9", PcspPower: 34, power: 334.2 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "10", PcspPower: 23, power: 323.4 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "11", PcspPower: 236, power: 236.5 },
            { allCharge: 233.00, allDisCharge: 9767.878, date: "12", PcspPower: 166, power: 266.6 },
        ],
    },
    pvData: {
        allDisCharge: 122.23, dayDisCharge: 233.878, co2: 233.23, plant: 233,
        pvList: [
            { power: 123.4, date: "1" },
            { power: 153.4, date: "2" },
            { power: 134, date: "3" },
            { power: 88.45, date: "4" },
            { power: 123.34, date: "5" },
            { power: 156.54, date: "6" },
            { power: 166.45, date: "7" },
            { power: 123.32, date: "8" },
            { power: 334.2, date: "9" },
            { power: 323.4, date: "10" },
            { power: 236.5, date: "11" },
            { power: 266.6, date: "12" },
        ],
    },
    cpData: {
        dayCharge: 3332.23, dayDisCharge: 333.878,
        cpList: [
            { dayCharge: 1234, date: "1" },
            { dayCharge: 1234, date: "2" },
            { dayCharge: 1234, date: "3" },
            { dayCharge: 1234, date: "4" },
            { dayCharge: 1234, date: "5" },
            { dayCharge: 1234, date: "6" },
            { dayCharge: 1234, date: "7" },
            { dayCharge: 1234, date: "8" },
            { dayCharge: 1234, date: "9" },
            { dayCharge: 1234, date: "10" },
            { dayCharge: 1234, date: "11" },
            { dayCharge: 1234, date: "12" },
        ],
    }
})

const rank = ref([
    { station: "亿纬A区", charge: 1923 },
    { station: "亿纬B区", charge: 2023 },
    { station: "林洋启东", charge: 2323 }
])

const esOption = ref({
    color: ["#2A83FFFF", "#FFBA00FF"],
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "15%",
        left: '15%',
        right: "2%",
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
        data: [t('allStation.energyEsChartSub1'), t('allStation.energyEsChartSub2')]
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
            name: t('allStation.energyEsChartSub1'),
            type: 'bar',
            barWidth: 8,
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' kWh';
                }
            },
            data: [],
            stack: 'Ad',
        },
        {
            name: t('allStation.energyEsChartSub2'),
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' kWh';
                }
            },
            data: [],
            stack: 'Ad',
        }
    ]
})
const esPowerOption = ref({
    color: ["#7063F2FF", "#FFBA00FF",],
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "15%",
        left: '15%',
        right: "2%",
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
        data: [t('allStation.esChart2lend'), t('allStation.esChart2lend1')]
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
            // name: t('allStation.profitEsChartYxis') +'(kWh)',
            axisLabel: {
                rotate: 15,
                color: labelColor

            },
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: labelColor,
                overflow: 'truncate' // 名称过长自动截断
            },
        }
    ],
    series: [
        {
            name: t('allStation.esChart2lend'),
            type: 'line',
            tooltip: {
                valueFormatter: function (value) {
                    return value + t('allStation.profitUnit');
                }
            },
            data: []
        },
        {
            name: t('allStation.esChart2lend1'),
            type: 'line',
            tooltip: {
                valueFormatter: function (value) {
                    return value + t('allStation.profitUnit');
                }
            },
            data: []
        }
    ]
})

const esRankOption = ref({
    color: "#0052D9FF",
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        valueFormatter: function (value) {
            return value + ' kWh';
        }
    },
    grid: {
        top: "15%",
        left: '2%',
        right: "2%",
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            interval: 1,
            color: labelColor
        },
    },
    yAxis: {
        type: 'category',
        data: [],
        axisLabel: {
            color: labelColor
        },
        nameTextStyle: {
            color: labelColor,
            overflow: 'truncate' // 名称过长自动截断
        },
    },
    series: [
        {
            type: 'bar',
            barWidth: 8,
            data: []
        }
    ]
})

const pvOption = ref({
    color: ["#7063F2FF"],
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "15%",
        left: '15%',
        right: "2%",
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
        data: [t('allStation.pvChartlend')]
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
            name: t('allStation.pvChartlend') + '(kW)',
            axisLabel: {
                rotate: 15,
                color: labelColor
            },
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: labelColor,
                overflow: 'truncate' // 名称过长自动截断
            },
        }
    ],
    series: [
        {
            name: t('allStation.pvChartlend'),
            type: 'line',
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
    color: ["#2A83FFFF"],
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "15%",
        left: '15%',
        right: "2%",
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
        data: [t('allStation.energyCpSubTitle2')]
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
            name: t('allStation.energyCpSubTitle2') + "(kWh)",
            axisLabel: {
                rotate: 15,
                color: labelColor

            },
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: labelColor,
                overflow: 'truncate' // 名称过长自动截断
            },
        }
    ],
    series: [
        {
            name: t('allStation.energyCpSubTitle2'),
            type: 'bar',
            barWidth: 8,
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' kWh';
                }
            },
            data: []
        }
    ]
})
let esChart = null;
let esPowerChart = null;
let esRankChart = null;
let pvChart = null;
let cpChart = null;

onMounted(() => {
    getNowTime();
    esChartData();
    esPowerChartData();
    esRankChartData();
    pvChartData();
    cpChartData();
    chartColor();
});
//获取当前时间
const getNowTime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    cpTime.value = pvTime.value = esTime.value = powerTime.value = year + "-" + month;  //页面默认初始当月
    esDate.value[0] = pvDate.value[0] = cpDate.value[0] = esPowerDate.value[0] = year;  //日历组件设置当月默认值
    esDate.value[1] = pvDate.value[1] = cpDate.value[1] = esPowerDate.value[1] = month; //日历组件设置当月默认值
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
    }
    nextTick(() => {
        esChartInit();
    })
}
//init图表
const esChartInit = () => {
    esChart = echarts.init(document.getElementById("esChart"));
    esChart.setOption(esOption.value);
    // window.onresize = function () {
    //     esChart.resize();
    // };
    window.addEventListener("resize", function () {
        esChart.resize();
    });
};
//处理echart数据
const esPowerChartData = () => {
    let xData = esPowerOption.value.xAxis[0].data;
    xData.splice(0, xData.length);
    for (var i = 0; i < esPowerOption.value.series.length; i++) {
        let seriesData = esPowerOption.value.series[i].data
        seriesData.splice(0, seriesData.length);
    }
    for (var i = 0; i < allData.value.esData.esList.length; i++) {
        esPowerOption.value.xAxis[0].data.push(allData.value.esData.esList[i].date);
        esPowerOption.value.series[0].data.push(allData.value.esData.esList[i].power);
        esPowerOption.value.series[1].data.push(allData.value.esData.esList[i].PcspPower);

    }
    nextTick(() => {
        esPower();
    })
}
//init图表
const esPower = () => {
    esPowerChart = echarts.init(document.getElementById("esPowerChart"));
    esPowerChart.setOption(esPowerOption.value);
    window.addEventListener("resize", function () {
        esPowerChart.resize();
    });
};
const esRankChartData = () => {
    let yData = esRankOption.value.yAxis.data;
    yData.splice(0, yData.length);
    for (var i = 0; i < esRankOption.value.series.length; i++) {
        let seriesData = esRankOption.value.series[i].data
        seriesData.splice(0, seriesData.length);
    }
    for (var i = 0; i < rank.value.length; i++) {
        esRankOption.value.yAxis.data.push(rank.value[i].station);
        esRankOption.value.series[0].data.push(rank.value[i].charge);
    }
    nextTick(() => {
        esRank();
    })
}
//init图表
const esRank = () => {
    esRankChart = echarts.init(document.getElementById("esRankChart"));
    esRankChart.setOption(esRankOption.value);
    window.addEventListener("resize", function () {
        esRankChart.resize();
    });
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
        pvOption.value.series[0].data.push(allData.value.pvData.pvList[i].power);
    }
    nextTick(() => {
        pvChartInit();
    })
}
//init图表
const pvChartInit = () => {
    pvChart = echarts.init(document.getElementById("pvChart"));
    pvChart.setOption(pvOption.value);
    window.addEventListener("resize", function () {
        pvChart.resize();
    });
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
        cpOption.value.series[0].data.push(allData.value.cpData.cpList[i].dayCharge);
    }
    nextTick(() => {
        cpChartInit();
    })
}
//init图表
const cpChartInit = () => {
    cpChart = echarts.init(document.getElementById("cpChart"));
    cpChart.setOption(cpOption.value);
    window.onresize = function () {
        cpChart.resize();
    };
    // window.addEventListener('resize', cpChart);
};
//弹出es面板
const showPopup = (index) => {
    index == 1 ? esShow.value = true : (index == 2 ? pvShow.value = true : (index == 3 ? cpShow.value = true : esPowerShow.value = true));
}
//关闭es日期面板并确认
const onConfirm = (type) => {
    if (type == 1) {
        esShow.value = false;
        esTime.value = esDate.value[0] + "-" + esDate.value[1];
    }
    else if (type == 2) {
        pvShow.value = false;
        pvTime.value = pvDate.value[0] + "-" + pvDate.value[1];
    }
    else if (type == 3) {
        cpShow.value = false;
        cpTime.value = cpDate.value[0] + "-" + cpDate.value[1];
    }
    else {
        esPowerShow.value = false;
        powerTime.value = esPowerDate.value[0] + "-" + esPowerDate.value[1];
    }
}
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
</script>

<template>
    <div class="allEnergy">
        <StationSingleCardVue v-for="index in 3" :key="index">
            <template v-slot:leftTitle>
                <span>{{ index
            == 1 ? $t('allStation.energyEsTitle') : (index == 2 ? $t('allStation.energyPvTitle') :
                $t('allStation.energyCpTitle'))
                    }}</span>
            </template>
            <template v-slot:DataContent v-if="index == 1 || index == 3">
                <van-col span="8" offset="2">
                    <van-row class="row1">
                        <div class="esTitle">{{ index ==
            1 ? $t('allStation.energyTitle1') : $t('allStation.energyCpSubTitle1') }}</div>
                    </van-row>
                    <van-row>
                        <van-col span="24" class="row2">
                            <div class="esData">{{ index == 1 ? unitChange(1, allData.esData.allCharge, '',
            true).number : unitChange(1, allData.cpData.dayCharge, '', true).number }}
                            </div>
                            <div class="esUnit">{{ index == 1 ? unitChange(1, allData.esData.allCharge, '',
            true).unit : unitChange(1, allData.cpData.dayCharge, '', true).unit }}</div>
                        </van-col>
                    </van-row>
                </van-col>
                <van-col span="8" offset="6">
                    <van-row class="row1">
                        <div class="esTitle">{{ index ==
            1 ? $t('allStation.energyTitle2') : $t('allStation.energyCpSubTitle2') }}</div>
                    </van-row>
                    <van-row>
                        <van-col span="24" class="row2">
                            <div class="esData">{{ index == 1 ? unitChange(1, allData.esData.allDisCharge, '',
            true).number : unitChange(1, allData.cpData.dayDisCharge, '', true).number }}
                            </div>
                            <div class="esUnit">{{ index == 1 ? unitChange(1, allData.esData.allDisCharge, '',
            true).unit : unitChange(1, allData.cpData.dayDisCharge, '', true).unit }}</div>
                        </van-col>
                    </van-row>
                </van-col>
            </template>
            <template v-slot:DataContent v-else>
                <van-col span="6">
                    <van-row class="row1">
                        <div class="esTitle">{{ $t('allStation.energyPvSubTitle1') }}</div>
                    </van-row>
                    <van-row>
                        <van-col span="24" class="row2">
                            <div class="esData">{{ unitChange(1, allData.pvData.allDisCharge, '', true).number }}
                            </div>
                            <div class="esUnit">{{ unitChange(1, allData.pvData.allDisCharge, '', true).unit }}</div>
                        </van-col>
                    </van-row>
                </van-col>
                <van-col span="6">
                    <van-row class="row1">
                        <div class="esTitle">{{ $t('allStation.energyPvSubTitle2') }}</div>
                    </van-row>
                    <van-row>
                        <van-col span="24" class="row2">
                            <div class="esData">{{ unitChange(1, allData.pvData.dayDisCharge, '', true).number }}
                            </div>
                            <div class="esUnit">{{ unitChange(1, allData.pvData.dayDisCharge, '', true).unit }}</div>
                        </van-col>
                    </van-row>
                </van-col>
                <van-col span="6">
                    <van-row class="row1">
                        <div class="esTitle">{{ $t('allStation.energyPvSubTitle3') }}</div>
                    </van-row>
                    <van-row>
                        <van-col span="24" class="row2">
                            <div class="esData">{{ unitChange(1, allData.pvData.co2, '', true).number }}
                            </div>
                            <div class="esUnit">{{ unitChange(1, allData.pvData.co2, '', true).unit }}</div>
                        </van-col>
                    </van-row>
                </van-col>
                <van-col span="6">
                    <van-row class="row1">
                        <div class="esTitle">{{ $t('allStation.energyPvSubTitle4') }}</div>
                    </van-row>
                    <van-row>
                        <van-col span="24" class="row2">
                            <div class="esData">{{ unitChange(1, allData.pvData.plant, '', true).number }}
                            </div>
                            <div class="esUnit">{{ unitChange(1, allData.pvData.plant, '', true).unit }}</div>
                        </van-col>
                    </van-row>
                </van-col>
            </template>
            <template v-slot:ChartTitle>
                {{
            index == 1 ?
                $t('allStation.energySubTitle1') : (index == 2 ? $t('allStation.energyPvChartTitle') :
                    $t('allStation.energyCpSubTitle2'))
        }}
            </template>
            <template v-slot:dateBox>
                <div class="choseEsDate" @click="showPopup(index)">{{ index == 1 ? esTime : (index == 2 ? pvTime :
            cpTime) }}
                    <van-icon name="arrow-down" />
                </div>
                <van-popup round position="bottom" :show="esShow" v-if="index == 1">
                    <van-date-picker v-model="esDate" :title="$t('allStation.dateDate')" :columns-type="columnsType"
                        @cancel="esShow = false" @confirm="onConfirm(index)" :cancel-button-text="$t('allStation.cancel')" :confirm-button-text="$t('allStation.confirm')" />
                </van-popup>
                <van-popup round position="bottom" :show="pvShow" v-else-if="index == 2">
                    <van-date-picker v-model="pvDate" :title="$t('allStation.dateDate')" :columns-type="columnsType" :cancel-button-text="$t('allStation.cancel')" :confirm-button-text="$t('allStation.confirm')"
                        @cancel="pvShow = false" @confirm="onConfirm(index)" />
                </van-popup>
                <van-popup round position="bottom" :show="cpShow" v-else>
                    <van-date-picker v-model="cpDate" :title="$t('allStation.dateDate')" :columns-type="columnsType" :cancel-button-text="$t('allStation.cancel')" :confirm-button-text="$t('allStation.confirm')"
                        @cancel="cpShow = false" @confirm="onConfirm(index)" />
                </van-popup>
            </template>
            <template v-slot:chartContent>
                <div id="esChart" class="chartDomBox" ref="esChartBox" v-if="index == 1"></div>
                <div id="pvChart" class="chartDomBox" ref="pvChartBox" v-else-if="index == 2"></div>
                <div id="cpChart" class="chartDomBox" ref="cpChartBox" v-else></div>
            </template>
            <template v-slot:ChartTitle1 v-if="index == 1">
                {{ $t('allStation.energySubTitle2') }}
                <!-- 
                <div id="esRankChart" class="chartDomBox" ref="esRankChart"  v-if="index==1"></div> -->
            </template>
            <template v-slot:dateBox1 v-if="index == 1">
                <div class="choseEsDate" @click="showPopup(4)">{{ powerTime }}
                    <van-icon name="arrow-down" />
                </div>
                <van-popup round position="bottom" :show="esPowerShow" v-if="index == 1">
                    <van-date-picker v-model="esPowerDate" :title="$t('allStation.dateDate')" :cancel-button-text="$t('allStation.cancel')" :confirm-button-text="$t('allStation.confirm')"
                        :columns-type="columnsType" @cancel="esPowerShow = false" @confirm="onConfirm(4)" />
                </van-popup>
            </template>
            <template v-slot:chartContent1 v-if="index==1">
                <div id="esPowerChart" class="chartDomBox" ref="esPowerChart"></div>
            </template>
            <template v-slot:ChartTitle2 v-if="index==1">
                {{$t('allStation.energySubTitle3')}}
                <div id="esRankChart" class="chartDomBox" ref="esRankChart" v-if="index==1"></div>
            </template>
        </StationSingleCardVue>

    </div>
</template>
<style scoped lang="less">
.allEnergy {
    width: 100%;
    padding: 0 24px 120px 24px;
    box-sizing: border-box;

    .secCol {
        margin-top: 10px;
    }

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
            color: var(--allStation-box-data-color);
            font-weight: 500;
            font-size: 34px;
            margin-right: 10px;
        }

        .esUnit {
            color: var(--allStation-data-title);
            font-size: 20px;
        }
    }

    .choseEsDate {
        font-size: 28px;
        font-weight: 400;
        text-align: right;
        color: var(--allStation-tab-title);
    }

    .chartDomBox {
        width: 100%;
        height: 420px;
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