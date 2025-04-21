
<script setup>
import { useRouter } from 'vue-router';
import Header from './components/Header.vue';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import NewPostPage from './pages/NewPostPage.vue';
import Logout from './components/Logout.vue';


import { useAuthStore } from './stores/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const authStore = useAuthStore();
const auth = getAuth();
const router = useRouter();

let userName = '';

// ログイン状態の変化を監視する
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('状態：ログイン中');
    authStore.currentUID = user.uid;
    userName = user.email;
    router.push('/');　//ログイン後は必ずタイムラインを表示させる
  } else {
    // ログインに失敗したときの処理
    console.log('状態：ログアウト');
    authStore.currentUID = "";
    userName = '';
  }
});

</script>


<template>
  
  <div class="bg-[#121212] text-[#e5e5e5] min-h-screen">
  
    <!--ログイン問わず表示する-->
    <Header />

    <!--未ログイン状態で表示、画面表示直後-->
    <div v-if="authStore.currentUID === null">
       <p class="text-center mt-10">ログイン状態を確認中...</p>
    </div>
    
    <!--未ログイン状態で表示-->
    <div v-else-if="authStore.currentUID === ''">
      <div>
        ログイン/会員登録 をしてください
        <LoginPage />
        <RegisterPage />
      </div>
      
      <div>
        <h2>会員登録をして、あなたも聴きログを残そう！</h2>
      </div>
    </div>

    <!--ログイン済で表示    -->
    <div v-else>
      <p class="p-2 gap-1 flex justify-end items-center text-right">
        <User class="w-5 h-5" :stroke-width="3" />
        {{ userName }}
      </p>
      <router-view />
    </div>
  
  </div>
  
</template>


<style scoped>
</style>