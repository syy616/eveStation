<script setup>
import systemCardPage from '@components/SystemCard/SystemCardPage.vue';
import pcsContent from '../SysstemPopup/pcsContent.vue';
import { onMounted, onBeforeMount, getCurrentInstance, ref, nextTick } from "vue";
import { useI18n } from 'vue-i18n'
import useLocalStorage from "@/store/modules/localStorage";
import { unitMoney, unitChange } from '../../../utils/unitChange';
import dayjs from "dayjs";

const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
const { t, locale } = useI18n();
const store = useLocalStorage();
const props = defineProps({
    sysName: String
})
//数据
const dateShow = ref(false);
const pcsMore = ref(false);
const defaultDate = ref(dayjs(new Date()).format("YYYY-MM").split("-"));  //日历默认值
const powerTime = ref(['2024', '01']);  //日历默认值
const chargeTime = ref(['2024', '03']);
const columnsType = ['year', 'month'];
const allData = ref({
    pcsDc: {
        current: 897.65,
        voltage: 750.34,
        power: 345.45
    },
    pcsAc: {
        ua: 233.34,
        ub: 233.34,
        uc: 233.34,
        Ia: 233.34,
        Ib: 233.34,
        Ic: 233.34,
        frequency: 23,
        factor: 0.5
    },
    pcsAllData: {
        state: 1,
        ApparentPower: 499.9,
        BranchMode: 0,
        BranchPower_01: 0,
        BranchPower_02: 0,
        BranchPower_03: 0,
        BranchPower_04: 0,
        BranchPower_05: 0,
        BranchPower_06: 0,
        BranchPower_07: 0,
        BranchPower_08: 0,
        BranchPower_09: 0,
        BranchPower_10: 0,
        BranchPower_11: 0,
        BranchPower_12: 0,
        BranchPower_13: 0,
        BranchPower_14: 0,
        BranchPower_15: 0,
        BranchPower_16: 0,
        BranchPower_17: 0,
        BranchPower_18: 0,
        BranchPower_19: 0,
        BranchPower_20: 0,
        Dc: 693.3,
        Dp: 520.9,
        Dv: 747.7,
        Fault: "[]",
        Frequency: 0,
        Ia: 712.9,
        Ib: 712.4,
        Ic: 713.9,
        Id: 23811,
        ModuleTemp: 0,
        NetStatus: 0,
        OccurTime: "2024-04-01 11:11:00",
        Power: 499.9,
        PowerFactor: 1,
        RunState: 0,
        StationUuid: "1",
        SwitchStatus: 1,
        SystemState: 2,
        SystemUuid: "ES-W-00001",
        Temp: 0,
        TodayChargeEnergy: 1768,
        TodayDisChargeEnergy: 552,
        TotalChargeEnergy: 2733163.2,
        TotalDisChargeEnergy: 2561049.1,
        TotalUnUseEnergy: 42.72,
        Ua: 405,
        Ub: 405.8,
        Uc: 405.2,
        UnPower: 0,
        Warn: "[]",
        WriteTime: "2024-04-01 11:12:20",
    },
    powerData: [
        { pcs: 234.23, vol: 734.93, curr: 1.2, bms: 123.4, date: "1" },
        { pcs: 234.23, vol: 714.93, curr: 1.2, bms: 153.4, date: "2" },
        { pcs: 24.23, vol: 734.93, curr: 1.2, bms: 134, date: "3" },
        { pcs: 34.23, vol: 73.93, curr: 1.2, bms: 88.45, date: "4" },
        { pcs: 234.23, vol: 634.93, curr: 1.2, bms: 123.34, date: "5" },
        { pcs: 234.23, vol: 714.93, curr: 1.2, bms: 156.54, date: "6" },
        { pcs: 23.23, vol: 738.93, curr: 1.2, bms: 166.45, date: "7" },
        { pcs: 234.23, vol: 794.93, curr: 1.2, bms: 123.32, date: "8" },
        { pcs: 24.23, vol: 734.93, curr: 1.2, bms: 334.2, date: "9" },
        { pcs: 234.23, vol: 734.93, curr: 1.2, bms: 323.4, date: "10" },
        { pcs: 24.23, vol: 737.93, curr: 1.2, bms: 236.5, date: "11" },
        { pcs: 234.23, vol: 774.93, curr: 1.2, bms: 266.6, date: "12" },
    ],
    chargeData: [
        { charge: 234.23, disCharge: 734.93, curr: 1.2, bms: 123.4, date: "1" },
        { charge: 234.23, disCharge: 714.93, curr: 1.2, bms: 153.4, date: "2" },
        { charge: 24.23, disCharge: 734.93, curr: 1.2, bms: 134, date: "3" },
        { charge: 34.23, disCharge: 73.93, curr: 1.2, bms: 88.45, date: "4" },
        { charge: 234.23, disCharge: 634.93, curr: 1.2, bms: 123.34, date: "5" },
        { charge: 234.23, disCharge: 714.93, curr: 1.2, bms: 156.54, date: "6" },
        { charge: 23.23, disCharge: 738.93, curr: 1.2, bms: 166.45, date: "7" },
        { charge: 234.23, disCharge: 794.93, curr: 1.2, bms: 123.32, date: "8" },
        { charge: 24.23, disCharge: 734.93, curr: 1.2, bms: 334.2, date: "9" },
        { charge: 234.23, disCharge: 734.93, curr: 1.2, bms: 323.4, date: "10" },
        { charge: 24.23, disCharge: 737.93, curr: 1.2, bms: 236.5, date: "11" },
        { charge: 234.23, disCharge: 774.93, curr: 1.2, bms: 266.6, date: "12" },
    ],
});
let powerChart = null;
let chargeChart = null;
let dateIndex = ref(1);
const powerOption = ref({
    color: ["#43497AFF", "#612CDBFF", "#96C3D9FF", "#B2E3E6FF"],
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
            color: "#9d9d9d"
        },
        data: ['BMS', 'PCS', t('systemPage.systemDcVol'), t('systemPage.systemDcCurrent')]
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
            name: t('allStation.pvChartlend') + '(kW)',
            axisLabel: {
                rotate: 15,
                color: "#9d9d9d"
            },
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: "#9d9d9d",
                overflow: 'truncate' // 名称过长自动截断
            },
        }
    ],
    series: [
        {
            name: "BMS",
            type: 'line',
            areaStyle: {},
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' kW';
                }
            },
            data: []
        },
        {
            name: "PCS",
            type: 'line',
            areaStyle: {},
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' kW';
                }
            },
            data: []
        },
        {
            name: t('systemPage.systemDcVol'),
            type: 'line',
            areaStyle: {},
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' kW';
                }
            },
            data: []
        },
        {
            name: t('systemPage.systemDcCurrent'),
            type: 'line',
            areaStyle: {},
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' kW';
                }
            },
            data: []
        }
    ]
});
const chargeOption = ref({
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
            color: "#9d9d9d"
        },
        data: [t('systemPage.systemCharge'), t('systemPage.systemDisCharge')]
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
            name: t('systemPage.systemChargeTitle') + '(kW)',
            axisLabel: {
                rotate: 15,
                color: "#9d9d9d"
            },
            nameLocation: 'end', // 名称显示在末尾
            nameTextStyle: {
                color: "#9d9d9d",
                overflow: 'truncate' // 名称过长自动截断
            },
        }
    ],
    series: [
        {
            name: t('systemPage.systemCharge'),
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + 'kWh';
                }
            },
            data: []
        },
        {
            name: t('systemPage.systemDisCharge'),
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + 'kWh';
                }
            },
            data: []
        }
    ]
});

