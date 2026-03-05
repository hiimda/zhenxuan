import type { App, DefineComponent, Plugin } from 'vue' // 新增 Plugin 类型

// 1. 自动化导入global目录下的所有.vue组件
// 🔥 关键：明确模块类型，解决「对象可能为未定义」
const autoImportComponents = import.meta.glob<{
  default: DefineComponent<{}, {}, any> // 补全 DefineComponent 泛型
}>('./global/**/*.vue', {
  eager: true,
})

// 2. 合并组件（核心：严格类型定义）
const allGlobalComponent: Record<string, DefineComponent<{}, {}, any>> = {}

// 3. 自动化注册部分（完善类型判空）
for (const filePath in autoImportComponents) {
  try {
    const module = autoImportComponents[filePath]
    if (!module || !module.default) {
      console.warn(`跳过无效组件文件：${filePath}（组件未定义）`)
      continue
    }

    const component = module.default
    // 🔥 优先取组件的 name，兜底用文件名（处理 TS 空值）
    const fileName = filePath.split('/').pop()?.replace('.vue', '')
    const componentName = component.name || fileName
    if (!componentName) {
      console.warn(`跳过无效组件文件：${filePath}（无组件名）`)
      continue
    }

    allGlobalComponent[componentName] = component
    console.log(`自动注册全局组件：${componentName}（来自：${filePath}）`)
  } catch (error) {
    console.error(`注册组件失败：${filePath}`, error)
  }
}

// 4. 暴露标准 Vue 插件（🔥 核心修复：符合 Plugin 类型）
const globalComponentPlugin: Plugin = {
  install(app: App) {
    Object.entries(allGlobalComponent).forEach(([name, comp]) => {
      app.component(name, comp)
    })
  },
}

// 导出标准插件对象（替代原来的默认导出）
export default globalComponentPlugin
