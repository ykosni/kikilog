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
  <div>
    <h2>ログイン</h2>
    <div v-if="errorMessage !== ''">
        <div>
            {{ errorMessage }}
        </div>
    </div>
    <form
      @submit.prevent="onSubmitLogIn"
    >
      <div>
        <label class="label" for="usermail">
          <span class="label-text text-lg">メールアドレス</span>
        </label>
        <input
          id="usermail"
          type="email"
          placeholder=""
          class="input input-bordered w-full"
          v-model="usermail"
        />
      </div>
      <div>
        <label class="label" for="userpass">
          <span class="label-text text-lg">パスワード</span>
        </label>
        <input
          id="userpass"
          type="password"
          placeholder=""
          class="input input-bordered w-full"
          v-model="userpass"
        />
      </div>
      <button
        type="submit"
        :disabled="isPosting"
      >
        ログイン
      </button>
    </form>
  </div>
</template>

<style scoped>
</style>

