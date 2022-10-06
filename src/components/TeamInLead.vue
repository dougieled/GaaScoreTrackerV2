<template>
  <h6 class="text-center q-ma-none">
    <strong>{{ gameInformationStore.teamInLead }}</strong>
  </h6>
</template>

<script setup lang="ts">
import { useGameInformationStore } from 'src/stores/game-information-store';
const gameInformationStore = useGameInformationStore();
</script>

<style></style>
