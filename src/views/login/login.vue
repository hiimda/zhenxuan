<template>
  <h1>
    <div class="login-container">
      <el-row>
        <el-col :span="12" :xs="0"> </el-col>
        <el-col :span="12" :xs="24">
          <el-form class="login-form" :model="LoginForm" :rules="loginRules" ref="loginFormRef">
            <h1>Hello!</h1>
            <h2>欢迎登录</h2>
            <el-form-item label="用户名" :label-width="'80px'" prop="username">
              <el-input
                :prefix-icon="User"
                v-model="LoginForm.username"
                placeholder="请输入用户名"
                @input="LoginForm.username = LoginForm.username.replace(/\s/g, '')"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="'80px'" prop="password">
              <el-input
                :prefix-icon="Lock"
                show-password
                v-model="LoginForm.password"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="margin-left: 80px; width: calc(100% - 80px)"
                @click="handleLoginDebounce"
                :loading="loading"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </h1>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref, useTemplateRef } from 'vue'
import { reqLogin } from '@/api/user/index'
import { useUserStore } from '@/stores/user'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { getTimeOfDay } from '@/utils/time'
import { debounce } from '@/utils/debounce'

const loading = ref(false)
const router = useRouter()
const userStore = useUserStore()

const LoginForm = reactive({
  username: 'admin',
  password: '11111',
})

const loginFormRef = useTemplateRef<HTMLFormElement>('loginFormRef')

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名长度为 5-10 位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少 6 位', trigger: 'blur' },
    {
      // 自定义验证规则，要求密码必须包含数字
      validator(rule: any, value: string) {
        if (!/\d/.test(value)) {
          return new Error('密码必须包含数字')
        }
      },
      trigger: 'blur',
    },
  ],
}

const handleLogin = async () => {
  // 先进行表单验证，如果验证失败则直接返回，不执行登录逻辑
  try {
    await loginFormRef.value!.validate()
  } catch (error) {
    console.error('表单校验失败:', error)
    ElNotification({
      title: '登录失败',
      message: '请检查输入的用户名和密码是否规范',
      type: 'error',
    })
    return
  }

  // 设置加载状态为true，表示正在登录
  loading.value = true

  try {
    const res = await reqLogin(LoginForm)
    console.log('已发请求')

    if (res.code === 200) {
      // 登录成功

      // 写入日志并显示成功通知
      console.log('登录成功:', res.data)
      ElNotification({
        title: `${getTimeOfDay()}好`,
        message: '欢迎来到首页',
        type: 'success',
      })
      // 登录成功后，跳转到首页
      router.push('/layout')
      // 存储用户信息和token
      userStore.setToken(res.data.token)
      userStore.setUserInfo(LoginForm)
    } else {
      // 登录失败

      // 写入日志并显示错误通知
      console.error('登录失败:', res.data.message)
      ElNotification({
        title: '登录失败',
        message: res.data.message || '登录失败，请检查用户名和密码',
        type: 'error',
      })
    }
  } catch (error) {
    // 请求失败，显示错误通知
    console.error('登录请求失败:', error)
    ElNotification({
      title: '登录失败',
      message: '网络异常，请稍后再试',
      type: 'error',
    })
  } finally {
    // 无论登录成功还是失败，都将加载状态设置为false
    loading.value = false
  }
}
// 使用防抖函数包装登录处理函数，避免短时间内多次点击登录按钮，导致重复请求
const handleLoginDebounce = debounce(handleLogin, 500)
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat center center;
  background-size: cover;

  .login-form {
    padding: 40px;
    position: relative;
    width: 75%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat center center;
    background-size: cover;
    border-radius: 15px 15px 0 0;
    h1,
    h2 {
      color: #fff;
      text-align: left;
    }
    h1 {
      font-size: 50px;
      margin: 0;
      font-family: 'Arial Black', Gadget, sans-serif;
    }
    h2 {
      font-size: 20px;
      margin: 20px auto;
    }
    :deep(.el-form-item__label) {
      color: #fff;
    }
  }
}
</style>
