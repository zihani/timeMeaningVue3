<script setup lang="ts">
import { defineComponent ,ref ,onMounted } from 'vue'
import Banner from "@/components/public/Banner.vue"
import Post from '@/components/post'
import Articlelist from "./common/index"
const postList = Articlelist
// const hideSlogan = ''
</script>
<template>
    <div class="Home">
        <Banner></Banner>   
        <div class="site-content">
        </div>
        <div class="site-content">
            <!--通知栏-->
            <!--文章列表-->
            <!-- {{ postList }} -->
            <main class="site-main" >
                <!-- <section-title v-if="!hideSlogan">推荐</section-title> -->
                <!-- {{postList}} -->
                <template v-for="item in postList">
                        <!-- <Post :post="item" :key="item.id"></Post> -->
                        <article class="post post-list">
                            <div class="post-entry">
                                <div class="feature">
                                    <!-- <router-link :to="`/article/${item.id}`">
                                        <img :src="item.banner"/>
                                    </router-link> -->
                                </div>
                                <h1 class="entry-title">
                                    <!-- <router-link :to="`/article/${item.id}`"><span v-if="item.isTop" style="color:#ff6d6d;font-weight:600">[置顶] </span>{{item.title}}</router-link> -->
                                </h1>
                                <div class="p-time">
                                    <i class="iconfont iconmeditor-time"></i> {{item.pubTime | parseTime}}<i v-if="item.isHot" class="iconfont iconfire" style="margin-left: 5px;color: #ff6d6d;"></i>
                                </div>
                                <p class="summary">{{item.summary}}</p>
                                <footer class="entry-footer">
                                    <div class="post-more">
                                        <!-- <router-link :to="`/article/${item.id}`"><i class="iconfont iconfish-li" style="font-size: 25px;"></i></router-link> -->
                                    </div>
                                    <!-- <div class="info-meta">
                                        <div class="comnum">
                                            <span>
                                                <i class="iconfont iconcomment"></i>
                                                <a href="https://zhebk.cn/Web/Akina.html">{{post.commentsCount}} 条评论</a>
                                            </span>
                                        </div>
                                        <div class="views">
                                            <span><i class="iconfont iconeyes"></i>{{post.viewsCount}} 热度</span>
                                        </div>
                                    </div> -->
                                </footer>
                            </div>
                            <hr/>
                        </article>
                </template>




            </main>
            <!--加载更多--> 
        </div>
    </div>
</template>
<style scoped lang="less">
.site-content {
    .notify {
        margin: 60px 0;
        border-radius: 3px;
        & > div {
            padding: 20px;
        }
    }
    .search-result {
        padding: 15px 20px;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        border: 1px dashed #ddd;
        color: #828282;
    }
}
.top-feature {
    width: 100%;
    height: auto;
    margin-top: 30px;

    .feature-content {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        position: relative;

        .feature-item {
            width: 32.9%;
        }
    }
}

.site-main {
    padding-top: 80px;

    &.search {
        padding-top: 0;
    }
}

.more{
    margin: 50px 0;
    .more-btn{
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ADADAD;
        border: 1px solid #ADADAD;
        border-radius: 20px;
        margin: 0 auto;
        cursor: pointer;
        &:hover{
            color: #8fd0cc;
            border: 1px dashed #8fd0cc;
        }
    }
}

/******/
@media (max-width: 800px) {
    .top-feature {
        display: none;
    }

    .site-main {
        padding-top: 40px;
    }

    .site-content {
        .notify {
            margin: 30px 0 0 0;
        }

        .search-result {
            margin-bottom: 20px;
            font-size: 16px;
        }
    }
}
/******/
</style>
