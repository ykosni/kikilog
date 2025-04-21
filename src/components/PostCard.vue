<script setup>
import { computed,inject } from 'vue';
import { formatDate } from '../utils/date'; //日付を文字列にする共通関数
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
//console.log("post in PostCard:", props.post);

// Firebase Timestampを日時に変換する
const formattedDate = computed(() => {
  return formatDate(props.post.createdAt);
});

//ログインユーザー
const currentUser = inject('currentUser');

</script>


<template>
  <div class="bg-gray-200 rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
    <img :src="post.artwork" alt="アートワーク" class="rounded-xl object-cover" />

    <p class="text-xl text-center font-black text-gray-800 mb-4">{{ post.track || 'タイトル不明' }}</p>
    
    
    <p class="text-gray-800 font-bold mb-2 flex items-center gap-2">
      <UserRound class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
      {{ post.artist || 'なし' }}
    </p>
    
    <p class="text-gray-600 mb-2 flex items-center gap-2">
      <Disc3 class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
      {{ post.album  || 'なし' }} 
    </p>
      
      
    <p class="text-gray-600 mb-2 flex items-center gap-2">
      <MessageCircleMore class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
      {{ post.comment  || 'コメントなし' }}
    </p>
    
    <div class="flex justify-between items-center mt-4">
      <LikeButton :postId="post.id" :userId="currentUser.uid" />
      <span class="text-xs text-gray-400">投稿日時：{{ formattedDate }}</span>
    </div>
    

  </div>
</template>


<style scoped>

</style>