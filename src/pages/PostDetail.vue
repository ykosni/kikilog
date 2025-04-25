<!--ゴール：タップした投稿のidを使って、Firebaseからデータを取得し、ページにその内容を表示させる-->

<!--プロフィールページからの遷移ロジック-->
<!--・ロジックはMyPostCardに設置する-->
<!--・投稿カードをクリックしたら、「id:post.id」をルーターに渡す（push）-->
<!--・カード全体のdivに@click="goToDetail"を設置-->
<!--・試聴ボタンを@click.stopにすることで遷移を防ぐ-->
<!--・goToDetailでは、router.push-->
<!--※<RouterLink to="/profile">みたいな書き方は、リンクを設置する時に使うもので、-->
<!--今回はクリックアクションなので、これを使わずにrouter.pushを使うのが一般的-->


<script setup>
import { inject, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { formatDate } from '../utils/date'; //日付を文字列にする共通関数
import LikeButton from '../components/LikeButton.vue';

const db = inject('db');
const route = useRoute();
const post = ref(null);
const router = useRouter();

//ログインユーザー
const currentUser = inject('currentUser');

const fetchPost = async () => {
  const docRef = doc(db, 'posts', route.params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    post.value = { id: docSnap.id, ...docSnap.data() }
  } else {
    console.error('投稿が見つかりません')
  }
}

// Firebase Timestampを日時に変換する
const formattedDate = computed(() => {
  return formatDate(post.value.createdAt);
});

//投稿の削除機能
const deletePost = async () => {
  const confirmed = confirm('この投稿を削除しますか？');
  if (!confirmed) return
  
  try{
    await deleteDoc(doc(db, 'posts', post.value.id))
    alert('投稿を削除しました')
    router.push('/profile')
  } catch (error) {
    console.error('削除に失敗しました', error)
    alert('削除に失敗しました')
  }
}




onMounted(() => {
  fetchPost()
})
</script>

<template>
  <div class="bg-white rounded-2xl sm:p-10 p-6 mb-10">
    
    <div class="flex items-center justify-between pb-8 text-[#1ed760]">
      <RouterLink to="/profile">
          <ArrowLeft class="w-10 h-10 transition-transform duration-200 ease-out active:scale-95 hover:scale-110" :stroke-width="3" />
      </RouterLink>
      <p class="font-black sm:text-3xl text-2xl items-center">投稿詳細</p>
      <button @click="deletePost">
        <Trash2 class="w-10 h-10 transition-transform duration-200 ease-out active:scale-95 hover:scale-110" :stroke-width="3" />
      </button>
    </div>
    
    <div v-if="post"
         class="flex flex-col sm:flex-row items-center justify-center text-center sm:gap-10"
    >
      <div class="pb-4">
        <img :src="post.artwork" alt="アートワーク" class="w-full lg:max-w-4xl max-w-md rounded-xl shadow-lg" />
      </div>
  
      <div class="w-full">
        <p class="sm:py-10 py-2 lg:text-5xl md:text-3xl text-2xl sm:text-left text-center font-black text-gray-800">{{ post.track || 'タイトル不明' }}</p>
        <p class="sm:pb-4 text-gray-800 sm:text-3xl text-xl font-bold flex items-start gap-2">
          <UserRound class="sm:w-10 sm:h-10 w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
          {{ post.artist || 'なし' }}
        </p>
        <p class="sm:pb-4 text-gray-600 sm:text-2xl text-xl flex items-start gap-2">
          <Disc3 class="sm:w-10 sm:h-10 w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
          {{ post.album  || 'なし' }} 
        </p>
        <p class="sm:text-sm text-xs text-gray-600 flex items-start gap-2">
          <MessageCircleMore class="sm:w-10 sm:h-10 w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
          {{ post.comment || 'なし' }}
        </p>
        <div class="flex w-full justify-between items-center mt-4">
          <LikeButton :postId="post.id" :userId="currentUser.uid" />
          <p class="sm:text-sm text-xs text-gray-400">投稿日時：{{ formattedDate || '不明' }}</p>
        </div>
      </div>  
    </div>
    
    <p v-else>読み込み中...</p>
    

    
  </div>
</template>
