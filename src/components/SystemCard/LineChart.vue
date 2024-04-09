<script setup>
import { onMounted, onBeforeMount, getCurrentInstance, ref, nextTick, watch } from "vue";
import { useI18n } from 'vue-i18n';

const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t, locale } = useI18n();
const props = defineProps({
    chartId: String,
    refName: String,
    allData: Array,
    option: Object
})
let chartInstance = ref("");         //图表
// let arrData = ref([]);          //所有数据 

onMounted(() => {
    volChartData();
});

//vol数据
const volChartData = () => {
    let unit = "";
    let varName = "";
    let option = props.option;
    if (props.chartId == 'volChart') {
        // arrData.value = props.allData.volSame;
        unit = "V";
        varName = "vol";
    }
    else {
        if (props.chartId == 'powerChart') {
            // arrData.value = props.allData.powerSame;
            unit = "kWh";
            varName = "power";
        }
        else if (props.chartId == 'voldiffChart') {
            // arrData.value = props.allData.volDiffSame;
            unit = "V";
            varName = "volDiff";
        }
        else {
            // arrData.value = props.allData.temDiffSame;
            unit = "℃";
            varName = "temDiff";
        }
    }
    let xData = option.xAxis[0].data;
    xData.splice(0, xData.length); //清空X轴数据
    for (let i = 0; i < option.series.length; i++) {
        let seriesData = option.series[i].data
        seriesData.splice(0, seriesData.length);  //清空Y轴数据
    }

    for (let i = 0; i < props.allData.length; i++) {
        let arr = [];
        for (let j = 0; j < props.allData[i].length; j++) {
            if (i == 0) {
                option.xAxis[0].data.push(props.allData[i][j].time);
            }
            arr.push({ value: props.allData[i][j][varName], name: props.allData[i][j].ClusterId });
        }
        option.series.push({
            name: t("systemPage.cluster_name") + arr[0].name,
            type: 'line',
            tooltip: {
                valueFormatter: function (value) {
                    return value + unit;
                }
            },
            data: arr
        });
    }
    nextTick(() => {
        volChartInit();
    })
}
//vol图表
const volChartInit = () => {
    if(chartInstance.value==""){
        chartInstance = echarts.init(document.getElementById(props.chartId));
    }
    chartInstance.setOption(props.option);
    window.addEventListener("resize", function () {
        chartInstance.resize();
    });
};
watch(props.allData, async (newVal, oldVal) => {
    if (chartInstance) {
        volChartData();
    }
})
</script>

<template>
    <div class="lineChart">
        <div :id="chartId" class="chartDom" :ref="refName" :key="chartId">

        </div>
    </div>
</template>
<style scoped lang="less">
.lineChart {
    .chartDom {
        width: 100%;
        height: 600px;
    }
}
</style>