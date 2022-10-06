<template>
  <q-page class="q-pl-xs q-mt-sm">
    <div class="row q-col-gutter-md border-bottom">
      <div class="col-6 border-right">
        <score-board letter="A" :team="gameInformationStore.teamA" />
      </div>
      <div class="col-6">
        <score-board :team="gameInformationStore.teamB" letter="B" />
      </div>
    </div>

    <stop-watch />
  </q-page>
</template>

<script setup lang="ts">
import ScoreBoard from 'src/components/Advanced/ScoreBoard.vue';
import StopWatch from 'src/components/Advanced/StopWatch.vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
const gameInformationStore = useGameInformationStore();
</script>
<style scoped lang="scss">
.border-right {
  border-right: 1px solid #fff;
}
.border-bottom {
  border-bottom: 1px solid #fff;
}
</style>
