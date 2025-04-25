<script setup>
import Logout from './Logout.vue';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import NavLinks from './NavLinks.vue';


// authStore の currentUID をリアクティブに参照
const authStore = useAuthStore();
const { currentUID } = storeToRefs(authStore);
</script>

<template>
  <header class="flex sm:justify-between justify-center items-center p-2">
    <RouterLink to="/">
      <img
        src="/images/kikilog_top.png"
        alt="聴きログ"
        class="sm:h-[150px] h-[100px] transition-transform duration-200 ease-out active:scale-95"
      />
    </RouterLink>


    <!-- ログインしている時だけを表示 -->
    <div v-if="currentUID" class="flex justify-between items-center hidden sm:flex">
      <NavLinks />
    </div>
  </header>
</template>

<style>
header {
  background-color: #121212;
}
</style>