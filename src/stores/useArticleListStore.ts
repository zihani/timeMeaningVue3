import { defineStore } from "pinia";
import Articlejson from "@/assets/articlejson/json/Articlelist.json"
import { ref } from "vue";
import type { Ref } from "vue";
export const useArticleListStore = defineStore(
    'articleList', () => {
    const articleTable: Ref<Array<object>> = ref(Articlejson)
    // const getters1 = computed(()=>{
    //   return count.value + 100
    // })
    function increment() {
    }
    return { articleTable }
})
