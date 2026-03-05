<template>
  <template v-for="item in menuList" :key="item.path">
    <!--
      如果当前菜单是隐藏的（比如 Layout），
      不渲染自己，只递归渲染子菜单
    -->
    <template v-if="item.meta?.hidden">
      <Menu :menuList="item.children || []" />
    </template>

    <!-- 👇 下面才是正常显示的菜单逻辑 -->

    <!-- 1. 没有子菜单 → 普通菜单项 -->
    <el-menu-item
      :index="item.path"
      v-else-if="!item.children || item.children.length === 0"
      @click="goRoute"
    >
      <EpIcon :name="item.meta.icon" />
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item>

    <!-- 2. 有子菜单 → 统一渲染下拉（不管 1 个还是多个）✅ -->
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Menu',
})

import { useRouter } from 'vue-router'
defineProps(['menuList'])
const $router = useRouter()

const goRoute = (vc: { index: string }) => {
  $router.push(vc.index)
}
</script>
