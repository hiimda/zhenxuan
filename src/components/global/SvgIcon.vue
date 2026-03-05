<template>
  <svg class="icon" aria-hidden="true">
    <use :href="`#icon-${props.name}`" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string }>()
</script>

<!-- <style scoped>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style> -->
