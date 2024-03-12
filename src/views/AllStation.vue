<script setup>


</script>

<template>
    <div class="allStation">
        <van-row gutter="10">
            <van-col span="12">
                <div class="allPowerData">
                    <div class="powerDataTitle">{{ $t('allStation.allCharge') }}</div>
                    <div class="powerData">9999.99 <span class="powerUnit">kWh</span></div>
                </div>
            </van-col>
            <van-col span="12">
                <div class="allPowerData">
                    <div class="powerDataTitle">{{ $t('allStation.allDisCharge') }}</div>
                    <div class="powerData">9999.99 <span class="powerUnit">kWh</span></div>
                </div>
            </van-col>
        </van-row>
        <van-row class="sysChartBox">
            <van-col span="24">
                <div class="systemCount">
                    <div class="sysCountTitle">{{ $t('allStation.sysCount') }}</div>

                </div>
            </van-col>
        </van-row>
    </div>
</template>
<style lang="less">
.allStation {
    width: 100%;
    height: calc(100% - 88px);
    padding: 24px;
    box-sizing: border-box;

    .allPowerData {
        height: 132px;
        background-color: var(--allStation-box-bg);
        border-radius: 16px 16px 16px 16px;
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.12), 0px 4px 8px 0px rgba(0, 0, 0, 0.08), 0px 1px 10px 0px rgba(0, 0, 0, 0.05);
        padding: 22px 24px;
        box-sizing: border-box;

        .powerDataTitle {
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 28px;
            color: var(--allStation-box-title-color);
        }

        .powerData {
            margin-top: 16px;
            font-weight: 500;
            font-size: 36px;
            color: var(--allStation-box-data-color);

            .powerUnit {
                color: var(--allStation-box-title-color);
                font-size: 22px;
                font-weight: 400;
            }
        }
    }

    .sysChartBox {
        margin-top: 20px;
        .systemCount {
            width: 100%;
            height: 380px;
            background: var(--allStation-system-chart-bg);
            border-radius: 16px 16px 16px 16px;
            padding: 24px;
            box-sizing: border-box;
            .sysCountTitle {
                color: var(--allStation-box-title-color);
                font-weight: 400;
                font-size: 28px;

            }
        }
    }

}
</style>