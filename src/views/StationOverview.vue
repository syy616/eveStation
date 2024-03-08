<script setup>
    import FooterPage from "@components/Footer/Footer.vue";
    // import HelloWorld from '@components/HelloWorld.vue'
</script>

<template>
    <div class="stationall">
        <FooterPage />
        <!-- <HelloWorld msg="Vite + Vue" /> -->
    </div>
</template>
<style lang="less">
.stationall{
    width: 100%;
    height: 100%;
    .footerPage{
        position: fixed;
        bottom: 60px;
        width: 100%;
    }
}

</style>