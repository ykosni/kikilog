import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const currentUID = ref(null);
  const isPosting = ref(false);
  
  return {
    currentUID,
    isPosting
  };
});