onMounted(() => {
    getNowTime();
    powerChartData();
    chargeChartData();
});

//method
//弹出日期面板
const showPopup = (index) => {
    dateShow.value = true;
    dateIndex.value = index;
    if (index == 2) {
        defaultDate.value = [powerTime.value[0], powerTime.value[1]];
    }
    if (index == 3) {
        defaultDate.value = [chargeTime.value[0], chargeTime.value[1]];
    }
}
//关闭日期面板
const onConfirm = () => {
    if (dateIndex.value == 2) {
        powerTime.value[0] = defaultDate.value[0];
        powerTime.value[1] = defaultDate.value[1];
    }
    if (dateIndex.value == 3) {
        chargeTime.value[0] = defaultDate.value[0];
        chargeTime.value[1] = defaultDate.value[1];
    }
    dateShow.value = false
}
//获取当前时间
const getNowTime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    powerTime.value[0] = chargeTime.value[0] = year + "";  //页面默认初始当月
    powerTime.value[1] = chargeTime.value[1] = month + "";  //页面默认初始当月
}

//处理echart数据
const powerChartData = () => {
    let xData = powerOption.value.xAxis[0].data;
    xData.splice(0, xData.length);
    for (var i = 0; i < powerOption.value.series.length; i++) {
        let seriesData = powerOption.value.series[i].data
        seriesData.splice(0, seriesData.length);
    }
    for (var i = 0; i < allData.value.powerData.length; i++) {
        powerOption.value.xAxis[0].data.push(allData.value.powerData[i].date);
        powerOption.value.series[0].data.push(allData.value.powerData[i].bms);
        powerOption.value.series[1].data.push(allData.value.powerData[i].pcs);
        powerOption.value.series[2].data.push(allData.value.powerData[i].vol);
        powerOption.value.series[3].data.push(allData.value.powerData[i].curr);
    }
    nextTick(() => {
        powerChartInit();
    })
}
//init图表
const powerChartInit = () => {
    powerChart = echarts.init(document.getElementById("powerChart"));
    powerChart.setOption(powerOption.value);
    window.addEventListener("resize", function () {
        powerChart.resize();
    });
};

