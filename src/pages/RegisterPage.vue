<script setup>
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const router = useRouter();
const auth = getAuth();
function register() {
 createUserWithEmailAndPassword(auth, email.value, password.value)
   .then((userCredential) => {
     console.log(auth.currentUser);
     router.push('/');
   })
   .catch((error) => {
      console.error("登録エラー", error);
   });
}
</script>

<template>
  <div class="bg-[#121212] text-[#e5e5e5] flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-[#1e1e1e] p-8 rounded-2xl shadow-lg">
      <UserRoundPlus class="w-full text-center w-20 h-20 p-3" :stroke-width="3" stroke="#1ed760" />
      <h2 class="text-4xl font-black text-center mb-6 text-[#1ed760]">新規登録</h2>

      <form @submit.prevent="register" class="space-y-6">
        <div>
          <label class="block mb-1 font-semibold text-sm" for="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
          />
        </div>

        <div>
          <label class="block mb-1 font-semibold text-sm" for="password">パスワード</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#1ed760] text-black font-bold py-2 rounded-xl hover:opacity-90 transition"
        >
          登録
        </button>
      </form>
    </div>
  </div>
</template>
