<script setup>
import ButtonRepo from '@/components/ButtonRepo.vue'
</script>

<template>
  <main class="main">
    <div class="responsive-wrapper">
      <div class="main-header">
        <h1>主页</h1>
        <div class="search">
          <input type="text" placeholder="搜歌姬吧" />
          <button type="submit">
            <i class="ph-magnifying-glass-bold"></i>
          </button>
        </div>
      </div>
      <div class="horizontal-tabs">
        <a href="#" class="active">工具</a>
        <a href="#">阿苇</a>
        <a href="#">胖铁</a>
        <a href="#">歌姬</a>
      </div>
    <router-view></router-view>
    </div>
  </main>
</template>
