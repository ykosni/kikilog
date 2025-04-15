<script setup>
import { ref, onMounted, inject } from 'vue';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import PostCard from '../components/PostCard.vue';

//main.jsでprovideされたdbを受け取る
const db = inject('db');
const posts = ref([]);

//投稿を取得する
const getPosts = async () => {
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    posts.value = []; //postsを初期化
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      
      const post = {
        id: doc.id,
        album: data.album,
        artist: data.artist,
        artwork: data.artwork,
        comment: data.comment,
        createdAt: data.createdAt,
        likes: data.likes,
        spotifyUrl: data.spotifyUrl,
        track: data.track,
        uid: data.uid,
      };
      
      posts.value.push(post);
    });
  } catch (e) {
    console.error("投稿取得に失敗しました", e);
  }
};
  

//ページ表示後に投稿を取得
onMounted(async () => {
  await getPosts();
});

  
</script>


<template>
  
  <div>
    <h2>タイムライン</h2>
  </div>
  
  <div v-if="posts.length > 0">
    <PostCard
    v-for="post in posts"
    :key="post.id"
    :post="post"
    />
  </div>
  
  <div v-else>
    <p>投稿はありません</p>
  </div>
  
</template>
