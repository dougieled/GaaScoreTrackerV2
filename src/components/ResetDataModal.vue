<template>
  <q-dialog v-model="gameInformationStore.showResetModal" persistent full-width>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="mdi-autorenew" color="red" text-color="white" />
        <span class="q-ml-sm">Reset Game Data ?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="red" v-close-popup />
        <q-btn flat label="Reset" color="green" @click="resetData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useGameInformationStore } from 'src/stores/game-information-store';
import { useStopWatchStore } from 'src/stores/stop-watch-store';
const gameInformationStore = useGameInformationStore();
const stopWatchStore = useStopWatchStore();

function resetData() {
  gameInformationStore.updateTeamA({ name: 'Team A', goals: 0, points: 0 });
  gameInformationStore.updateTeamB({ name: 'Team B', goals: 0, points: 0 });
  gameInformationStore.updateHashtagArray(['GAAScoreTracker']);
  gameInformationStore.updateCompetitionName('Test Competition');
  stopWatchStore.updateHalfOption('1st Half');
  stopWatchStore.updateStarted(false);
  gameInformationStore.updateShowResetModal(false);
}
</script>
<style></style>
