<script setup>
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const logOut = () => {
  const confirmed = confirm('ログアウトしますか？');
  if (!confirmed) return;
  
  signOut(auth)
    .then(() => {
      // ログアウトに成功したときの処理
      alert('ログアウトしました');
      console.log('ログアウトしました');
    })
    .catch((error) => {
      // ログアウトに失敗したときの処理
      console.error('ログアウトエラー', error);
    });
};
</script>

<template>
  <div class="flex items-center">
    <button @click="logOut">
      <LogOut class="sm:w-10 sm:h-10 w-7 h-7 transition-transform duration-200 ease-out active:scale-95 hover:scale-110" :stroke-width="3" stroke="#1ed760" />
    </button>
  </div>
</template>

<style scoped>
</style>