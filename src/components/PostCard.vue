<template>
  <div class="post-card">
    <img :src="artwork" alt="Album Artwork" />
    <h3>{{ title }}</h3>
    <p>{{ artist }}</p>
    <p>{{ comment }}</p>
  </div>
</template>

<script>
export default {
  props: {
    artwork: String,
    title: String,
    artist: String,
    comment: String,
  },
};
</script>

<style scoped>
.post-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
}
</style>