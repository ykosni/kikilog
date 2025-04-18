<script setup>
  
import { ref, onMounted, inject } from 'vue';
import { getDoc, doc, setDoc, deleteDoc, serverTimestamp, onSnapshot, collection } from 'firebase/firestore';

//PostCard.vueからデータを受け取る
const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
  
//main.jsでprovideされたdbとcurrentUserをinjectで受け取る
const db = inject('db');
const currentUser = inject('currentUser');

//イイねしてるorしてない状態を持つ変数
const isLiked = ref(false); //初期はfalse

//イイねしてるかどうか確認する
const checkIfLiked = async () => {
  //ファイルパス（posts>投稿id>likes>uid）
  const docRef = doc(db, "posts", props.postId, "likes", currentUser.uid);
  const docSnap = await getDoc(docRef);  //FirestoreでdocRefからユーザーID取得
  isLiked.value = docSnap.exists();  //ユーザーIDある＝イイねしてる＝true
};

//初回マウント時にイイねチェックをする
onMounted( ()=> {
  if (currentUser) {
    checkIfLiked();
  }
});

//イイねを解除する（♥→♡）・イイねする（♡→♥）
const toggleLike = async () => {
  console.log("currentUser:", currentUser);
  console.log("postId:", props.postId);

  if (!currentUser || !props.postId) {
    console.error("currentUser または postId がありません！");
    return;
  }

  const docRef = doc(db, "posts", props.postId, "likes", currentUser.uid);

  try {
    if (isLiked.value) {
      await deleteDoc(docRef);
      isLiked.value = false;
    } else {
      await setDoc(docRef, {
        likedAt: serverTimestamp()
      });
      isLiked.value = true;
    }
  } catch (error) {
    console.error("イイね処理でエラーが発生しました:", error);
  }
};

//イイね数を表示させる機能
const likeCount = ref(0);
const likesCollection = collection(db, "posts", props.postId, "likes"); //対象のコレクションを指定
onSnapshot(likesCollection, (snapshot) => {  //リアルタイムで監視
  likeCount.value = snapshot.size;　//コレクション内のドキュメント数を取得
//  console.log("イイね数：", likeCount.value);
});



</script>

<template>
  <button @click="toggleLike">
    <!--isLikedがtrueなら♥、falseなら♡-->
    {{ isLiked ? '♥' : '♡' }}
  </button>
  {{ likeCount }}
</template>
