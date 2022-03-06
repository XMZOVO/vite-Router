<script setup>
</script>

<template>
  <div class="w-ful bg-white border-b">
    <div class="w-3/4 mx-auto h-20 flex items-center justify-between font-bold">
      <div class="flex space-x-12">
        <div class="flex items-center">
          <img class="rounded h-8 w-8" src="../public/zhouzhou.jpeg" />
        </div>
        <!-- nav bar -->
        <div class="items-center space-x-24 hidden xl:flex">
          <nav>
            <router-link to="/" class="text-main-active">主页</router-link>
          </nav>
          <nav>
            <router-link to="/" class="text-main-unactive">主日</router-link>
          </nav>
          <nav>
            <router-link to="/" class="text-main-unactive">焼鳥</router-link>
          </nav>
          <nav>
            <router-link to="/" class="text-main-unactive">ボート</router-link>
          </nav>
          <nav>
            <router-link to="/" class="text-main-unactive">歌ります</router-link>
          </nav>
        </div>
      </div>

      <!-- nav bar left -->
      <div class="flex items-center space-x-6">
        <button
          class="transition duration-400 ease-in-out flex items-center space-x-1 border-2 rounded-md p-2 text-sm text-main-unactive hover:border-main-active hover:text-main-active"
        >
          <i class="ph-lightning-bold"></i>
          <span class="font-bold px-3">Falls tell us story</span>
        </button>

        <div class="md:flex items-center space-x-6 hidden">
          <a href="#" class="icon-button">
            <i class="ph-gear-bold text-lg text-main-unactive hover:text-main-active"></i>
          </a>
          <a href="#" class="icon-button text-lg text-main-unactive hover:text-main-active">
            <i class="ph-bell-bold"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <router-view></router-view>

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

<script setup>

function elHandle() {
  window.open('https://store.steampowered.com/app/1245620/_/');
}
</script>