//处理echart数据
const chargeChartData = () => {
    let xData = chargeOption.value.xAxis[0].data;
    xData.splice(0, xData.length);
    for (var i = 0; i < chargeOption.value.series.length; i++) {
        let seriesData = chargeOption.value.series[i].data
        seriesData.splice(0, seriesData.length);
    }
    for (var i = 0; i < allData.value.chargeData.length; i++) {
        chargeOption.value.xAxis[0].data.push(allData.value.chargeData[i].date);
        chargeOption.value.series[0].data.push(allData.value.chargeData[i].charge);
        chargeOption.value.series[1].data.push(allData.value.chargeData[i].disCharge);
    }
    nextTick(() => {
        chargeChartInit();
    })
}
//init图表
const chargeChartInit = () => {
    chargeChart = echarts.init(document.getElementById("chargeChart"));
    chargeChart.setOption(chargeOption.value);
    window.addEventListener("resize", function () {
        chargeChart.resize();
    });
};
//展示PCS详细信息
const showMorePcs = () => {
    pcsMore.value = true;
};
</script>
<template>
    <div class="singleSystem">
        <systemCardPage v-for="index in 3" :key="index" :boxIndex="index">
            <template v-slot:leftTitle>
                <span> {{ index == 1 ? $t('systemPage.systemPcsTitle') : (index == 2 ? $t('systemPage.systemPowerTitle')
            :
            $t('systemPage.systemChargeTitle')) }}</span>
            </template>
            <template v-slot:dateBox>
                <div class="choseEsDate" @click="showPopup(index)">{{ index == 1 ? "" : (index == 2
            ? powerTime[0] + "-" + powerTime[1] : chargeTime[0] + "-" + chargeTime[1]) }}
                    <van-icon name="arrow-down" />
                </div>
            </template>
            <template v-slot:subTitle>
                {{ $t('systemPage.systemPcsDC') }}
            </template>
            <template v-slot:subData>
                <van-row class="rowData" justify="end">
                    <van-col span="8">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsDc.power, '', true).number }}
                                </div>
                                <div class="esUnit">{{ unitChange(3, allData.pcsDc.power, '', true).unit }}</div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('systemPage.systemDcPower') }}</div>
                        </van-row>
                    </van-col>
                    <van-col span="8">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsDc.voltage, '', true).number }}
                                </div>
                                <div class="esUnit">V</div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('systemPage.systemDcVol') }}</div>
                        </van-row>
                    </van-col>
                    <van-col span="8">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsDc.current, '', true).number }}</div>
                                <div class="esUnit">A</div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('systemPage.systemDcCurrent') }}</div>
                        </van-row>
                    </van-col>
                </van-row>
            </template>
            <template v-slot:subTitle1>
                {{ $t('systemPage.systemPcsAC') }}
            </template>
            <template v-slot:subData1>
                <van-row class="rowData" :gutter="[20, 16]">
                    <van-col span="6">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsAc.ua, '', true).number }}
                                </div>
                                <div class="esUnit">V</div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">UA</div>
                        </van-row>
                    </van-col>
                    <van-col span="6">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsAc.ub, '', true).number }}
                                </div>
                                <div class="esUnit">V</div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">UB</div>
                        </van-row>
                    </van-col>
                    <van-col span="6">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsAc.uc, '', true).number }}</div>
                                <div class="esUnit">V</div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">UC</div>
                        </van-row>
                    </van-col>
                    <van-col span="6">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsAc.frequency, '', true).number }}
                                </div>
                                <div class="esUnit">Hz</div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('systemPage.systemDcFrequency') }}</div>
                        </van-row>
                    </van-col>
                    <van-col span="6">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsAc.Ia, '', true).number }}
                                </div>
                                <div class="esUnit">A</div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">IA</div>
                        </van-row>
                    </van-col>
                    <van-col span="6">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsAc.Ib, '', true).number }}
                                </div>
                                <div class="esUnit">A</div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">IB</div>
                        </van-row>
                    </van-col>
                    <van-col span="6">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsAc.Ic, '', true).number }}
                                </div>
                                <div class="esUnit">A</div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">IC</div>
                        </van-row>
                    </van-col>
                    <van-col span="6">
                        <van-row>
                            <van-col span="24" class="row2">
                                <div class="esData">{{ unitChange(3, allData.pcsAc.factor, '', true).number }}</div>
                                <div class="esUnit"></div>
                            </van-col>
                        </van-row>
                        <van-row class="row1">
                            <div class="esTitle">{{ $t('systemPage.systemDcFactor') }}</div>
                        </van-row>
                    </van-col>
                </van-row>
            </template>
            <template v-slot:moreIcon>
                <van-icon name="ellipsis" @click="showMorePcs" />
            </template>
            <template v-slot:chartBox>
                <div id="powerChart" class="chartDomBox" ref="powerChart" v-if="index == 2"></div>
                <div id="chargeChart" class="chartDomBox" ref="chargeChart" v-else-if="index == 3"></div>
            </template>
        </systemCardPage>
        <van-popup round position="bottom" :show="dateShow">
            <van-date-picker v-model="defaultDate" :title="$t('allStation.dateDate')" :columns-type="columnsType"
                @cancel="dateShow = false" @confirm="onConfirm" :cancel-button-text="$t('allStation.cancel')"
                :confirm-button-text="$t('allStation.confirm')" />
        </van-popup>
        <van-popup class="pcsMoreBox" v-model:show="pcsMore" closeable round :closeOnClickOverlay="false">
            <pcsContent :pcsAllData="allData.pcsAllData" :sysName="sysName"></pcsContent>
        </van-popup>
    </div>
</template>
<style scoped lang="less">
.singleSystem {
    width: 100%;
    height: 100%;
    padding: 0 24px 24px 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

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

    .pcsMoreBox {
        width: 90%;
        height: 1100px;
        background: var(--systemOverview-showBg);
        padding: 29px 24px;
    }
}
</style>