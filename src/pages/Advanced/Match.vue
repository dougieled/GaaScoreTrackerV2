<template>
  <q-page class="q-pl-xs q-mt-sm">
    <div class="row q-col-gutter-md">
      <div class="col-6 border-right">
        <score-board letter="A" :team="gameInformationStore.teamA" />
      </div>
      <div class="col-6">
        <score-board :team="gameInformationStore.teamB" letter="B" />
      </div>
    </div>
    <statistics />
    <hr class="q-mb-sm" />
    <stop-watch />
    <hr class="q-mb-sm q-mt-sm" />
  </q-page>
</template>

<script setup lang="ts">
import ScoreBoard from 'src/components/Advanced/ScoreBoard.vue';
import StopWatch from 'src/components/Advanced/StopWatch.vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
import Statistics from 'src/components/Advanced/Statistics.vue';
const gameInformationStore = useGameInformationStore();
</script>
<style scoped lang="scss">
.border-right {
  border-right: 2px solid #fff;
}
</style>
