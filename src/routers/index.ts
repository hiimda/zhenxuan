// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

// 定义路由元信息类型
export interface RouteMeta {
  title?: string // 菜单标题
  icon?: string // 菜单图标
  hidden?: boolean // 是否隐藏菜单
}
// 扩展 RouteRecordRaw，添加自定义 meta 类型

// 定义路由规则

//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const routes = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    //登录成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: true,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/loginScuessed/home/home.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: 'screen',
        component: () => import('@/views/loginScuessed/screen/screen.vue'),
        name: 'Screen',
        meta: {
          hidden: false,
          title: '数据大屏',
          icon: 'Platform',
        },
      },
    ],
  },
  {
    //404
    path: '/404',
    component: () => import('@/views/404/404.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
]

// 创建路由器实例
const router = createRouter({
  history: createWebHashHistory(), // 采用hash模式（带#）
  routes, // 传入路由规则
})

// 暴露路由器实例
export default router
