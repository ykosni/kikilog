<script setup>
import { computed } from 'vue';
import { format } from 'date-fns'; //日付を文字列にするライブラリ

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

// Firebase Timestampを日時に変換する
const formattedDate = computed(() => {
  const date = props.post.createdAt.toDate(); 
  return format(date, 'yyyy/MM/dd HH:mm');
});

</script>


<template>
  <div class="post-card">
    <img :src="post.artwork" alt="アートワーク" class="artwork" />

    <h3>{{ post.track || 'タイトル不明' }}</h3>
    <p>artist/program：{{ post.artist || 'なし' }}</p>
    <p>album：{{ post.album  || 'なし' }} </p>
    <p>コメント：{{ post.comment  || 'コメントなし' }}</p>
    <p>❤️ {{ post.likes }}</p>
    <p>投稿日時：{{ formattedDate }}</p>
  </div>
</template>


<style scoped>

</style>