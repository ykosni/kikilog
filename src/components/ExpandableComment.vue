<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  comment: {
    type: String,
    required: true
  }
});

const isExpanded = ref(false)

const shortComment = computed(() => {
  return props.comment.length > 15 && !isExpanded.value
    ? props.comment.slice(0, 15) + '…'
    : props.comment
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="text-sm text-gray-600">
    <p class="whitespace-pre-wrap">
      {{ shortComment }}
    </p>
    <button
      v-if="props.comment.length > 15"
      @click="toggleExpand"
      class="ml-2 text-gray-400 hover:underline text-xs"
    >
      {{ isExpanded ? '閉じる' : 'さらに表示' }}
    </button>
  </div>
</template>
