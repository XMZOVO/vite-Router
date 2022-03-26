<script setup>
import ButtonRepo from '@/components/ButtonRepo.vue'
</script>

<template>
  <div
    class=" h-30 mt-10 mx-auto items-center sm:flex sm:justify-between space-y-3 sm:space-y-0"
  >
    <div class="flex">
      <p class=" text-3xl font-bold">主页</p>
    </div>

    <div class="transition duration-400 ease-in-out flex border rounded-md p-1 hover:border-main-active">
      <button class="items-center flex">
        <i
          class="ph-magnifying-glass-bold text-main-unactive placeholder-main-unactive hover:border-main-active hover:placeholder-main-active"
        ></i>
      </button>
      <input class="focus:outline-none focus:ring-blue-600 px-3 py-1" placeholder="搜索歌姬吧" />
    </div>
  </div>

  <div class="flex mx-auto mt-10 space-x-2 pb-8 border-b border-gray-200">
    <a href="#" class="border-b-2 border-main-active font-bold text-main-active pb-2 px-1">工具</a>
    <a href="#" class="pb-2 px-1 hover:font-bold hover:text-main-active">全体目光</a>
    <a href="#" class="pb-2 px-1 hover:font-bold hover:text-main-active">向我看齐</a>
    <a href="#" class="pb-2 px-1 hover:font-bold hover:text-main-active">看我看我</a>
  </div>

  <router-view></router-view>

  <!-- <main class="main">
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
  </main>-->
</template>
