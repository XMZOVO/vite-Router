<template>
    <!-- <div class="content-header">
        <div class="content-header-intro">
            <h2>Intergrations and connected apps</h2>
            <p>Supercharge your workflow and connect the tool you use every day.</p>
        </div>
        <div class="content-header-actions">
            <a href="#" class="button">
                <i class="ph-faders-bold"></i>
                <span>Filters</span>
            </a>
            <a href="#" class="button">
                <i class="ph-plus-bold"></i>
                <span>Request integration</span>
            </a>
        </div>
    </div>-->

    <div class="flex mx-auto items-start pt-8">
        <div class="h-screen hidden sm:block max-w-sm sm:w-1/4 md:w-1/5 space-y-5 mr-10">
            <div
                class="bg-main-slideBar text-main-active text-left rounded-md w-full pl-4 py-3 font-bold"
            >
                <router-link to="/">全部</router-link>
            </div>
            <button class="text-left rounded-md w-full pl-4 py-3 font-bold">ぜんぶ</button>
        </div>

        <div class="w-full">
            <router-view v-slot="{ Component }">
                <transition>
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>

    <!-- <div class="content">
        <div class="content-panel">
            <div class="vertical-tabs">
                <router-link to="/" class="active">全部</router-link>
            </div>
        </div>

        <div class="content-main">
            <router-view></router-view>
        </div>
    </div>-->
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>