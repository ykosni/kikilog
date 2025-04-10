
<template>
 <h2>会員登録</h2>
 <p>メールアドレス<input type="text" v-model="email" /></p>
 <p>パスワード<input type="password" v-model="password" /></p>
 <p><button @click="register" >登録</button></p>
</template>


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

<style scoped></style>