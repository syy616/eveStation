<script setup>
import { onMounted, onBeforeMount, getCurrentInstance, ref, nextTick } from "vue";
import { useI18n } from 'vue-i18n'
import useLocalStorage from "@/store/modules/localStorage";
import { unitMoney, unitChange } from '../../../utils/unitChange';
const props = defineProps({
    pcsAllData: Object,
    sysName:String
})
const { t, locale } = useI18n();
const store = useLocalStorage();
</script>
<template>
    <div class="pcsContent">
        <van-row>
            <van-col span="24" class="sysNamePop">{{ sysName }}</van-col>
        </van-row>
        <van-row :gutter="[10,20]">
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_state')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.state }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_RunState')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.RunState }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_SystemState')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.SystemState }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Power')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Power }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_ApparentPower')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.ApparentPower }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_UnPower')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.UnPower }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_PowerFactor')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.PowerFactor }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Temp')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Temp }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_TodayChargeEnergy')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.TodayChargeEnergy }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_TodayDisChargeEnergy')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.TodayDisChargeEnergy }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_TotalChargeEnergy')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.TotalChargeEnergy }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_TotalDisChargeEnergy')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.TotalDisChargeEnergy }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_TotalUnUseEnergy')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.TotalUnUseEnergy }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Ua')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Ua }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Ub')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Ub }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Uc')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Uc }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Ia')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Ia }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Ib')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Ib }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Ic')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Ic }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Id')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Id }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Dc')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Dc }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Dp')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Dp }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Dv')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Dv }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Frequency')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Frequency }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_ModuleTemp')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.ModuleTemp }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_NetStatus')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.NetStatus }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_OccurTime')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.OccurTime }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_01')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_01 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_02')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_02 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_03')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_03 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_04')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_04 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_05')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_05 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_06')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_06 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_07')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_07 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_08')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_08 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_09')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_09 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_10')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_10 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_11')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_11 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_12')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_12 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_13')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_13 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_14')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_14 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_15')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_15 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_16')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_16 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_17')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_17 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_18')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_18 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_19')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_19 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_BranchPower_20')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.BranchPower_20 }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8">
                <van-row class="row1">
                    <div class="esTitle">{{$t('systemPage.pcs_Warn')}}</div>
                </van-row>
                <van-row>
                    <van-col span="24" class="row2">
                        <div class="esData">{{pcsAllData.Warn }}
                        </div>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
    </div>
</template>
<style scoped lang="less">
.pcsContent{
    .sysNamePop {
        font-weight: 400;
        font-size: 30px;
        line-height: 38px;
        font-family: PingFang SC, PingFang SC;
        font-style: normal;
        color: var(--allStation-box-data-color);
        margin-bottom: 30px;
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
</style>