<script setup>
import { ref, onMounted, inject } from 'vue';
import { getDocs, collection, query, orderBy, startAfter, limit } from 'firebase/firestore';
import PostCard from '../components/PostCard.vue';

//main.jsでprovideされたdbを受け取る
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
    // 追加で５件取得（「もっと見る」）
    q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible.value),
      limit(5)
    );
  } else {
    // 最初の5件を取得
    q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
  }

  const snapshot = await getDocs(q);
  const newPosts = snapshot.docs.map(doc => doc.data()); //各ドキュメントの中身を取り出す
  posts.value = [...posts.value, ...newPosts];  //もとの配列に新しい配列を追加する（「もっと見る」）

  //データを全て表示したら、「もっと見る」ボタンを非表示にする
  if (snapshot.empty || snapshot.docs.length < 5) {
    reachedEnd.value = true; // データが空orlimitより少ない（終わり）なら、もう取得しない
  }
  lastVisible.value = snapshot.docs[snapshot.docs.length - 1];
  loading.value = false;
}

//ページ表示時に読み込み
fetchData();

  
</script>


<template>
  
  <div>
    <h2>タイムライン</h2>
  </div>
  

  
  <div>
    
    <div v-if="posts.length > 0">
      <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      />
    </div>

    <button v-if="!reachedEnd" @click="fetchData" :disabled="loading">
      {{ loading ? "読み込み中..." : "もっと見る" }}
    </button>
    <p v-else>投稿は以上です</p>
    
  </div>
  
</template>
