<script setup>
import clusterCardPage from '@components/SystemCard/clusterCardPage.vue'
import LineChart from '../../../components/SystemCard/LineChart.vue';
import clusterSingleCard from '../ClusterCard/ClusterCard.vue';
import { onMounted, onBeforeMount, getCurrentInstance, ref, nextTick } from "vue";
import { useI18n } from 'vue-i18n';
import useLocalStorage from "@/store/modules/localStorage";
import dayjs from "dayjs";

const store = useLocalStorage();
const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t, locale } = useI18n();

const dateShow = ref(false);  //日历面板展示
const defaultDate = ref(dayjs(new Date()).format("YYYY-MM").split("-"));  //日历默认值
const socTime = ref(dayjs(new Date()).format("YYYY-MM").split("-"));  //soc默认值
const volTime = ref(dayjs(new Date()).format("YYYY-MM").split("-"));  //电压一致性默认值
const powerTime = ref(dayjs(new Date()).format("YYYY-MM").split("-"));  //功率一致性默认值
const volDifTime = ref(dayjs(new Date()).format("YYYY-MM").split("-"));  //压差一致性默认值
const temDiffTime = ref(dayjs(new Date()).format("YYYY-MM").split("-"));  //温差一致性默认值
const columnsType = ['year', 'month'];  //日历格式
let dateIndex = ref(1);  //第几个大标题div
let dateType = ref('');  //第二个大标题下面的各种日期
let socChart = null;    //SOC图表

