<template>
  <el-icon :size="size" :color="color">
    <component :is="iconComponent" />
  </el-icon>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// 全引入（看你需求）
import * as icons from '@element-plus/icons-vue'

interface Props {
  name: keyof typeof icons
  size?: string | number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '',
  color: '',
})

const iconComponent = computed(() => icons[props.name])
</script>
