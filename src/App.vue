<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Body from '@/components/layout/Body.vue'
import Footer from '@/components/layout/Footer.vue'
import Loading from '@/components/public/loading.vue'
</script>
<template>
    <!-- <Loading></Loading> -->
    <Header></Header>
    <Body></Body>
    <Footer></Footer>
</template>
<style scoped lang="less">
#app {
  font-size: 17px;
  color: #6f6f6f;
}
</style>
