
<script setup>
import { useRouter } from 'vue-router';
import Header from './components/Header.vue';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import NewPostPage from './pages/NewPostPage.vue';
import Logout from './components/Logout.vue';
import { ref, onMounted } from 'vue';
import FooterNav from './components/FooterNav.vue';


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

const showSplash = ref(true);
const fadeOut = ref(false);

onMounted(() => {
  // フェードアウト開始 → 完了まで待ってから消す
  setTimeout(() => {
    fadeOut.value = true
  }, 1500) // 表示後1.5秒でフェードアウト開始

  setTimeout(() => {
    showSplash.value = false
  }, 2500) // 表示後2.5秒で非表示（RouterView 表示）
});


</script>


<template>
  
  <div>
    <!-- スプラッシュ画面 -->
    <div
      v-if="showSplash"
      class="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000"
      :class="{ 'opacity-0': fadeOut }"
    >
      <h1 class="text-7xl flex items-center gap-5 font-black text-[#1ed760] animate-fade-in">
        <Headphones class="w-20 h-20" :stroke-width="4" />聴きログ
      </h1>
    </div>
    
    
      <!-- スプラッシュ画面後の本体 -->
    <div v-else class="bg-[#121212] text-[#e5e5e5] min-h-screen">
    
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
        <p class="p-2 gap-1 flex justify-end items-center text-right text-gray-400">
          <User class="w-5 h-5" :stroke-width="3" />
          {{ userName }}
        </p>
        <router-view />
        
        <!--スマホの場合のみフッター表示-->
        <FooterNav :currentUID="authStore.currentUID" />

        
        
      </div>
    </div>
  </div>
  
</template>


<style scoped>
</style>