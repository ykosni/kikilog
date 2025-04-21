<script setup>
import Logout from './Logout.vue';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';


// authStore の currentUID をリアクティブに参照
const authStore = useAuthStore();
const { currentUID } = storeToRefs(authStore);
</script>

<template>
  <header class="flex justify-between items-center p-2">
    <RouterLink to="/">
      <h1 class="text-4xl font-black flex items-center gap-2 transition-transform duration-200 ease-out active:scale-95" style="color: #1ed760;">
        <Headphones class="w-9 h-9" :stroke-width="4" />聴きログ
      </h1>
    </RouterLink>

    <!-- ログインしている時だけを表示 -->
    <div v-if="currentUID" class="flex justify-between items-center p-2 gap-3">
      <RouterLink to="/">
        <House class="w-7 h-7 transition-transform duration-200 ease-out active:scale-95 hover:scale-110" :stroke-width="3" stroke="#1ed760" />
      </RouterLink>
      <RouterLink to="/new">
        <CirclePlus class="w-7 h-7 transition-transform duration-200 ease-out active:scale-95 hover:scale-110" :stroke-width="3" stroke="#1ed760"/>
      </RouterLink>
      <RouterLink to="/profile">
        <User class="w-7 h-7 transition-transform duration-200 ease-out active:scale-95 hover:scale-110" :stroke-width="3" stroke="#1ed760"/>
      </RouterLink>
      <Logout />
    </div>
  </header>
</template>

<style>
header {
  background-color: #121212;
}
</style>