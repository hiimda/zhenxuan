import { createApp } from 'vue'
import App from './App.vue'

// 样式相关：重置样式、Element Plus 样式、SVG 图标注册
import 'virtual:svg-icons-register'
import '@/assets/styles/reset.scss'
import 'element-plus/dist/index.css'

// 状态管理：Pinia 及持久化插件
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 全局注册：自定义组件插件、Element Plus 所有图标
import globalComponentPlugin from '@/components/global/index'

// 路由
import router from '@/routers'

// 创建并配置 Pinia 实例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 创建 Vue 应用实例
const app = createApp(App)

// 注册全局插件/资源
app.use(globalComponentPlugin) // 自定义全局组件
app.use(router) // 路由
app.use(pinia) // 状态管理

// 挂载应用
app.mount('#app')
