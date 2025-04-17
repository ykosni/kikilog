<script setup>
import { computed,inject } from 'vue';
import { format } from 'date-fns'; //日付を文字列にするライブラリ
import LikeButton from './LikeButton.vue';


//HomePage.vue（親）からデータを受け取る準備
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  currentUser: {
    type: Object,
    required: true,
  },
});

// （デバッグ） ここで post の中身を確認！
console.log("post in PostCard:", props.post);

// Firebase Timestampを日時に変換する
const formattedDate = computed(() => {
  const date = props.post.createdAt.toDate(); 
  return format(date, 'yyyy/MM/dd HH:mm');
});

//ログインユーザー
const currentUser = inject('currentUser');

</script>


<template>
  <div>
    <img :src="post.artwork" alt="アートワーク" width="50%" height="50%"/>

    <h3>{{ post.track || 'タイトル不明' }}</h3>
    <p>artist：{{ post.artist || 'なし' }}</p>
    <p>album：{{ post.album  || 'なし' }} </p>
    <p>コメント：{{ post.comment  || 'コメントなし' }}</p>
    
    <div>
      <LikeButton :postId="post.id" :userId="currentUser.uid" />
    </div>
    
    <p>投稿日時：{{ formattedDate }}</p>
  </div>
</template>


<style scoped>

</style>