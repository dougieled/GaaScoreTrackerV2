<template>
  <q-page class="q-pl-sm q-pr-sm q-mt-sm">
    <score-board letter="A" :team="gameInformationStore.teamA" />
    <hr class="m-1 mt-2 q-mb-xs" />
    <stop-watch />
    <hr class="m-1 q-mb-sm mt-1" />
    <score-board :team="gameInformationStore.teamB" letter="B" />
  </q-page>
</template>

<script setup lang="ts">
import ScoreBoard from 'src/components/ScoreBoard.vue';
import StopWatch from 'src/components/StopWatch.vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
const gameInformationStore = useGameInformationStore();
</script>
