import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
          path: '/articlelist',
          name: 'articlelist',
          component: () => import("@/views/ArticleList/index.vue"),
          meta: { title: '笔记'}
      },
      {
          path: '/article/:id',
          name: 'article',
          component: () => import("@/views/Articles/index.vue"),
          meta: { 
            keepAlive: false, //需要缓存  
          }
      },
      {
        path: "/gallery",
        name: "gallery",
        component: () => import("@/views/Gallery/index.vue"),
        meta: {
          keepAlive: false, //需要缓存
        },
      }
    ]
})

export default router
