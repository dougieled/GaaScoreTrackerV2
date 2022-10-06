<template>
  <p class="text-subtitle1 text-center q-ma-none q-mb-xs">
    <strong>{{ gameInformationStore.teamInLead }}</strong>
  </p>
</template>

<script setup lang="ts">
import { useGameInformationStore } from 'src/stores/game-information-store';
const gameInformationStore = useGameInformationStore();
</script>

<style></style>
