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
  <header class="flex justify-between items-center px-4 py-2">
    <h1 class="text-3xl font-bold text-white">聴きログ</h1>

    <!-- ログインしている時だけを表示 -->
    <div v-if="currentUID">
      <RouterLink to="/" class="btn btn-neutral">　ホーム　</RouterLink>
      <RouterLink to="/new" class="btn btn-neutral">　新規投稿　</RouterLink>
      <RouterLink to="/profile" class="btn btn-neutral">　プロフィール　</RouterLink>
      <Logout />
    </div>
  </header>
</template>

<style>
header {
  background-color: #333;
  color: white;
}
</style>