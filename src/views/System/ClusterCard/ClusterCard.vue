<script setup>
import { onMounted, onBeforeMount, getCurrentInstance, ref, nextTick, watch } from "vue";
import { useI18n } from 'vue-i18n';
import { unitMoney, unitChange } from '@utils/unitChange.js';
import WaterChart from "../Tabs/WaterChart.vue";

const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t, locale } = useI18n();
const props = defineProps({
    clusterData: Object
})
const chartInstance = ref("");         //图表
//处理数据
const dealList = () => {
    props.clusterData.list = [
        { label: t('systemPage.maxSingleV'), data: props.clusterData.maxV, unit: "V", color: "" },
        { label: t('systemPage.maxSingleVP'), data: props.clusterData.maxVp, unit: "", color: "" },
        { label: t('systemPage.minSingleV'), data: props.clusterData.minV, unit: "V", color: "" },
        { label: t('systemPage.minSingleVP'), data: props.clusterData.minVp, unit: "", color: "" },
        { label: t('systemPage.maxSingleT'), data: props.clusterData.maxT, unit: "℃", color: "red" },
        { label: t('systemPage.maxSingleTP'), data: props.clusterData.maxTp, unit: "", color: "" },
        { label: t('systemPage.minSingleT'), data: props.clusterData.minT, unit: "℃", color: "blue" },
        { label: t('systemPage.minSingleTP'), data: props.clusterData.minTp, unit: "", color: "" },
    ]
}
onBeforeMount(() => {
    dealList();
})
</script>
<template>
    <div class="singleCluster">
        <van-row class="rowContent" gutter="10">
            <van-col span="24" class="clusterTitle"> {{ $t('systemPage.cluster_name') + props.clusterData.id
                }}</van-col>
            <van-col span="12">
                <div class="dataBox">
                    <div class="dataTitle">{{ $t("systemPage.pcs_TodayChargeEnergy") }}</div>
                    <div class="dataNum">{{ unitChange(1, props.clusterData.todayCharge, '', true).number }}
                        <span class="unit">{{ unitChange(1, props.clusterData.todayCharge, '', true).unit }}</span>
                    </div>
                </div>
            </van-col>
            <van-col span="12">
                <div class="dataBox">
                    <div class="dataTitle">{{ $t("systemPage.pcs_TodayDisChargeEnergy") }}</div>
                    <div class="dataNum">{{ unitChange(1, props.clusterData.todayDisCharge, '', true).number }}
                        <span class="unit">{{ unitChange(1, props.clusterData.todayDisCharge, '', true).unit }}</span>
                    </div>
                </div>
            </van-col>
            <van-col span="24">
                <lazy-component>
                        <WaterChart :dataList="clusterData" :isTop="false"></WaterChart>
                </lazy-component>
            </van-col>

        </van-row>
    </div>
</template>
<style scoped lang="less">
.singleCluster {
    width: 100%;
    padding: 12px 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    .rowContent {
        width: 100%;
        border: var(--clusterSingle-border);
        border-radius: 24px 24px 24px 24px;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;

        .clusterTitle {
            height: 36px;
            color: var(--text-color);
            font-family: PingFang SC, PingFang SC;
            font-weight: 500;
            font-size: 28px;
            margin-bottom: 16px;
        }

        .dataBox {
            height: 132px;
            border-radius: 16px;
            padding: 24px;
            background: var(--cluster-databg);
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border: var(--clusterSingle-border);
            -webkit-box-shadow: var(--systemOverview-boxShadow);
            box-shadow: var(--systemOverview-boxShadow);
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;

            .dataTitle {
                width: 100%;
                font-size: 28px;
                font-weight: 400;
                color: var(--allStation-data-title);
                margin-bottom: 10px;
            }

            .dataNum {
                width: 100%;
                font-size: 36px;
                font-weight: 500;
                color: var(--allStation-box-data-color);

                .unit {
                    font-weight: 400;
                    font-size: 22px;
                    color: var(--allStation-data-title);
                }
            }
        }

        .dataRow {}

    }
}
</style>