<script setup>
import ButtonRepo from '@/components/ButtonRepo.vue'
</script>

<template>
  <main class="main">
    <div class="responsive-wrapper">
      <div class="main-header">
        <h1>主页</h1>
        <div class="search">
          <input type="text" placeholder="搜索" />
          <button type="submit">
            <i class="ph-magnifying-glass-bold"></i>
          </button>
        </div>
      </div>
      <div class="horizontal-tabs">
        <a href="#" class="active">工具</a>
        <a href="#">占位</a>
        <a href="#">占位</a>
        <a href="#">占位</a>
      </div>
    <router-view></router-view>
    </div>
  </main>
</template>