const clusterData = ref({
    clusterList: [
        { id: "#1", soc: 0.23, todayCharge: 1.23, todayDisCharge: 22.32, power: 10.34, tem: 23, voltage: 750, current: 1.2, maxV: 24.44, maxVp: "2-11-3", minV: 1.1, minVp: "1-2-3", maxT: 43, maxTp: "3-4-5", minT: 22, minTp: "4-11-2" },
        { id: "#2", soc: 0.25, todayCharge: 2.23, todayDisCharge: 12.32, power: 11.34, tem: 26, voltage: 750.23, current: 1.02, maxV: 14.44, maxVp: "2-11-3", minV: 1.4, minVp: "1-2-3", maxT: 42, maxTp: "3-4-5", minT: 23, minTp: "4-11-2" },
        { id: "#3", soc: 0.20, todayCharge: 782.23, todayDisCharge: 432.32, power: 12.34, tem: 27, voltage: 712.23, current: 2.02, maxV: 14.44, maxVp: "2-11-3", minV: 1.5, minVp: "1-2-3", maxT: 41, maxTp: "3-4-5", minT: 24, minTp: "4-11-2" },
        { id: "#4", soc: 0.29, todayCharge: 4.23, todayDisCharge: 12.32, power: 13.34, tem: 25, voltage: 710.23, current: 0.22, maxV: 23.44, maxVp: "2-11-3", minV: 1.6, minVp: "1-2-3", maxT: 40, maxTp: "3-4-5", minT: 25, minTp: "4-11-2" },
        { id: "#5", soc: 0.35, todayCharge: 4.23, todayDisCharge: 432.32, power: 13.34, tem: 23, voltage: 723.4, current: 0.5, maxV: 12.44, maxVp: "2-11-3", minV: 1.7, minVp: "1-2-3", maxT: 39, maxTp: "3-4-5", minT: 26, minTp: "4-11-2" },
        { id: "#6", soc: 0.95, todayCharge: 5.23, todayDisCharge: 432.32, power: 153.34, tem: 23, voltage: 711.11, current: 0.52, maxV: 15.44, maxVp: "2-11-3", minV: 1.8, minVp: "1-2-3", maxT: 40, maxTp: "3-4-5", minT: 24, minTp: "4-11-2" },
        { id: "#7", soc: 0.85, todayCharge: 7.23, todayDisCharge: 23.32, power: 163.34, tem: 34, voltage: 702.1, current: 0.12, maxV: 34.44, maxVp: "2-11-3", minV: 1.9, minVp: "1-2-3", maxT: 41, maxTp: "3-4-5", minT: 23, minTp: "4-11-2" },
        { id: "#8", soc: 0.65, todayCharge: 8.23, todayDisCharge: 432.32, power: 453.34, tem: 23, voltage: 750, current: 0.43, maxV: 12.44, maxVp: "2-11-3", minV: 1.0, minVp: "1-2-3", maxT: 42, maxTp: "3-4-5", minT: 22, minTp: "4-11-2" },
        { id: "#9", soc: 0.15, todayCharge: 782.23, todayDisCharge: 432.32, power: 233.34, tem: 40, voltage: 750, current: 0.02, maxV: 14.44, maxVp: "2-11-3", minV: 1.9, minVp: "1-2-3", maxT: 34, maxTp: "3-4-5", minT: 21, minTp: "4-11-2" },
        { id: "#10", soc: 0.78, todayCharge: 782.23, todayDisCharge: 432.32, power: 233.34, tem: 33, voltage: 654.34, current: 0.12, maxV: 4.44, maxVp: "2-11-3", minV: 1.8, minVp: "1-2-3", maxT: 36, maxTp: "3-4-5", minT: 25, minTp: "4-11-2" },
    ]
})
const volSame = ref([
    [
        { ClusterId: "#1", time: "10:00", vol: 898.34 },
        { ClusterId: "#1", time: "10:30", vol: 798.34, },
        { ClusterId: "#1", time: "11:00", vol: 875.34, },
        { ClusterId: "#1", time: "11:30", vol: 753.34, },
        { ClusterId: "#1", time: "12:00", vol: 600.34, },
    ],
    [
        { ClusterId: "#2", time: "10:00", vol: 888.34 },
        { ClusterId: "#2", time: "10:30", vol: 781.34, },
        { ClusterId: "#2", time: "11:00", vol: 879.34, },
        { ClusterId: "#2", time: "11:30", vol: 703.34, },
        { ClusterId: "#2", time: "12:00", vol: 600.34, },
    ],
    [
        { ClusterId: "#3", time: "10:00", vol: 388.34 },
        { ClusterId: "#3", time: "10:30", vol: 788.34, },
        { ClusterId: "#3", time: "11:00", vol: 815.34, },
        { ClusterId: "#3", time: "11:30", vol: 723.34, },
        { ClusterId: "#3", time: "12:00", vol: 620.34, },
    ],
    [
        { ClusterId: "#4", time: "10:00", vol: 899.34 },
        { ClusterId: "#4", time: "10:30", vol: 718.34, },
        { ClusterId: "#4", time: "11:00", vol: 805.34, },
        { ClusterId: "#4", time: "11:30", vol: 703.34, },
        { ClusterId: "#4", time: "12:00", vol: 610.34, },
    ]
]);
const powerSame = ref([
    [
        { ClusterId: "#1", time: "09:00", power: 100.34 },
        { ClusterId: "#1", time: "09:30", power: 200.34, },
        { ClusterId: "#1", time: "10:00", power: 399.34, },
        { ClusterId: "#1", time: "10:30", power: 500.34, },
        { ClusterId: "#1", time: "11:00", power: 600.34, },
    ],
    [
        { ClusterId: "#2", time: "09:00", power: 10.34 },
        { ClusterId: "#2", time: "09:30", power: 71.34, },
        { ClusterId: "#2", time: "10:00", power: 79.34, },
        { ClusterId: "#2", time: "10:30", power: 103.34, },
        { ClusterId: "#2", time: "11:00", power: 60.34, },
    ],
    [
        { ClusterId: "#3", time: "09:00", power: 38.34 },
        { ClusterId: "#3", time: "09:30", power: 78.34, },
        { ClusterId: "#3", time: "10:00", power: 15.34, },
        { ClusterId: "#3", time: "10:30", power: 23.34, },
        { ClusterId: "#3", time: "11:00", power: 20.34, },
    ],
    [
        { ClusterId: "#4", time: "09:00", power: 99.34 },
        { ClusterId: "#4", time: "09:30", power: 18.34, },
        { ClusterId: "#4", time: "10:00", power: 85.34, },
        { ClusterId: "#4", time: "10:30", power: 73.34, },
        { ClusterId: "#4", time: "11:00", power: 61.34, },
    ]
]);
const volDiffSame = ref([
    [
        { ClusterId: "#1", time: "12:00", volDiff: 14.34 },
        { ClusterId: "#1", time: "12:30", volDiff: 10.34, },
        { ClusterId: "#1", time: "13:00", volDiff: 98.34, },
        { ClusterId: "#1", time: "13:30", volDiff: 56.34, },
        { ClusterId: "#1", time: "14:00", volDiff: 66.34, },
    ],
    [
        { ClusterId: "#2", time: "12:00", volDiff: 10.34 },
        { ClusterId: "#2", time: "12:30", volDiff: 71.34, },
        { ClusterId: "#2", time: "13:00", volDiff: 79.34, },
        { ClusterId: "#2", time: "13:30", volDiff: 103.34, },
        { ClusterId: "#2", time: "14:00", volDiff: 60.34, },
    ],
    [
        { ClusterId: "#3", time: "12:00", volDiff: 38.34 },
        { ClusterId: "#3", time: "12:30", volDiff: 78.34, },
        { ClusterId: "#3", time: "13:00", volDiff: 15.34, },
        { ClusterId: "#3", time: "13:30", volDiff: 23.34, },
        { ClusterId: "#3", time: "14:00", volDiff: 20.34, },
    ],
    [
        { ClusterId: "#4", time: "12:00", volDiff: 99.34 },
        { ClusterId: "#4", time: "12:30", volDiff: 18.34, },
        { ClusterId: "#4", time: "13:00", volDiff: 85.34, },
        { ClusterId: "#4", time: "13:30", volDiff: 73.34, },
        { ClusterId: "#4", time: "14:00", volDiff: 61.34, },
    ]
]);
const temDiffSame = ref([
    [
        { ClusterId: "#1", time: "14:00", temDiff: 0.3 },
        { ClusterId: "#1", time: "14:30", temDiff: 2.34, },
        { ClusterId: "#1", time: "15:00", temDiff: 3.34, },
        { ClusterId: "#1", time: "15:30", temDiff: 5.34, },
        { ClusterId: "#1", time: "16:00", temDiff: 2.34, },
    ],
    [
        { ClusterId: "#2", time: "14:00", temDiff: 1.4 },
        { ClusterId: "#2", time: "14:30", temDiff: 7.4, },
        { ClusterId: "#2", time: "15:00", temDiff: 9.4, },
        { ClusterId: "#2", time: "15:30", temDiff: 3.4, },
        { ClusterId: "#2", time: "16:00", temDiff: 1.5, },
    ],
    [
        { ClusterId: "#3", time: "14:00", temDiff: 3.8 },
        { ClusterId: "#3", time: "14:30", temDiff: 7.6, },
        { ClusterId: "#3", time: "15:00", temDiff: 1.1, },
        { ClusterId: "#3", time: "15:30", temDiff: 2.1, },
        { ClusterId: "#3", time: "16:00", temDiff: 2.1, },
    ],
    [
        { ClusterId: "#4", time: "14:00", temDiff: 2.4 },
        { ClusterId: "#4", time: "14:30", temDiff: 2.4, },
        { ClusterId: "#4", time: "15:00", temDiff: 1.4, },
        { ClusterId: "#4", time: "15:30", temDiff: 3.3, },
        { ClusterId: "#4", time: "16:00", temDiff: 2.1, },
    ]
]);

