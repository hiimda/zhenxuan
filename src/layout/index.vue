<template>
  <el-container class="layout_container">
    <el-aside class="layout_slider">
      <logo />
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="slider-scrollbar">
        <!-- 菜单组件 -->
        <!-- style="height: 1000px"是为了测试滚动条的效果，实际开发中可以根据菜单项的数量来决定是否需要滚动条 -->
        <el-menu
          background-color="transparent"
          text-color="white"
          style="height: 1000px"
          :default-active="route.fullPath"
        >
          <Menu :menuList="userStore.menuList" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container class="layout_right_container">
      <el-header class="layout_tabbar">Header</el-header>
      <el-main class="layout_main">
        <el-scrollbar class="main-scrollbar">
          <mainRouterView />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import mainRouterView from './mainRouter-view.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import logo from './logo.vue' // 导入logo组件
import Menu from '@/layout/menu.vue' // 导入菜单组件

// 路由实例
const route = useRoute()
// 用户仓库
const userStore = useUserStore()
</script>
<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    background-color: $base-menu-bg-color;
    width: $base-menu-width;
    height: 100vh;
    overflow: hidden; //隐藏自带滚动条，滚动条的样式通过el-scrollbar组件来控制

    .slider-scrollbar {
      width: 100%;
      height: calc(
        100vh - $base-logo-height - 20px
      ); // 减去logo的高度以及padding，这样滚动条就不会覆盖logo了

      :deep(.el-scrollbar) {
        --el-scrollbar-opacity: 1 !important;
      }
      // 滚动条外层容器
      :deep(.el-scrollbar__wrap) {
        overflow-x: hidden; // 隐藏横向滚动条
      }

      // 滚动条轨道（背景）
      :deep(.el-scrollbar__track) {
        background-color: $scrollbar-track-bg-color;
        border-radius: 8px;
      }

      // 垂直滚动条
      :deep(.el-scrollbar__bar.is-vertical) {
        width: 8px; // 滚动条宽度
        right: 2px; // 距离右侧距离
        // 滚动条滑块
        .el-scrollbar__thumb {
          background-color: $scrollbar-thumb-bg-color;
          border-radius: 8px;
          transition: background-color 0.2s; // 过渡效果
        }
        //&的意思是指向当前选择器，即.el-scrollbar__bar.is-vertical .el-scrollbar__thumb
        &:hover {
          background-color: $hover-scrollbar-bg-color; // 滑块悬停颜色
        }
      }
    }
  }
  .layout_right_container {
    height: 100vh; // 右侧容器占满剩余高度，这样是方便确定main的高度，从而使滚动条生效

    .layout_tabbar {
      background-color: $base-tabbar-bg-color;
      height: $base-tabbar-height;
    }
    .layout_main {
      padding: 40px 0 40px 40px;
      background-color: $base-main-bg-color;
      left: $base-menu-width;
      top: $base-tabbar-height;

      .main-scrollbar {
        width: 100%;
        height: 100%;

        // 滚动条外层容器
        :deep(.el-scrollbar__wrap) {
          overflow-x: hidden; // 隐藏横向滚动条
        }

        // 滚动条轨道（背景）
        :deep(.el-scrollbar__track) {
          background-color: $scrollbar-track-bg-color;
          border-radius: 8px;
        }

        // 垂直滚动条
        :deep(.el-scrollbar__bar.is-vertical) {
          width: 8px; // 滚动条宽度
          right: 2px; // 距离右侧距离
          // 滚动条滑块
          .el-scrollbar__thumb {
            background-color: $scrollbar-thumb-bg-color;
            border-radius: 8px;
            transition: background-color 0.2s; // 过渡效果
          }
          //&的意思是指向当前选择器，即.el-scrollbar__bar.is-vertical .el-scrollbar__thumb
          &:hover {
            background-color: $hover-scrollbar-bg-color; // 滑块悬停颜色
          }
        }
      }

      p {
        font-size: 50px;
      }
    }
  }
}
</style>
