<script setup>
    import TopTitle from "@components/TopTitle/TopTitle.vue";
    import FooterPage from "@components/Footer/Footer.vue";
</script>

<template>
    <div class="indexPage">
        <TopTitle />
        <router-view></router-view>
        <FooterPage />
    </div>
</template>
<style lang="less">
.indexPage{
    width: 100%;
    height: 100%;
    .footerPage{
        background-color: var(--bg-color);
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}

</style>