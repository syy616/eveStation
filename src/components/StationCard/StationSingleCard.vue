<script setup>
</script>

<template>
    <div class="StationSingleCard">
        <div class="storageBox">
            <div class="storageBoxBg">
                <div class="boxTitle">
                    <van-row>
                        <van-col span="1">
                            <div class="leftBorder"></div>
                        </van-col>
                        <van-col span="23">
                            <slot name="leftTitle"></slot>
                        </van-col>
                    </van-row>
                </div>
                <van-row class="rowData" justify="end">
                    <slot name="DataContent"></slot>
                </van-row>
                <div class="ChartBox">
                    <van-row>
                        <van-col span="12">
                            <div class="ChartTitle">
                                <slot name="ChartTitle"></slot>
                            </div>
                        </van-col>
                        <van-col span="12">
                            <div class="dateBox">
                                <slot name="dateBox"></slot>
                            </div>

                        </van-col>
                        <van-col span="24">
                            <div class="chartContent">
                                <slot name="chartContent"></slot>

                                <div class="chartContent1">
                                    <van-row>
                                        <van-col span="12">
                                            <div class="ChartTitle">
                                                <slot name="ChartTitle1"></slot>
                                            </div>
                                        </van-col>
                                        <van-col span="12">
                                            <div class="dateBox">
                                                <slot name="dateBox1"></slot>
                                            </div>
                                        </van-col>
                                    </van-row>
                                 <slot name="chartContent1"></slot>
                                </div>
                                <div class="ChartTitle">
                                    <slot name="ChartTitle2"></slot>
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>

    </div>
</template>
<style scoped lang="less">
.StationSingleCard {
    width: 100%;

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
            padding: 24px;
            box-sizing: border-box;

            .boxTitle {
                width: 100%;
                color: var(--allStation-tab-title);
                font-size: 34px;
                font-weight: 500;
                height: 42px;

                .van-row {
                    height: 100%;

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

            }

            .rowData {
                // padding: 32px 40px 40px 40px;
                padding: 32px 0px;

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
            }
        }
    }
}
</style>