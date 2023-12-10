
<script  setup lang="ts">
import TablePet from '@/components/public/TablePet.vue'
</script>
<template>
    <div id="layout-body">
        <router-view></router-view>
        <TablePet></TablePet>
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
