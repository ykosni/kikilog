<template>

  <footer v-if="currentUID" class="sm:hidden fixed bottom-0 left-0 w-full bg-[#121212] p-3 flex justify-around border-t border-gray-700">
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
  </footer>
  
</template>

<script setup>
  
import Logout from './Logout.vue';
  
defineProps({
  currentUID: String,
});
</script>