const newData = ref([
    [
        { ClusterId: "#5", time: "10:00", vol: 8.34 },
        { ClusterId: "#5", time: "10:30", vol: 8.34, },
        { ClusterId: "#5", time: "11:00", vol: 5.34, },
        { ClusterId: "#5", time: "11:30", vol: 3.34, },
        { ClusterId: "#5", time: "12:00", vol: 0.34, },
    ],
    [
        { ClusterId: "#6", time: "10:00", vol: 3.34 },
        { ClusterId: "#6", time: "10:30", vol: 81.34, },
        { ClusterId: "#6", time: "11:00", vol: 79.34, },
        { ClusterId: "#6", time: "11:30", vol: 73.34, },
        { ClusterId: "#6", time: "12:00", vol: 60.34, },
    ],
    [
        { ClusterId: "#7", time: "10:00", vol: 38.34 },
        { ClusterId: "#7", time: "10:30", vol: 78.34, },
        { ClusterId: "#7", time: "11:00", vol: 81.34, },
        { ClusterId: "#7", time: "11:30", vol: 72.34, },
        { ClusterId: "#7", time: "12:00", vol: 62.34, },
    ],
    [
        { ClusterId: "#8", time: "10:00", vol: 99.34 },
        { ClusterId: "#8", time: "10:30", vol: 18.34, },
        { ClusterId: "#8", time: "11:00", vol: 45.34, },
        { ClusterId: "#8", time: "11:30", vol: 43.34, },
        { ClusterId: "#8", time: "12:00", vol: 10.34, },
    ]
]);

