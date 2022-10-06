<template>
  <h3
    class="text-center q-ma-none q-mr-xl"
    id="time"
    v-html="stopWatchStore.getStopwatch"
  ></h3>
</template>

<script setup lang="ts">
import { useStopWatchStore } from 'src/stores/stop-watch-store';
const stopWatchStore = useStopWatchStore();
</script>
