<script setup>
import { storeToRefs } from 'pinia';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue'

const authStore = useAuthStore();
const auth = getAuth();
const usermail = ref('');
const userpass = ref('');
const errorMessage = ref('');
const { isPosting } = storeToRefs(authStore);

const onSubmitLogIn = () => {
  isPosting.value = true;
  
  // ログインの実行
  signInWithEmailAndPassword(auth, usermail.value, userpass.value)
    .then((userCredential) => {
      // ログインに成功したときの処理
      const user = userCredential.user;
      console.log("ログインしました", user);
      errorMessage.value = "";
      usermail.value = "";
      userpass.value = "";
      isPosting.value = false;
    })
    .catch((error) => {
      // ログインに失敗したときの処理
      errorMessage.value = "ログインに失敗しました";
      isPosting.value = false;
    });
};



</script>

<template>
  <div class="bg-[#121212] text-[#e5e5e5] flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-[#1e1e1e] p-8 rounded-2xl shadow-lg">
      <LogIn class="w-full text-center w-20 h-20 p-3" :stroke-width="3" stroke="#1ed760" />
      <h2 class="text-4xl font-black text-center mb-6 text-[#1ed760]">ログイン</h2>

      <div v-if="errorMessage !== ''" class="bg-red-500 text-white p-3 rounded-md mb-4 text-sm">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="onSubmitLogIn" class="space-y-6">
        <div>
          <label class="block mb-1 font-semibold text-sm" for="usermail">メールアドレス</label>
          <input
            id="usermail"
            type="email"
            class="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
            v-model="usermail"
          />
        </div>

        <div>
          <label class="block mb-1 font-semibold text-sm" for="userpass">パスワード</label>
          <input
            id="userpass"
            type="password"
            class="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
            v-model="userpass"
          />
        </div>

        <button
          type="submit"
          :disabled="isPosting"
          class="w-full bg-[#1ed760] text-black font-bold py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          ログイン
        </button>
      </form>
    </div>
  </div>
</template>

