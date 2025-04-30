<script setup>
import { ref, onMounted, inject, computed } from 'vue';
import { getDocs, collection, query, orderBy, startAfter, limit } from 'firebase/firestore';
import PostCard from '../components/PostCard.vue';
import BottomPlayer from '../components/BottomPlayer.vue';


//ログイン状態
const currentUser = inject('currentUser');

//main.jsでprovideされたdbとcurrentUserを受け取る
const db = inject('db');

//ページネーション
const posts = ref([]);              // 表示中のデータ一覧
const lastVisible = ref(null);     // 最後に取得したドキュメント（次のスタート地点）
const loading = ref(false);        // 読み込み中かどうか（ボタンの二重クリック防止）
const reachedEnd = ref(false);     // もう取得するデータがないか

const fetchData = async () => {
  if (loading.value || reachedEnd.value) return; // 読込中に連続でボタン押下防止
  loading.value = true;

  let q;
  if (lastVisible.value) {
    // 追加で6件取得（「もっと見る」）
    q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible.value),
      limit(6)
    );
  } else {
    // 最初の6件を取得
    q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(6)
    );
  }

  const snapshot = await getDocs(q);
  const newPosts = snapshot.docs.map(doc => ({
    id: doc.id,         // ← ここでidを追加
    ...doc.data(),      // その他のデータ
  })); //各ドキュメントの中身を取り出す
  posts.value = [...posts.value, ...newPosts];  //もとの配列に新しい配列を追加する（「もっと見る」）

  //データを全て表示したら、「もっと見る」ボタンを非表示にする
  if (snapshot.empty || snapshot.docs.length < 6) {
    reachedEnd.value = true; // データが空orlimitより少ない（終わり）なら、もう取得しない
  }
  lastVisible.value = snapshot.docs[snapshot.docs.length - 1];
  loading.value = false;
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



//ページ表示時に読み込み
fetchData();

  
</script>


<template>
  
  <div class="p-2">
    <h2 class="text-[#1ed760] text-2xl font-black mb-4">Discover your favorites!</h2>

    <div v-if="posts.length > 0 && currentUser"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :currentUser="currentUser"
      :currentTrackId="currentTrack?.id"
      @toggle-player="handleTogglePlayer"
      />
    </div>
    
   <BottomPlayer
      :spotify-url="currentSpotifyUrl"
      :visible="!!currentTrack"
    />
    

<!-- 6件以上データがあれば「もっと見る」 -->
    <template v-if="!reachedEnd">
      <div class="flex justify-center my-6">
        <button
          @click="fetchData"
          :disabled="loading"
          class="bg-[#1ed760] text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-[#1ed760]/90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? "読み込み中..." : "もっと見る" }}
        </button>
      </div>
    </template>

    <!-- 投稿データを全て表示したら -->
    <template v-else>
      <p class="text-center text-sm text-gray-500 my-6">投稿は以上です</p>
    </template>
    
  </div>
  
  <!--  下に余白を追加 -->
  <div class="h-28 sm:h-32"></div>
  
</template>
