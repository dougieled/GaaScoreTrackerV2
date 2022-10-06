<template>
  <q-page class="q-pl-xs q-mt-sm">
    <div class="row">
      <div class="col-6">
        <score-board letter="A" :team="gameInformationStore.teamA" />
      </div>
      <div class="col-6">
        <score-board :team="gameInformationStore.teamB" letter="B" />
      </div>
    </div>

    <hr class="m-1 mt-2 q-mb-xs" />
    <stop-watch />
    <hr class="m-1 q-mb-sm mt-1" />
  </q-page>
</template>

<script setup lang="ts">
import ScoreBoard from 'src/components/Advanced/ScoreBoard.vue';
import StopWatch from 'src/components/StopWatch.vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
const gameInformationStore = useGameInformationStore();
</script>
