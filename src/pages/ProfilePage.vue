<script setup>
  
import { inject, ref, onMounted } from 'vue'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { formatDate } from '../utils/date'
import LikeButton from '../components/LikeButton.vue';
import ExpandableComment from '../components/ExpandableComment.vue'
import BottomPlayer from '../components/BottomPlayer.vue';



const db = inject('db');
const currentUser = inject('currentUser');

const posts = ref([]);

//試聴ボタン
const visiblePlayerId = ref(null);
const currentSpotifyUrl = ref(null); //再生中の曲のURLを保持する


//トグルで、同時に複数再生されないようにする
const togglePlayer = (post) => {
  if (visiblePlayerId.value === post.id) {
      // 今開いてるプレイヤーを閉じる（同じIDが2回押されたから）
      visiblePlayerId.value = null;
      currentSpotifyUrl.value = null;
    } else {
      // 押された投稿IDを再生対象にする（別の投稿を再生したいとき）
      visiblePlayerId.value = post.id;
      currentSpotifyUrl.value = post.spotifyUrl;
    }
};

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

onMounted(() => {
  fetchUserPosts()
});

</script>



<template>
  <div class="p-2">
    <h2 class="text-2xl font-bold mb-4">プロフィール</h2>

    <div v-if="posts.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-gray-200 rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
      >
        <!--アートワークの中に試聴ボタン-->
        <div class="relative group">
          <img
            :src="post.artwork"
            alt="アートワーク"
            class="rounded-xl object-cover aspect-square w-full mb-3"
          />
          <button
            @click="togglePlayer(post)"
            class="absolute bottom-4 right-4 bg-[#1ed760] hover:bg-[#1fdb69] rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100"
          >
            <p class="text-black">▶</p>
          </button>
        </div>
        
        <p class="text-center font-black text-gray-800 mb-3">
          {{ post.track || 'タイトル不明' }}
        </p>
        
        <p class="text-gray-800 font-bold flex items-start gap-2">
          <UserRound class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3" />
          {{ post.artist || 'なし' }}
        </p>
        
        <p class="text-gray-600 flex items-start gap-2">
          <Disc3 class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3" />
          {{ post.album || 'なし' }}
        </p>
        
        <p class="text-sm text-gray-600 flex items-start gap-2">
          <MessageCircleMore class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
          <ExpandableComment :comment="post.comment || 'コメントなし'" />
        </p>
        
        <div class="flex justify-between items-center mt-4">
          <LikeButton :postId="post.id" :userId="currentUser.uid" />
          <span class="text-xs text-gray-400">{{ formatDate(post.createdAt) }}</span>
        </div>
        
        <div>
          <BottomPlayer
            :spotify-url="currentSpotifyUrl"
            :visible="!!currentSpotifyUrl"
          />
        </div>

      </div>
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