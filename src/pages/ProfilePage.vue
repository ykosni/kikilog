<script setup>
  
import { inject, ref, onMounted } from 'vue'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'

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
  
  <div class=profile>
    <h2>プロフィール</h2>

    <div v-if="posts.length" class="post-grid">
      <div v-for="post in posts" :key="post.id" class="post-tile">
        <p>{{ post.track }} / {{ post.artist }}</p>
        <img :src="post.artwork" alt="artwork" />
      </div>
    </div>
    <p v-else>投稿がありません</p>
  </div>
</template>

<style>
.post-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列 */
  gap: 8px; /* タイル間の隙間 */
  margin-top: 20px;
}

.post-tile img {
  width: 100%;
  aspect-ratio: 1 / 1; /* 正方形に保つ */
  object-fit: cover;
  border-radius: 4px;
}
</style>