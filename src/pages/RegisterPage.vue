<script setup>
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const auth = getAuth();
const confirmPassword = ref('');

const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const submitError = ref('');

const validateEmail = () => {
  const emailRegex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!email.value) {
    emailError.value = 'メールアドレスを入力してください';
    return false;
  } else if (!emailRegex.test(email.value)) {
    emailError.value = '有効なメールアドレスを入力してください';
    return false;
  } else {
    emailError.value = '';
    return true;
  }
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'パスワードを入力してください';
    return false;
  } else if (password.value.length < 6) {
    passwordError.value = 'パスワードは６文字以上で入力してください';
    return false;
  } else {
    passwordError.value = '';
    return true;
  }
};

const validateConfirmPassword = () => {
  if (!confirmPassword.value) {
  confirmPasswordError.value = '確認用パスワードを入力してください';
  return false;
  } else if (password.value !== confirmPassword.value) {
  confirmPasswordError.value = 'パスワードが一致しません';
  return false;
  }
  else {
  confirmPasswordError.value = '';
  return true;
  }
};

//フォーム送信前に行う、上３つのバリデーションがOKならtrueを返す
//フォームの中が書き換わるたびに自動でチェックする
//
const isFormValid = computed ( () => {
  return validateEmail() && validatePassword() && validateConfirmPassword();
});

//Firebaseエラーを日本語にする
const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'このメールアドレスは既に使用されています';
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません';
    case 'auth/weak-password':
      return 'パスワードが弱すぎます。6文字以上のパスワードを設定してください';
    default:
      return '登録中にエラーが発生しました';
  }
};

//登録の処理
const register = () => {
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  
  //３つのバリデーションがtrueなら、登録処理を進める
  if (isFormValid.value) {
    submitError.value = '';
    
    createUserWithEmailAndPassword(auth, email.value, password.value)
     .then((userCredential) => {
       console.log(auth.currentUser);
       alert('ユーザー登録が完了しました');
       router.push('/');
     })
     .catch((error) => {
        console.error("登録エラー", error);
        submitError.value = getFirebaseErrorMessage(error.code);
     });
  }
};

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
            @blur="validateEmail"
            class="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
          />
          <p v-if="emailError" class="text-red-500 text-sm m-1">{{ emailError }}</p>
        </div>

        <div>
          <label class="block mb-1 font-semibold text-sm" for="password">パスワード</label>
          <input
            id="password"
            type="password"
            v-model="password"
            @blur="validatePassword"
            class="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
          />
          <p v-if="passwordError" class="text-red-500 text-sm m-1">{{ passwordError }}</p>
        </div>
        
        <div>
          <label class="block mb-1 font-semibold text-sm" for="password">パスワード（確認）</label>
          <input
            id="cofirmPassword"
            type="password"
            v-model="confirmPassword"
            @blur="validateConfirmPassword"
            class="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
          />
          <p v-if="confirmPasswordError" class="text-red-500 text-sm m-1">{{ confirmPasswordError }}</p>
        </div>        
        
        <p v-if="submitError" class="text-red-500 text-sm text-center">{{ submitError }}</p>

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
