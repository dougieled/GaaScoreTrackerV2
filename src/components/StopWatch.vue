<template>
  <div class="row">
    <div class="col-12">
      <time-since-last-score v-if="stopWatchStore.started" letter="A" />
    </div>
  </div>
  <div class="row items-center">
    <div class="col-2 text-left">
      <div class="row">
        <div class="col-12">
          <q-btn
            small
            fab
            dark
            color="blue darken-2 q-mb-xs"
            v-if="
              stopWatchStore.started === false ||
              (stopWatchStore.started && stopWatchStore.paused)
            "
            :disabled="teamStore.isTeamInfoNeeded"
            @click="start"
            icon="mdi-timer"
          >
          </q-btn>
          <q-btn
            small
            v-if="stopWatchStore.started && !stopWatchStore.paused"
            fab
            dark
            color="red darken-2 q-mb-xs"
            :disabled="teamStore.isTeamInfoNeeded"
            @click="pause"
            icon="mdi-timer-pause-outline"
          >
          </q-btn>
        </div>
        <div class="col-12">
          <q-btn
            small
            fab
            dark
            color="red darken-2"
            v-if="stopWatchStore.started === true"
            :disabled="teamStore.isTeamInfoNeeded"
            @click="stopWatchStore.showTimerResetDialog = true"
            icon="mdi-refresh"
          >
          </q-btn>
        </div>
      </div>
    </div>
    <div class="col-8 text-center">
      <div class="row">
        <div v-if="!stopWatchStore.started" class="col-6">
          <q-select
            style="height: 30px"
            emit-value
            outlined
            v-model="addedMinutes"
            :options="timerOptions"
            class="q-pb-none"
            map-options
            label="Start Timer At:"
            :popup-content-style="{ maxHeight: '300px' }"
          />
        </div>
        <div v-if="!stopWatchStore.started" class="col-6">
          <q-select
            emit-value
            outlined
            v-model="stopWatchStore.halfOption"
            :options="halfOptions"
            class="q-pb-none"
            map-options
            label="Half:"
            :popup-content-style="{ maxHeight: '300px' }"
          />
        </div>
        <div v-if="stopWatchStore.started" class="col-12">
          <timer ref="timer" />
        </div>
      </div>
    </div>
    <div class="col-2 text-right">
      <social-media-share />
    </div>
  </div>
  <time-since-last-score v-if="stopWatchStore.started" letter="A" />
  <div class="col-12">
    <team-in-lead v-if="stopWatchStore.started" />
  </div>
  <reset-timer-modal />
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
import { useStopWatchStore } from 'src/stores/stop-watch-store';
import { useTeamStore } from 'src/stores/team-store';
import TimeSinceLastScore from 'src/components/TimeSinceLastScore.vue';
import Timer from 'src/components/Timer.vue';
import TeamInLead from 'src/components/TeamInLead.vue';
import SocialMediaShare from 'src/components/SocialMediaShare.vue';
import ResetTimerModal from 'src/components/ResetTimerModal.vue';
const gameInformationStore = useGameInformationStore();
const stopWatchStore = useStopWatchStore();
const teamStore = useTeamStore();

const intervalDateTimeNow = ref<number>();
const halfOptions = ref<{ label: string; value: string }[]>([
  { label: '1st', value: '1st Half' },
  { label: 'HT', value: 'Half Time' },
  { label: '2nd', value: '2nd Half' },
  { label: 'FT', value: 'Full Time' },
  { label: '1st ET', value: '1st Half Extra Time' },
  { label: 'HT ET', value: ' Half Time Extra Time' },
  { label: '2nd ET', value: '2nd Half Extra Time' },
  { label: 'AET', value: 'After Extra Time' },
]);
const addedMinutes = ref<number>(0);

const timerOptions = computed(() => {
  var array = [];
  for (var i = 0; i <= 35; i++) {
    var object = { label: `${i} Mins`, value: i };
    array.push(object);
  }
  return array;
});
const teamAScore = computed(() => {
  return gameInformationStore.teamAScore;
});
const teamBScore = computed(() => {
  return gameInformationStore.teamBScore;
});
function checkIfGameIsStarted() {
  if (stopWatchStore.started === true) {
    startContinuousDateTimeNow();
  }
}
function start() {
  if (stopWatchStore.paused) {
    stopWatchStore.handleUnpause();
  } else {
    var dateNow = new Date();
    var startDateTime = new Date(
      dateNow.getTime() - addedMinutes.value * 60000
    );
    stopWatchStore.updateStarted(true);
    gameInformationStore.updateTotalDateTimeSinceTeamAScore(dateNow);
    gameInformationStore.updateTotalDateTimeSinceTeamBScore(dateNow);

    stopWatchStore.updateStartDateTime(startDateTime);
    stopWatchStore.updateDateTimeNow(dateNow);
    startContinuousDateTimeNow();
    addedMinutes.value = 0;
  }
}
function startContinuousDateTimeNow() {
  clearInterval(intervalDateTimeNow.value);
  intervalDateTimeNow.value = setInterval(function () {
    updateDateTimeNow();
  }, 100);
  if (stopWatchStore.minutes > 150) {
    stopWatchStore.resetTimer();
  }
}
function updateDateTimeNow() {
  if (stopWatchStore.started === true && stopWatchStore.paused === false) {
    stopWatchStore.updateDateTimeNow(new Date());
  }
}
function pause() {
  stopWatchStore.updatePaused(true);
  stopWatchStore.updatePausedAtDateTime(new Date());
}
watch([teamAScore.value], () => {
  gameInformationStore.updateTotalDateTimeSinceTeamAScore(new Date());
});
watch([teamBScore.value], () => {
  gameInformationStore.updateTotalDateTimeSinceTeamBScore(new Date());
});
onMounted(() => {
  checkIfGameIsStarted();
});
</script>
<style>
.btn-twitter {
  color: #fff;
  background-color: #1da1f2;
  border-color: #1da1f2;
}
</style>
