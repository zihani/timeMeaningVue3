import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      }
      // {
      //   path: "/gallery",
      //   name: "archive",
      //   component: () => import("@/view/Gallery/index.vue"),
      //   meta: {
      //     keepAlive: false, //需要缓存
      //   },
      // }
    ]
})

export default router
