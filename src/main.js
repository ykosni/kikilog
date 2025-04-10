import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
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
  
  const pn = createPinia();

// Vueアプリケーションを作成してマウント
createApp(App)
  .use(router)
  .use(pn)
  .provide('db', db)
  .mount('#app'); // index.html内の<div id="app">にマウント
