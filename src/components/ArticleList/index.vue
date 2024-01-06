<script setup lang="ts">
import { ref } from 'vue'
import Feature from '@/components/feature/index.vue'
import Banner from "@/components/public/Banner/index.vue"
const features = ref([
    {id: 1, title: 'Akina', img: 'https://s1.ax1x.com/2020/05/14/YDfRnU.jpg'},
    {id: 2, title: '使用说明', img: 'https://s1.ax1x.com/2020/05/14/YDf4AJ.jpg'},
    {id: 3, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'},
    {id: 4, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'},
    {id: 5, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'},
    {id: 6, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'},
    {id: 7, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'},
])
</script>
<template>
    <div class="articleList">
        <Banner></Banner>  
        <div class="site-content">
            <!--焦点图-->
            <div class='articlesList'>
                <section-title>
                    <div style="display: flex;align-items: flex-end;">笔记<small-ico></small-ico></div>
                </section-title>
                <div>
                    <div  v-for="item in features" :key="item.title">
                        <Feature :data="item"></Feature>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.articlesList{
    margin-bottom: 300px;
    padding-bottom: 300px;
}
</style>
