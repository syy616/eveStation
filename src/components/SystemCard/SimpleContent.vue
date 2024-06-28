<template>
    <div class="simpleContent">
        <van-row>
            <div :id="chartId" class="chartBox"></div>
            <van-swipe class="my-swipe"  indicator-color="white" vertical >
                <van-swipe-item v-for="(item, index) in result">
                    <van-row :gutter="[8, 8]">
                        <van-col span="8" v-for="(child, j) in item" :key="j">
                            <div class="dataBox">
                                <div class="dataNew">{{ child.value }}{{ chartId == 'volSimple' ? 'V' : "℃" }}</div>
                                <div class="dataTitle">#{{ child.id }}{{ chartId == 'volSimple' ?
                $t("systemPage.systemDcVol") : $t("systemPage.pcs_Temp") }}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-swipe-item>
            </van-swipe>
        </van-row>
    </div>
</template>
<script setup>
import { onMounted, onBeforeMount, getCurrentInstance, ref, nextTick, watch } from "vue"
import { useI18n } from "vue-i18n"
const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t, locale } = useI18n();
const props = defineProps({
    sysId: Number,
    chartId: String,
    option: Object,
    allData: Object,

})
const pageSize = ref(1);
const result = ref([]);
let chartInstance = ref("");         //图表
onMounted(() => {
    ChartData();
    comPage();
});
const comPage = () => {
    let firstData = props.allData.list;
    pageSize.value = Math.ceil(firstData.length / 9);
    for (let i = 0; i < firstData.length; i += 9) {
        result.value.push(firstData.slice(i, i + 9));
    }
}
const ChartData = () => {
    let unit = "";
    let varName = "";
    let dataName = "";
    let option = props.option;
    if (props.chartId == 'volSimple') {
        unit = "V";
        varName = "v";
        dataName = "volList";
    }
    else {
        unit = "℃";
        varName = "t";
        dataName = "temList";
    }
    let xData = option.xAxis[0].data;
    xData.splice(0, xData.length); //清空X轴数据
    for (let i = 0; i < option.series.length; i++) {
        let seriesData = option.series[i].data
        seriesData.splice(0, seriesData.length);  //清空Y轴数据
    }
    let allArr = [];
    let dataList = props.allData[dataName];
    for (let i = 0; i < dataList.length; i++) {
        option.xAxis[0].data.push(dataList[i].time);
        for (let j = 0; j < dataList[i][varName].length; j++) {
            allArr[j] = allArr[j] || [];
            allArr[j].push({ value: dataList[i][varName][j], name: "t" + (j + 1) });
        }
    }
    for (let i = 0; i < allArr.length; i++) {
        option.series.push({
            name: varName + (i + 1),
            type: 'line',
            tooltip: {
                valueFormatter: function (value) {
                    return value + unit;
                }
            },
            data: allArr[i]
        });
    }
    nextTick(() => {
        ChartInit();
    })
};
const ChartInit = () => {
    if (chartInstance.value == "") {
        chartInstance = echarts.init(document.getElementById(props.chartId));
    }
    chartInstance.setOption(props.option);
    window.addEventListener("resize", function () {
        chartInstance.resize();
    });
};
watch(props.allData, async (newVal, oldVal) => {
    if (chartInstance) {
        ChartInit();
    }
})
</script>
<style lang="less" scoped>
.simpleContent {
    width: 100%;
    box-shadow: var(--systemOverview-boxShadow);
    box-sizing: border-box;
    border-radius: 6px;
    margin-top: 10px;

    .chartBox {
        width: 100%;
        height: 400px;
    }

    :deep(.my-swipe) {
        width: 100%;
        height: 360px;
        padding: 12px 24px;
        box-sizing: border-box;

        .van-swipe__track {
            // padding-bottom: 40px;
            .dataBox {
                height: 100px;

                .dataNew {
                    text-align: center;
                    font-weight: 500;
                    margin-bottom: 8px;
                    font-size: 32px;
                    color: var(--allStation-tab-title);
                    font-family: PingFang SC, PingFang SC;
                }

                .dataTitle {
                    text-align: center;
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 400;
                    font-size: 28px;
                    color: var(--allStation-data-title);
                }
            }
        }
        .van-swipe__indicators{
            // bottom:15px;
        }
    }
}
</style>
