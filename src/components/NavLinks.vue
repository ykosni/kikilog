<template>
  
  <div class="flex justify-between items-center p-2 gap-3">
      <RouterLink to="/">
        <House class="w-10 h-10 transition-transform duration-200 ease-out active:scale-95 hover:scale-110" :stroke-width="3" stroke="#1ed760" />
      </RouterLink>
      <RouterLink to="/new">
        <CirclePlus class="w-10 h-10 transition-transform duration-200 ease-out active:scale-95 hover:scale-110" :stroke-width="3" stroke="#1ed760"/>
      </RouterLink>
      <RouterLink to="/profile">
        <User class="w-10 h-10 transition-transform duration-200 ease-out active:scale-95 hover:scale-110" :stroke-width="3" stroke="#1ed760"/>
      </RouterLink>
      <RouterLink to="/about">
        <CircleHelp class="w-10 h-10 transition-transform duration-200 ease-out active:scale-95 hover:scale-110" :stroke-width="3" stroke="#1ed760"/>
      </RouterLink>
      <Logout />
    </div>
  
</template>

<script setup>
  import Logout from './Logout.vue';
</script>