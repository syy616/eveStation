<script setup>
import { ref } from 'vue';

const isActive = ref(true);
props:{
    
}

</script>

<template>
    <div class="footerItem">
        <div class="menuItem">
            <div class="menuIcon" v-if="isActive">
                <slot name="item-icon"></slot>
            </div>
            <div class="menuIcon" v-else>
                <slot name="item-icon-active"></slot>
            </div>
        </div>
        <div class="menuTitle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<style lang="less"></style>