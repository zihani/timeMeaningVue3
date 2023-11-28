
<script  setup lang="ts">
// import {useRoute} from 'vue-router'
// const route=useRoute()
</script>
<template>
    <div id="layout-body">
        <router-view></router-view>
    </div>
</template>
<style scoped>
#layout-body{
    /* header = 80px */
    min-height: -moz-calc(100vh - 80px);
    min-height: -webkit-calc(100vh - 80px);
    min-height: calc(100vh - 80px);
}
</style>
