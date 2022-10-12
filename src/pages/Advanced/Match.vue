<template>
  <q-page class="q-pl-xs q-mt-sm">
    <div class="row q-col-gutter-md">
      <div class="col-12 q-pb-md">
        <score-board letter="A" :team="gameInformationStore.teamA" />
      </div>
      <div class="col-12 q-pt-none border-top border-bottom">
        <stop-watch />
      </div>
      <div class="col-12 q-pt-sm">
        <score-board :team="gameInformationStore.teamB" letter="B" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ScoreBoard from 'src/components/Advanced/ScoreBoard.vue';
import StopWatch from 'src/components/Advanced/StopWatch.vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
const gameInformationStore = useGameInformationStore();
</script>
<style scoped lang="scss">
.border-bottom {
  border-top: 1px solid #fff;
}
.border-top {
  border-bottom: 1px solid #fff;
}
</style>
