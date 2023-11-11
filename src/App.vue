<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import TinymceEdit from '@/views/TinymceEdit.vue'
// export default {
//   data(){
//      return{
//          name:"张三"
//      }
//   },
//   created(){
//     // 可以正常获取
//     this.name
//   },
//   mounted(){
//     //this 指向 Proxy
//     this.name
//     console.log(this.count) // 0
//   }
// }

</script>
<template>
  <header>
      <TinymceEdit />
  </header>
  <RouterView />
</template>

<style scoped>
</style>