const socOption = ref({
    color: ["#0052D9FF"],
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "15%",
        left: '10%',
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
            color: "#9d9d9d"
        },
        data: ["SOC"]
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                interval: 1,
                color: "#9d9d9d"
            },
            data: [],
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'SOC(%)',
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: "#9d9d9d",
                overflow: 'truncate' // 名称过长自动截断
            },
        }
    ],
    series: [
        {
            name: "SOC",
            type: 'bar',
            barWidth: 16,
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' %';
                }
            },
            data: []
        },
    ]
});
const volOption = ref({
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "15%",
        left: '10%',
        right: "2%",
        bottom: '15%',
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                interval: 1,
                color: "#9d9d9d"
            },
            data: [],
        }
    ],
    yAxis: [
        {
            type: 'value',
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: "#9d9d9d",
            },
        }
    ],
    dataZoom: [
        {
            show: true,
            realtime: true,
            height: 18,
            left: 5,
            right: 5,
            bottom: 5,
            borderColor: "rgba(119, 234, 211, 1)",
            backgroundColor: "rgba(255, 255, 255, 0)",
            fillerColor: "rgba(119, 234, 211, 0.5)"
        },
        {
            type: 'inside',
            realtime: true,
        }
    ],
    series: []
});
const powerOption = ref({
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "15%",
        left: '10%',
        right: "2%",
        bottom: '15%',
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                interval: 1,
                color: "#9d9d9d"
            },
            data: [],
        }
    ],
    yAxis: [
        {
            type: 'value',
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: "#9d9d9d",
            },
        }
    ],
    dataZoom: [
        {
            show: true,
            realtime: true,
            height: 18,
            left: 5,
            right: 5,
            bottom: 5,
            borderColor: "rgba(119, 234, 211, 1)",
            backgroundColor: "rgba(255, 255, 255, 0)",
            fillerColor: "rgba(119, 234, 211, 0.5)"
        },
        {
            type: 'inside',
            realtime: true,
        }
    ],
    series: []
});
const volDiffOption = ref({
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "15%",
        left: '10%',
        right: "2%",
        bottom: '15%',
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                interval: 1,
                color: "#9d9d9d"
            },
            data: [],
        }
    ],
    yAxis: [
        {
            type: 'value',
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: "#9d9d9d",
            },
        }
    ],
    dataZoom: [
        {
            show: true,
            realtime: true,
            height: 18,
            left: 5,
            right: 5,
            bottom: 5,
            borderColor: "rgba(119, 234, 211, 1)",
            backgroundColor: "rgba(255, 255, 255, 0)",
            fillerColor: "rgba(119, 234, 211, 0.5)"
        },
        {
            type: 'inside',
            realtime: true,
        }
    ],
    series: []
});
const temDiffOption = ref({
    tooltip: {
        trigger: 'axis',
        confine: true,
    },
    grid: {
        top: "15%",
        left: '10%',
        right: "2%",
        bottom: '15%',
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                interval: 1,
                color: "#9d9d9d"
            },
            data: [],
        }
    ],
    yAxis: [
        {
            type: 'value',
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: "#9d9d9d",
            },
        }
    ],
    dataZoom: [
        {
            show: true,
            realtime: true,
            height: 18,
            left: 5,
            right: 5,
            bottom: 5,
            borderColor: "rgba(119, 234, 211, 1)",
            backgroundColor: "rgba(255, 255, 255, 0)",
            fillerColor: "rgba(119, 234, 211, 0.5)"
        },
        {
            type: 'inside',
            realtime: true,
        }
    ],
    series: []
});
onMounted(() => {
    socChartData();
});

