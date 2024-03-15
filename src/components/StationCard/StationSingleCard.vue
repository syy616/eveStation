<script setup>
//数据导入
import { onMounted, ref } from 'vue'
//data


//prop
const props = defineProps({
    itemId: String,
})

//METHODS
const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      finished.value = true;

    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       list.value.push(list.value.length + 1);
    //     }

    //     // 加载状态结束
    //     loading.value = false;

    //     // 数据全部加载完成
    //     if (list.value.length >= 40) {
    //       finished.value = true;
    //     }
    //   }, 4000);
}
</script>

<template>
    <div class="StationSingleCard">
        1
        <!-- -->

    </div>
</template>
<style scoped lang="less">
.StationSingleCard {
    width: 100%;
    height: 100%;
    padding-top: 10px;
}
</style>