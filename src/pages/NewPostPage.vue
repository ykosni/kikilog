<template>
  <div class="min-h-screen bg-[#121212] text-gray-100 px-4 py-8 flex justify-center">
    <div class="w-full max-w-xl bg-gray-900 p-6 rounded-2xl shadow-md">
      <h2 class="text-2xl font-black text-[#1ed760] mb-6 text-center">新規投稿</h2>

      <form @submit.prevent="submitPost" class="space-y-6">
        <div>
          <label class="text-gray-100 font-bold mb-4 flex items-center gap-2">
            <Link2 class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/>
            Spotify楽曲URL</label>
          <input v-model="spotifyUrl" type="text" placeholder="https://open.spotify.com/〜"
            class="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ed760]" />
        </div>

        <div class="text-center">
          <!--デバッグ用-->
          <!--<button type="button" @click="extractTrackId">Track IDを取得</button>-->
          <!--<p v-if="trackId">Track ID: {{ trackId }}</p>-->
          <button type="button" @click="handleSpotifyRequest"
            class="bg-[#1ed760] text-sm text-black font-semibold px-6 py-2 rounded-lg hover:bg-[#1db954] transition-transform hover:scale-105 active:scale-95">
            トラック情報を取得
          </button>
        </div>

        <!--楽曲情報-->
        <div v-if="trackInfo" class="bg-gray-800 p-4 rounded-lg text-sm space-y-1">
          <p class="text-gray-100 font-bold mb-2 flex items-center gap-2">
            <Music class="w-6 h-6 text-[#1ed760]" :stroke-width="3"/> {{ trackInfo.name }}
          </p>          
          
          
          
          <p class="text-gray-100 mb-2 flex items-center gap-2">
            <UserRound class="w-6 h-6 text-[#1ed760]" :stroke-width="3"/> {{ trackInfo.artists[0].name }}
          </p>
          <p class="text-gray-100 mb-2 flex items-center gap-2">
            <Disc3 class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/> {{ trackInfo.album.name }}
          </p>
          <img :src="trackInfo.album.images[0].url" alt="アートワーク" class="rounded-xl mt-2 w-full" />
        </div>

        <div>
          <label class="text-gray-100 mb-4 font-bold flex items-center gap-2">
            <MessageCircleMore class="w-6 h-6 text-[#1ed760] shrink-0" :stroke-width="3"/> コメント
          </label>
          <textarea v-model="comment" rows="4" placeholder="曲の解説、聴きどころ、好きな歌詞、等"
            class="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ed760] resize-none"></textarea>
        </div>

        <div class="text-center">
          <button type="submit"
            class="bg-[#1ed760] text-black text-xl font-bold px-6 py-2 rounded-lg hover:bg-[#1db954] transition-transform hover:scale-105 active:scale-95">
            投稿する
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script setup>
  
import { ref, inject } from 'vue';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';


//main.jsでprovideされたdbを受け取る
const db = inject('db');

const spotifyUrl = ref('');
const trackId = ref(null);
const comment = ref('');
const trackInfo = ref(null);
const router = useRouter();
const authStore = useAuthStore();

const submitPost = async() => {
  try {
  
    if (!trackInfo.value) {
      console.error('トラック情報が取得されていません');
      return;
    }
  
    const postData = {
      spotifyUrl: spotifyUrl.value,
      comment: comment.value,
      uid: authStore.currentUID,
      createdAt: serverTimestamp(),
      likes: 0,
      track: trackInfo.value.name,
      artist: trackInfo.value.artists[0].name,
      album: trackInfo.value.album.name,
      artwork: trackInfo.value.album.images[0].url,
    };
    
    await addDoc(collection(db, 'posts'), postData);
    
    router.push('/');
  } catch (e) {
      console.error('投稿に失敗しました', e);
    } 
};

//Spotify Web APIで、楽曲URLから楽曲情報を取得
//１．楽曲URLからトラックIDを取得
//楽曲URL例・・・https://open.spotify.com/intl-ja/track/0hwtEIit3clZ8uVLYGyCyj?si=b1789bd9f1264663

function extractTrackId() {
  const regex = /track\/([a-zA-Z0-9]+)/;  //track/の後の文字列をregexとする（si=以降は対象外）
  const matchResult = spotifyUrl.value.match(regex); //配列（0:track〜,1:track/以降の文字列）
  trackId.value = matchResult ? matchResult[1] : null;
  console.log('トラックID：', trackId.value);
}

//２．APIにリクエスト
//トークンを取得する
async function getSpotifyAccessToken() {
  const clientId = '9912d35a456340aa85d6aebd21a9b9e9';
  const clientSecret = '2c82e0aa7a014de6bf7236866747c7c4';
  const credentials = btoa (`${clientId}:${clientSecret}`);
  
  try {
    const response = await fetch('https://accounts.spotify.com/api/token',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`
      },
      body: 'grant_type=client_credentials'
    });
    
    const data = await response.json();
    console.log('アクセストークン：', data.access_token);
    return data.access_token;
  } catch (error) {
      console.error('アクセストークン取得失敗', error);
      return null;
    }
}

//APIリクエスト
async function getTrackInfo(trackId) {
  const accessToken = await getSpotifyAccessToken(); //アクセストークン取得
  
  if (!accessToken) {
    console.error('アクセストークンが取得できませんでした');
    return;
  }

  try {  //トラックIDを使ってリクエストを送信
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const trackData = await response.json(); //responseをJSON形式に変換
    console.log('トラック情報:', trackData);  // トラック情報を表示
    trackInfo.value = trackData; 
  } catch (error) {
    console.error('トラック情報取得失敗', error);
  }
}

//楽曲URL〜情報を画面に表示するまでをひとまとめにする。「トラック情報取得」ボタン用
async function handleSpotifyRequest() {
  extractTrackId();
  if (!trackId.value) {
    console.error('トラックIDが取得できませんでした');
    return;
  }
  await getTrackInfo(trackId.value);
}




</script>

<style scoped></style>
