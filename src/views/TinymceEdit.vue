<script setup lang="ts">  // setup lang="ts" export default
import { onMounted } from "vue"
  onMounted(()=>{
    setTimeout(()=>{
      debugger
       const initTinymce:object = window.tinymce
       initTinymce
       initTinymce.init({
        selector: '#mytextarea'
      });
       debugger
    },5000)
  })
</script>
<template>
<div><textarea id="mytextarea">Hello, World!</textarea></div>
<div>
  <h1 class="h122">111111111111</h1>
</div>
</template>
<style scoped>
@import '@/assets/h11.css'
</style>
