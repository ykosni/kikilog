<template>
  <div class="sm:p-4 p-1 mb-8 max-w-2xl mx-auto">
    <h1 class="text-2xl font-black text-[#1ed760] mb-4">About 聴きログ</h1>

    <!-- サービス概要 -->
    <div class="bg-gray-200 rounded-2xl shadow-sm p-4 mb-4">
      <div class="flex items-center gap-2 mb-2 text-lg font-bold text-gray-800">
        <Headphones class="w-5 h-5" />
        <span class="font-bold">サービス概要</span>
      </div>
      <p class="text-gray-800 text-sm leading-relaxed">
        聴きログは、あなたの「この曲、好き！」という気持ちを記録してシェアできる、音楽好きのためのSNSです。
        SpotifyのURLを使って、簡単にお気に入りの曲を投稿できます。<br><br>
        ユーザーのおすすめコメントや試聴機能を通して、まだ知らない音楽との出会いを楽しみましょう！
      </p>
    </div>

    <!-- 主な機能 -->
    <div class="bg-gray-200 rounded-2xl shadow-sm p-4 mb-4">
      <div class="flex font-bold items-center gap-2 mb-2 text-lg font-semibold text-gray-800">
        <Settings class="w-5 h-5" />
        <span class="font-bold">主な機能</span>
      </div>
      <ul class="list-disc list-inside text-gray-800 text-sm space-y-1">
        <li>お気に入りの曲にコメントを添えて記録</li>
        <li>他のユーザーの投稿に「いいね！」</li>
        <li>投稿された曲をその場で視聴</li>
        <li>プロフィールページで自分のお気に入りソングをチェック</li>
      </ul>
    </div>

    <!-- こんな人におすすめ -->
    <div class="bg-gray-200 rounded-2xl shadow-sm p-4 mb-4">
      <div class="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-800">
        <User class="w-5 h-5" />
        <span class="font-bold">こんな人におすすめ</span>
      </div>
      <ul class="list-disc list-inside text-gray-800 text-sm space-y-1">
        <li>お気に入りの音楽をコメントと共に記録したい人</li>
        <li>友達やフォロワーに曲をシェアしたい人</li>
        <li>新たな音楽と出会いたい人</li>
      </ul>
    </div>

    <!-- 開発の背景 -->
    <div class="bg-gray-200 rounded-2xl shadow-sm p-4 mb-4">
      <div class="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-800">
        <Lightbulb class="w-5 h-5" />
        <span class="font-bold">開発の背景</span>
      </div>
      <p class="text-gray-800 text-sm leading-relaxed">
        Spotifyなどのプレイリスト機能では、お気に入りの曲をまとめることはできても、
        「このフレーズが好き！」「この曲を聴くと〇〇を思い出す」といった気持ちまでは残せない───。<br>
        そんなモヤモヤを感じていました。<br><br>
        
        また、自分の「この曲、好き！」をもっと自由に発信したい、
        そして、誰かの「この曲、いいよ！」という声で新たな音楽と出会えたら素敵だなと思い、
        "音楽版インスタグラム"のようなSNSをつくることにしました。


      </p>
    </div>

    <!-- 今後のアップデート予定 -->
    <div class="bg-gray-200 rounded-2xl shadow-sm p-4">
      <div class="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-800">
        <Rocket class="w-5 h-5" />
        <span class="font-bold">今後のアップデート予定</span>
      </div>
      <ul class="list-disc list-inside text-gray-800 text-sm space-y-1">
        <li>投稿へのコメント機能の追加</li>
        <li>気分に合わせた曲検索機能の追加</li>
        <li>ポッドキャストの投稿機能の追加</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { Headphones, Settings, User, Lightbulb, Rocket } from 'lucide-vue-next';
</script>
