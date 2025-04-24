<script setup>
  
import { inject, ref, onMounted, computed } from 'vue'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import BottomPlayer from '../components/BottomPlayer.vue';
import PostCard from '../components/PostCard.vue';


const db = inject('db');
const currentUser = inject('currentUser');

const posts = ref([]);


//自分の投稿を取得
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


// プレイヤー制御
const currentTrack = ref(null);
const handleTogglePlayer = (post) => {
  if (currentTrack.value && currentTrack.value.id === post.id) {
    currentTrack.value = null;
  } else {
    currentTrack.value = post;
  }
};

// 🎧 プレイヤーに渡す spotifyUrl
const currentSpotifyUrl = computed(() => currentTrack.value?.spotifyUrl || '');



onMounted(() => {
  fetchUserPosts()
});

</script>



<template>
  <div class="p-2">
    <h2 class="text-2xl font-black mb-4">My 聴きログ</h2>

    <div v-if="posts.length" class="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :currentUser="currentUser"
        :currentTrackId="currentTrack?.id"
        @toggle-player="handleTogglePlayer"
      />
      
      <BottomPlayer
        :spotify-url="currentSpotifyUrl"
        :visible="!!currentTrack"
      />
      
    </div>

    <p v-else class="text-gray-300 mt-4">投稿がありません</p>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>