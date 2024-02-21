<template>
  <div class="header-wrap">
    <div class="content">
      <div class="logo">
        <div class="logo-item" v-for="(item, index) in names" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const names = ref("大师起名");
</script>

<style scoped lang="scss">
.header-wrap {
  height: 60px;
  background-color: #ef4230;
  .content {
    max-width: 1000px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    .logo {
      display: inline-flex;
      align-items: center;
      .logo-item {
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        font-weight: bold;
        color: #fff;
        border: 1px solid #fff;
        &.logo-item {
          margin-left: 6px;
        }
      }

    }
  }
}
</style>
