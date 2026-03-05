<template>
  <div class="logo">
    <img :src="settings.logo" />
    <p>{{ settings.name }}</p>
  </div>
</template>
<script setup lang="ts">
let settings = {
  name: '张绍炟平台',
  logo: '../../public/logo.png',
}
</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;

  img {
    width: $base-logo-height;
    height: $base-logo-height;
    margin-right: 10px;
  }

  p {
    font-size: 26px;
    color: #fff;
    font-weight: bold;
  }
}
</style>
