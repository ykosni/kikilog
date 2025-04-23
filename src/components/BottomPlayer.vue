<script setup>
import { computed } from 'vue';


const props = defineProps({
  spotifyUrl: String,
  visible: Boolean,
});

const isVisible = computed(() => props.visible);

const embedUrl = computed(() => {
  if (!props.spotifyUrl) return '';
  return props.spotifyUrl.replace('track/', 'embed/track/') + '?utm_source=generator&autoplay=1';
});
</script>

<template>
  <transition name="slide-fade">
    <div
      v-if="visible"
      class="fixed bottom-[58px] left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-black shadow-xl rounded-xl overflow-hidden transition-all duration-300 z-50"
    >

      <iframe
        :src="`${spotifyUrl.replace('track/', 'embed/track/')}?utm_source=generator&autoplay=1`"
        class="w-full h-20"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </transition>
</template>


<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

