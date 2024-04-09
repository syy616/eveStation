<script setup>
const props = defineProps({
    boxIndex: Number
})
</script>
<template>
    <div class="clusterCardPage">
        <van-row class="pcsBox">
            <van-col span="12">
                <div class="boxTitle">
                    <van-row>
                        <van-col span="1">
                            <div class="leftBorder"></div>
                        </van-col>
                        <van-col span="23">
                            <div class="leftTitle">
                                <slot name="leftTitle"></slot>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </van-col>
            <van-col span="12">
                <div class="dateBox" v-if="props.boxIndex == 1">
                    <slot name="dateBox"></slot>
                </div>
            </van-col>
        </van-row>
        <van-row class="subTitleBox" v-if="props.boxIndex == 2">
            <van-col span="12" class="subTitle">
                <slot name="subTitle"></slot>
            </van-col>
            <van-col span="12" class="subDate">
                <slot name="subDate"></slot>
            </van-col>
            <van-col span="24">
                <slot name="chartSameBox"></slot>
            </van-col>
        </van-row>
        <van-row class="subTitleBox subTitleBox1" v-if="props.boxIndex == 2">
            <van-col span="12" class="subTitle subTitle1">
                <slot name="subTitle1"></slot>
            </van-col>
            <van-col span="12" class="subDate">
                <slot name="subDate1"></slot>
            </van-col>
            <van-col span="24">
                <slot name="chartSameBox1"></slot>
            </van-col>
        </van-row>
        <van-row class="subTitleBox subTitleBox2" v-if="props.boxIndex == 2">
            <van-col span="12" class="subTitle subTitle1">
                <slot name="subTitle2"></slot>
            </van-col>
            <van-col span="12" class="subDate">
                <slot name="subDate2"></slot>
            </van-col>
            <van-col span="24">
                <slot name="chartSameBox2"></slot>
            </van-col>
        </van-row>
        <van-row class="subTitleBox subTitleBox3" v-if="props.boxIndex == 2">
            <van-col span="12" class="subTitle subTitle1">
                <slot name="subTitle3"></slot>
            </van-col>
            <van-col span="12" class="subDate">
                <slot name="subDate3"></slot>
            </van-col>
            <van-col span="24">
                <slot name="chartSameBox3"></slot>
            </van-col>
        </van-row>
        <van-row class="chartBox" v-if="props.boxIndex == 1">
            <slot name="chartBox"></slot>
        </van-row>
    </div>
</template>
<style scoped lang="less">
.clusterCardPage {
    width: 100%;
    height: 100%;
    margin-top: 24px;
    border-radius: 8px;
    -webkit-box-shadow: var(--systemOverview-boxShadow);
            box-shadow: var(--systemOverview-boxShadow);
    padding: 16px 32px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;

    .pcsBox {
        .boxTitle {
            width: 100%;
            color: var(--allStation-tab-title);
            font-size: 34px;
            font-weight: 500;
            height: 42px;
            line-height: 42px;

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
                        margin-left: 10px;
                    }
                }
            }

        }

        .dateBox {
            height: 42px;
            line-height: 42px;
        }
    }

    .subTitleBox {
        width: 100%;
        margin-top: 24px;

        .subTitle {
            width: 100%;
            text-align: left;
            font-family: PingFang SC, PingFang SC;
            font-weight: 500;
            font-size: 26px;
            color: var(--allStation-tab-title);
            line-height: 34px;
            font-style: normal;
        }

        .subDate {
            width: 100%;
            height: 42px;
            line-height: 42px;
        }
    }
    .chartBox {
        margin-top: 16px;
    }
}
</style>