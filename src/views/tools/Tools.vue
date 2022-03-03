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
    </div> -->
    <div class="content">
        <div class="content-panel">
            <div class="vertical-tabs">
                <router-link to="/" class="active">全部</router-link>
            </div>
        </div>

        <div class="content-main">
            <router-view></router-view>
        </div>
    </div>
</template>