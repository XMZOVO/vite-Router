<script setup>
</script>

<template>
  <div class="shadow-sm h-20 flex justify-between font-bold px-10 md:px-32 2xl:px-80">
    <div class="flex space-x-12">
      <div class="flex items-center">
        <router-link to="/">
          <img class="rounded h-8 w-8" src="/zhouzhou.jpeg" />
        </router-link>
      </div>
      <!-- nav bar -->
      <div class="items-center space-x-24 hidden md:flex">
        <nav>
          <router-link to="/" class="text-main-active">主页</router-link>
        </nav>
        <nav>
          <router-link to="/webG4" class="text-main-unactive">WebG4</router-link>
        </nav>
        <!-- <nav>
          <router-link to="/blender" class="text-main-unactive">Blender</router-link>
        </nav> -->
        <nav class=" hidden xl:block ">
          <router-link to="/detector" class="text-main-unactive">Detector</router-link>
        </nav>
        <nav class=" hidden lg:block ">
          <router-link to="/babylon" class="text-main-unactive">BabylonJs</router-link>
        </nav>
        <!-- <nav>
            <router-link to="/" class="text-main-unactive">焼鳥</router-link>
          </nav>
          <nav>
            <router-link to="/" class="text-main-unactive">ボート</router-link>
          </nav>
          <nav>
            <router-link to="/" class="text-main-unactive">歌ります</router-link>
        </nav>-->
      </div>
    </div>

    <!-- nav bar left -->
    <div class="flex items-center">
      <button
        class="transition duration-400 ease-in-out flex items-center space-x-1 border rounded-md p-2 text-sm text-main-unactive hover:border-main-active hover:text-main-active">
        <i class="ph-lightning-bold"></i>
        <span @click="elHandle" class="font-bold px-2">The fallen leaves tell a story</span>
      </button>
    </div>
  </div>

  <div class="pb-10 px-10 md:px-32 2xl:px-80">
    <router-view></router-view>
  </div>

  <!-- <div>
    <header class="header">
      <div class="header-content responsive-wrapper">
        <div class="header-logo">
          <a href="#">
            <div>
              <img class="heardIcon" src="../public/zhouzhou.jpeg" />
            </div>
          </a>
        </div>
        <div class="header-navigation">
          <nav class="header-navigation-links">
            <router-link to="/">主页</router-link>
          </nav>
          <nav class="header-navigation-links">
            <router-link to="/">奴页</router-link>
          </nav>
          <nav class="header-navigation-links">
            <router-link to="/">龟男页</router-link>
          </nav>
          <nav class="header-navigation-links">
            <router-link to="/">一千零一页</router-link>
          </nav>
          <nav class="header-navigation-links">
            <router-link to="/">好耶</router-link>
          </nav>
          <div class="header-navigation-actions">
            <button class="button" @click="elHandle">
              <i class="ph-lightning-bold"></i>
              <span>什么时候能玩到老头环</span>
            </button>
            <a href="#" class="icon-button">
              <i class="ph-gear-bold"></i>
            </a>
            <a href="#" class="icon-button">
              <i class="ph-bell-bold"></i>
            </a>
          </div>
        </div>
        <a href="#" class="button">
          <i class="ph-list-bold"></i>
          <span>菜单</span>
        </a>
      </div>
    </header>
    
    <main>
      <router-view />
    </main>
  </div>-->
</template>

<script setup lang="ts">

function elHandle() {
  window.open('https://store.steampowered.com/app/1245620/_/');
}
</script>

