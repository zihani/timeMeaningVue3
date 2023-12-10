import { defineStore } from "pinia";
import { reactive, ref ,computed} from "vue";

// 定义用户状态仓库
export const useTablePetStore = defineStore(
  "tablePet",()=>{
    const show = ref(true)
    function increment() {
      debugger
      show.value = !show.value
    }
    return {show,increment}
  });

// 在 Setup Store 中：
// ref() 就是 state 属性
// computed() 就是 getters
// function() 就是 actions
// export const useBannerSetopStore = defineStore(
//   'setupBanner', () => {
//   const count = ref(0)
//   const getters1 = computed(()=>{
//     return count.value + 100
//   })
//   function increment() {
//   }
//   return { count,increment ,getters1}
// })
