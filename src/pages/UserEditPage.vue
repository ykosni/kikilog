<script setup>
import { ref } from 'vue';
import { getAuth, updateProfile } from 'firebase/auth';
import { useRouter } from 'vue-router';

const auth = getAuth();
const router = useRouter();

const newUserName = ref(auth.currentUser?.displayName || '');
const updateSuccess = ref(false);
const usernameError = ref('');

const validateUserName = () => {
  if (!newUserName.value) {
    usernameError.value = 'ユーザーIDを入力してください';
    return false;
  } else if (newUserName.value.length < 3 ) {
    usernameError.value ='ユーザーIDは3文字以上で入力してください';
    return false;
  } else if (newUserName.value.length > 20 ) {
    usernameError.value ='ユーザーIDは20文字以内で入力してください';
    return false;
  } else {
    usernameError.value = '';
    return true;
  }
};

const updateUserName = async () => {
  if (!validateUserName()) return; 

  try {
    await updateProfile(auth.currentUser, {
      displayName: newUserName.value
    });
    updateSuccess.value = true;
    alert('ユーザーIDを更新しました。画面を再読み込みします。');
    router.push('/').then( () =>{
      window.location.reload();
    }); // 更新後、トップへ戻って再読み込み
  } catch (error) {
    console.error('ユーザーID更新エラー', error);
    alert('更新に失敗しました');
  }
};
</script>

<template>
  <div class="p-6 text-white">
    <h2 class="text-2xl font-bold mb-6">ユーザーIDを変更する</h2>
    <p class="sm:text-sm text-xs text-gray-300">ユーザーIDは3文字以上20文字以内で設定してください</p>
    <div class="flex gap-2">
      <input
        v-model="newUserName"
        type="text"
        placeholder="新しいユーザーID"
        class="bg-[#2a2a2a] border border-[#4a4a4a] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ed760] w-full"
      />
      <button
        @click="updateUserName"
        class="bg-[#1ed760] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#1db954] transition-transform hover:scale-105 active:scale-95"
      >
        保存
      </button>
    </div>
    
    <!-- エラーメッセージ表示 -->
    <p v-if="usernameError" class="text-red-500 mt-2">{{ usernameError }}</p>

    <!-- 成功メッセージ -->
    <div v-if="updateSuccess" class="text-green-500 mt-2">
      ユーザーIDが正常に更新されました。
    </div>
    
  </div>
</template>

<style scoped>
</style>
