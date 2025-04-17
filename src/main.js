import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createPinia } from 'pinia'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTBm5XzlC9DicgL_RCVBsszXDpUI6wxqk",
  authDomain: "kikilog-dc6d0.firebaseapp.com",
  projectId: "kikilog-dc6d0",
  storageBucket: "kikilog-dc6d0.firebasestorage.app",
  messagingSenderId: "262286842725",
  appId: "1:262286842725:web:96c662bf55f98542af9f8c"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);
const auth = getAuth();  
const pn = createPinia();

//ログイン状態を保持する変数
const authState = { currentUser: null };

// Vueアプリケーションを作成
const app = createApp(App);

app.use(router);
app.use(pn);
app.provide('db', db);
app.provide('authState', authState);
app.mount('#app'); //一度だけマウント


//ログイン状態を監視
onAuthStateChanged(auth, (user) => {
  authState.currentUser = user;
  console.log("認証状態変更", user ? "ログイン中" : "ログアウト");
  app.provide('currentUser', user);
});