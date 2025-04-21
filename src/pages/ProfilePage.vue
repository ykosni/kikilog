<script setup>
  
import { inject, ref, onMounted } from 'vue'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { formatDate } from '../utils/date'
import LikeButton from '../components/LikeButton.vue';

const db = inject('db')
const currentUser = inject('currentUser')

const posts = ref([])

const fetchUserPosts = async () => {
  if (!currentUser) return

  const postsRef = collection(db, 'posts')
  const q = query(
    postsRef,
    where('uid', '==', currentUser.uid), // 自分の投稿だけ取得
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)
  posts.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

onMounted(() => {
  fetchUserPosts()
})

</script>



<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">プロフィール</h2>

    <div v-if="posts.length" class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-gray-200 rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
      >
         <img
          :src="post.artwork"
          alt="アートワーク"
          class="rounded-xl object-cover aspect-square w-full mb-3"
        />
        
        <p class="text-center font-black text-gray-800 mb-3">
          {{ post.track || 'タイトル不明' }}
        </p>
        
        <p class="text-gray-800 font-bold mb-2 flex items-center gap-2">
          <UserRound class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3" />
          {{ post.artist || 'なし' }}
        </p>
        
        <p class="text-gray-600 mb-2 flex items-center gap-2">
          <Disc3 class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3" />
          {{ post.album || 'なし' }}
        </p>
        
        <p class="text-sm text-gray-600 mb-2 flex items-center gap-2">
          <MessageCircleMore class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
          {{ post.comment  || 'コメントなし' }}
        </p>
        
        <div class="flex justify-between items-center mt-4">
      <LikeButton :postId="post.id" :userId="currentUser.uid" />
      <span class="text-xs text-gray-400">{{ formatDate(post.createdAt) }}</span>
    </div>

      </div>
    </div>

    <p v-else class="text-gray-300 mt-4">投稿がありません</p>
  </div>
</template>
