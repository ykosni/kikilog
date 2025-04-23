<script setup>
import { computed,inject } from 'vue';
import { formatDate } from '../utils/date'; //日付を文字列にする共通関数
import LikeButton from './LikeButton.vue';
import { ref } from 'vue';
import ExpandableComment from './ExpandableComment.vue';


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
  currentTrackId: {
    type: String,
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

//emitする
const emit = defineEmits(['toggle-player']);
const togglePlayer = () => {
  emit('toggle-player', props.post);
};

//自分が再生中か？を判定
const isPlaying = computed(() => props.post.id === props.currentTrackId);



</script>


<template>
  <div
    :class="[
      'rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300',
      isPlaying ? 'scale-[1.01] bg-white' : 'bg-gray-200'
    ]"
  >
    
    <div class="relative w-full group">
      <!-- アートワーク画像 -->
      <img
  :src="post.artwork"
  alt="アートワーク"
  :class="['rounded-xl shadow-md', isPlaying ? 'animate-pulse' : '']"
/>

      
      <!-- 試聴ボタン（左下にふわっと表示）-->
        <button
          @click="togglePlayer"
          class="absolute bottom-4 right-4 bg-[#1ed760] hover:bg-[#1fdb69] rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100"
        >
          <p class="text-black"><Headphones :stroke-width="3"/></p>
        </button>
    </div>

      

    <p class="text-xl text-center font-black text-gray-800 mb-4">{{ post.track || 'タイトル不明' }}</p>
    
    
    <p class="text-gray-800 font-bold mb-2 flex items-start gap-2">
      <UserRound class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
      {{ post.artist || 'なし' }}
    </p>
    
    <p class="text-gray-600 mb-2 flex items-start gap-2">
      <Disc3 class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
      {{ post.album  || 'なし' }} 
    </p>
      
      
    <p class="text-gray-600 mb-2 flex items-start gap-2">
      <MessageCircleMore class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
      <ExpandableComment :comment="post.comment || 'コメントなし'" />
    </p>
    
    <div class="flex justify-between items-center mt-4">
      <LikeButton :postId="post.id" :userId="currentUser.uid" />
      <span class="text-xs text-gray-400">投稿日時：{{ formattedDate }}</span>
    </div>

  </div>
</template>


<style>
  
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


</style>