import { createApp } from 'vue'
import './tailwind.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(ElementPlus)
app.use(router)
app.mount('#app')
