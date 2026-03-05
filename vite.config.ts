import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      // mock 配置
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', // 开发启用
        prodEnabled: false,
        supportTs: true,
      }),

      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: 'src/auto-imports.d.ts', // 生成类型声明，TS 项目必配
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: 'src/components.d.ts', // 生成组件类型声明，TS 项目必配
      }),

      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
        symbolId: 'icon-[name]',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