//弹出日期面板
const showPopup = (index, type) => {
    dateShow.value = true;
    dateIndex.value = index;
    dateType.value = type;
    if (index == 1) {
        defaultDate.value = [socTime.value[0], socTime.value[1]];
    }
    if (index == 2) {
        if (type == 'vol') {
            defaultDate.value = [volTime.value[0], volTime.value[1]];
        }
        else if (type == 'power') {
            defaultDate.value = [powerTime.value[0], powerTime.value[1]];
        }
        else if (type == 'voldiff') {
            defaultDate.value = [volDifTime.value[0], volDifTime.value[1]];
        }
        else {
            defaultDate.value = [temDiffTime.value[0], temDiffTime.value[1]];
        }
    }
}
//关闭日期面板
const onConfirm = () => {
    if (dateIndex.value == 1) {
        socTime.value[0] = defaultDate.value[0];
        socTime.value[1] = defaultDate.value[1];
    }
    if (dateIndex.value == 2) {
        if (dateType.value == 'vol') {
            volTime.value[0] = defaultDate.value[0];
            volTime.value[1] = defaultDate.value[1];
            volSame.value.splice(0,volSame.value.length,...newData.value)
        }
        else if (dateType.value == 'power') {
            powerTime.value[0] = defaultDate.value[0];
            powerTime.value[1] = defaultDate.value[1];
        }
        else if (dateType.value == 'voldiff') {
            volDifTime.value[0] = defaultDate.value[0];
            volDifTime.value[1] = defaultDate.value[1];
        }
        else {
            temDiffTime.value[0] = defaultDate.value[0];
            temDiffTime.value[1] = defaultDate.value[1];
        }
    }
    dateShow.value = false
}
//soc数据
const socChartData = () => {
    let xData = socOption.value.xAxis[0].data;
    xData.splice(0, xData.length);
    for (var i = 0; i < socOption.value.series.length; i++) {
        let seriesData = socOption.value.series[i].data
        seriesData.splice(0, seriesData.length);
    }
    for (var i = 0; i < clusterData.value.clusterList.length; i++) {
        socOption.value.xAxis[0].data.push(clusterData.value.clusterList[i].id);
        socOption.value.series[0].data.push(clusterData.value.clusterList[i].soc);
    }
    nextTick(() => {
        socChartInit();
    })
}
//soc图表
const socChartInit = () => {
    socChart = echarts.init(document.getElementById("socChart"));
    socChart.setOption(socOption.value);
    window.addEventListener("resize", function () {
        socChart.resize();
    });
};
</script>
<template>
    <div class="cluster">
        <clusterCardPage v-for="index in 2" :key="index" :boxIndex="index">
            <template v-slot:leftTitle>
                <span> {{ index == 1 ? $t('systemPage.cluster_chartTitle') : $t('systemPage.cluster_chartTitle1')
                    }}</span>
            </template>
            <template v-slot:dateBox>
                <div class="choseEsDate" @click="showPopup(index, null)">{{ socTime[0] + "-" + socTime[1] }}
                    <van-icon name="arrow-down" />
                </div>
            </template>
            <template v-slot:chartBox>
                <div id="socChart" class="chartDomBox" ref="socChart"></div>
            </template>
            <template v-slot:subTitle>
                {{ $t('systemPage.cluster_voltageCons') }}
            </template>
            <template v-slot:subDate>
                <div class="choseEsDate" @click="showPopup(index, 'vol')">{{ volTime[0] + "-" + volTime[1] }}
                    <van-icon name="arrow-down" />
                </div>
            </template>
            <template v-slot:chartSameBox>
                <LineChart chartId="volChart" :allData="volSame" refName="volChart" :option="volOption" />
            </template>
            <template v-slot:subTitle1>
                {{ $t('systemPage.cluster_powerCons') }}
            </template>
            <template v-slot:subDate1>
                <div class="choseEsDate" @click="showPopup(index, 'power')">{{ powerTime[0] + "-" + powerTime[1] }}
                    <van-icon name="arrow-down" />
                </div>
            </template>
            <template v-slot:chartSameBox1>
                <LineChart chartId="powerChart" :allData="powerSame" refName="powerChart" :option="powerOption" />
            </template>
            <template v-slot:subTitle2>
                {{ $t('systemPage.cluster_voltageDifCons') }}
            </template>
            <template v-slot:subDate2>
                <div class="choseEsDate" @click="showPopup(index, 'voldiff')">{{ volDifTime[0] + "-" + volDifTime[1] }}
                    <van-icon name="arrow-down" />
                </div>
            </template>
            <template v-slot:chartSameBox2>
                <LineChart chartId="voldiffChart" :allData="volDiffSame" refName="voldiffChart"
                    :option="volDiffOption" />
            </template>
            <template v-slot:subTitle3>
                {{ $t('systemPage.cluster_temDifCons') }}
            </template>
            <template v-slot:subDate3>
                <div class="choseEsDate" @click="showPopup(index, 'temdiff')">{{ temDiffTime[0] + "-" + temDiffTime[1] }}
                    <van-icon name="arrow-down" />
                </div>
            </template>
            <template v-slot:chartSameBox3>
                <LineChart chartId="temdiffChart" :allData="temDiffSame" refName="temdiffChart"
                    :option="temDiffOption" />
            </template>
        </clusterCardPage>
        <clusterSingleCard v-for="(item,index) in clusterData.clusterList" :key="index" :clusterData="item">
            
        </clusterSingleCard>
        <van-popup round position="bottom" :show="dateShow">
            <van-date-picker v-model="defaultDate" :title="$t('allStation.dateDate')" :columns-type="columnsType"
                @cancel="dateShow = false" @confirm="onConfirm" :cancel-button-text="$t('allStation.cancel')"
                :confirm-button-text="$t('allStation.confirm')" />
        </van-popup>
    </div>
</template>
<style scoped lang="less">
.cluster {
    .rowData {
        padding: 12px 24px;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;

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
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: baseline;
            -webkit-align-items: baseline;
                -ms-flex-align: baseline;
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
    }

    .chartDomBox {
        width: 100%;
        height: 400px;
    }

    .choseEsDate {
        font-size: 28px;
        font-weight: 400;
        text-align: right;
        color: var(--allStation-tab-title);
    }

    .van-popup {
        .van-picker {
            background-color: var(--stations-van-picker-bg);

            :deep(.van-picker__toolbar) {
                border-bottom: 1px solid #8b8b8b;

                button {
                    color: #40e2c1;
                }

                .van-picker__title {
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