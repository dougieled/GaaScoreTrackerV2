<template>
  <q-dialog v-model="stopWatchStore.showTimerResetDialog" persistent full-width>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="mdi-timer-refresh" color="red" text-color="white" />
        <span class="q-ml-sm">Reset timer ?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="red" v-close-popup />
        <q-btn
          flat
          label="Reset"
          color="green"
          @click="stopWatchStore.resetTimer()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useStopWatchStore } from 'src/stores/stop-watch-store';
const stopWatchStore = useStopWatchStore();
</script>
<style></style>
