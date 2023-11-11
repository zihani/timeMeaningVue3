import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {create} from '@/utils/created'
import App from './App.vue'
// import App2 from './App2.vue'
import router from './router'
create()
//createApp 根组件选择
const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app') // 挂载到#app
// app.mount('#app2') // 可以创建多个挂在点

