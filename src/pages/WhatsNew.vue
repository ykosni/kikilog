<template>
  <div class="sm:p-4 p-1 mb-8 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-[#1ed760] mb-6 text-center">What's NEW</h1>

    <div class="space-y-4">
      <div
        v-for="(item, index) in updates"
        :key="index"
        class="bg-gray-200 shadow-md rounded-xl p-4"
      >
        <p class="sm:text-sm text-xs text-gray-500 mb-1">{{ item.date }}</p>
        <p class="sm:text-base text-xs text-gray-800">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const updates = [
  {
    date: "2025/04/30",
    content: "コメントの表示文字数を調整しました",
  },
  {
    date: "2025/04/30",
    content: "試聴プレイヤーが「もっと見る」ボタンを隠さないよう調整しました",
  },
  {
    date: "2025/04/29",
    content: "新規投稿画面にて、「トラック情報」を自動で取得する仕様にしました",
  },
  {
    date: "2025/04/28",
    content: "会員登録時のエラー表示を修正しました",
  },
];
</script>
