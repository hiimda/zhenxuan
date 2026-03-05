import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { UserForm } from '@/api/user/type'
import { routes } from '@/routers/index' // 导入路由配置
import type { RouteRecordRaw } from 'vue-router'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('')
    const userInfo = ref<UserForm | null>(null)
    const menuList = reactive<RouteRecordRaw[]>(routes)
    // 只负责存
    const setToken = (val: any) => {
      token.value = val
    }
    const setUserInfo = (info: UserForm) => {
      userInfo.value = info
    }
    const clearUser = () => {
      token.value = ''
      userInfo.value = null
    }

    return { menuList, token, userInfo, setToken, setUserInfo, clearUser }
  },
  // 开启持久化
  //写法一：所有的自定义变量都持久化
  { persist: true },
  //写法二：只持久化token
  // { persist: { paths: ['token'] } },
)
