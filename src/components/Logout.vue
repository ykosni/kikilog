<script setup>
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const logOut = () => {
  signOut(auth)
    .then(() => {
      // ログアウトに成功したときの処理
      console.log('ログアウトしました');
    })
    .catch((error) => {
      // ログアウトに失敗したときの処理
      console.error('ログアウトエラー', error);
    });
};
</script>

<template>
  <div>
    <button class="btn btn-neutral" @click="logOut">ログアウト</button>
  </div>
</template>

<style scoped>
</style>