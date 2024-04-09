<script setup>
import { ref, computed, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from 'vue-router'

//数据定义
const router = useRouter()
const route = useRoute()
const activeColor = "#40E2C1";
// const normalColor =  "rgba(0,0,0,0.4)";
const normalColor =  "#a0a0a0";

//prop
const props = defineProps({
    itemId: String,
    clildProps: String
})

//方法
const checkItem = (value) => {
    router.push(value);
}

//computed
const isActive = computed(() => {
    return route.path.indexOf(props.clildProps) !== -1
})
const activeStyle = computed(() => {
    return isActive.value ? { color: activeColor } : { color: normalColor }
})
</script>

<template>
    <div class="footerItem" @click="checkItem(clildProps)">
        <div class="menuItem">
            <div class="menuIcon" v-if="isActive">
                <slot name="item-icon"></slot>
            </div>
            <div class="menuIcon" v-else>
                <slot name="item-icon-active"></slot>
            </div>
        </div>
        <div class="menuTitle" :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
.footerItem {
    width: 25%;
    :deep(.menuItem) {
        height: 49px;
        text-align: center;

        >.menuIcon {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
                -ms-flex-pack: center;
                    justify-content: center;

            >img {
                width: 49px;
                height: 49px;
            }
        }

    }

    >.menuTitle {
        color: var(--menuColor);
        font-size: 20px;
        text-align: center;
    }

}

</style>