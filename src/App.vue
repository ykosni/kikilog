
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
      class="fixed inset-0 z-50 bg-[#121212] flex items-center justify-center transition-opacity duration-1000"
      :class="{ 'opacity-0': fadeOut }"
    >
      <h1 class="flex items-center animate-fade-in">
        <img
        src="/images/kikilog_splash.png"
        alt="聴きログ"
        class="sm:h-[300px] h-[200px]"
      />
        
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
        <p class="font-black text-center text-2xl p-10">
          会員登録をして、あなたも聴きログを残そう！
        </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-10">
            <div class="w-full sm:w-1/2 max-w-md"> <LoginPage /> </div>
            <div class="w-full sm:w-1/2 max-w-md"> <RegisterPage /> </div>
          </div>
      </div>
  
      <!--ログイン済で表示    -->
      <div v-else>
        <div class="flex justify-between items-center px-4 py-2 text-gray-400">
          <RouterLink to="/whatsnew" class="bg-[#1ed760] text-black text-sm font-semibold px-4 py-1 rounded-full shadow-md transition-transform duration-200 ease-out active:scale-95 hover:scale-105">更新情報</RouterLink>
          
          <div class="flex items-center gap-1">
            <User class="w-5 h-5" :stroke-width="3" />
            <p>{{ userName }}</p>
          </div>
        </div>

        
        <router-view />
        
        <!--スマホの場合のみフッター表示-->
        <FooterNav :currentUID="authStore.currentUID" />

      </div>
    </div>
  </div>
  
</template>


<style scoped>
</style>