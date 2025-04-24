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
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { formatDate } from '../utils/date'; //日付を文字列にする共通関数
import LikeButton from '../components/LikeButton.vue';

const db = inject('db')
const route = useRoute()
const post = ref(null)

//ログインユーザー
const currentUser = inject('currentUser');

const fetchPost = async () => {
  const docRef = doc(db, 'posts', route.params.id)
  const docSnap = await getDoc(docRef)

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

onMounted(() => {
  fetchPost()
})
</script>

<template>
  <div class="bg-white rounded-2xl sm:p-10 p-6">
    <div v-if="post"
         class="flex flex-col sm:flex-row items-center justify-center text-center gap-8"
    >
      <div>
        <img :src="post.artwork" alt="アートワーク" class="w-full max-w-md rounded-xl sm:my-10 shadow-lg" />
      </div>
  
      <div>
        <p class="text-xl sm:text-left text-center font-black text-gray-800 mb-4">{{ post.track || 'タイトル不明' }}</p>
        <p class="text-gray-800 font-bold mb-2 flex items-start gap-2">
          <UserRound class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
          {{ post.artist || 'なし' }}
        </p>
        <p class="text-gray-600 mb-2 flex items-start gap-2">
          <Disc3 class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
          {{ post.album  || 'なし' }} 
        </p>
        <p class="text-gray-600 mb-2 flex items-start gap-2">
          <MessageCircleMore class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
          {{ post.comment || 'なし' }}
        </p>
        <div class="flex justify-between items-center mt-4">
          <LikeButton :postId="post.id" :userId="currentUser.uid" />
          <p class="text-xs text-gray-400">投稿日時：{{ formattedDate || '不明' }}</p>
        </div>
      </div>  
    </div>
    
    <p v-else>読み込み中...</p>
  </div>
</template>
