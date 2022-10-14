<template>
  <div class="row">
    <div class="col-2 text-left">
      <h6 class="q-ma-none">
        <strong>Goals</strong>
      </h6>
    </div>
    <div class="col-8 text-left">
      <h5 class="text-center q-ma-none">
        <strong>{{ team.teamName }}</strong>
      </h5>
    </div>
    <div class="col-2 text-right">
      <h6 class="q-ma-none">
        <strong>Points</strong>
      </h6>
    </div>
  </div>
  <div class="row">
    <div class="col-2 text-left">
      <div class="row">
        <div class="col-12 q-pa-none">
          <q-btn
            fab
            dark
            color="green"
            small
            @click="updateGoal(true)"
            :loading="updatingScore"
            :disabled="updatingScore"
            class="q-mb-xs disable-dbl-tap-zoom"
            icon="mdi-plus"
          >
          </q-btn>
        </div>
        <div class="col-12 q-pa-none">
          <q-btn
            fab
            dark
            color="red-5"
            small
            @click="updateGoal(false)"
            :loading="updatingScore"
            :disabled="updatingScore"
            class="disable-dbl-tap-zoom"
            icon="mdi-minus"
          >
          </q-btn>
        </div>
      </div>
    </div>
    <div class="col-8 text-center">
      <h4 class="text-weight-bold q-mt-none q-mb-none text-center">
        {{ teamScore.goals }} : {{ teamScore.points }}
      </h4>
      <p class="text-center q-ma-none">Total: {{ totalScore }}</p>
    </div>
    <div class="col-2 text-right">
      <div class="row">
        <div class="col-12 q-pa-none">
          <q-btn
            fab
            dark
            color="green darken-2"
            small
            @click="updatePoint(true)"
            :loading="updatingScore"
            :disabled="updatingScore"
            class="q-mb-xs disable-dbl-tap-zoom"
            icon="mdi-plus"
          >
          </q-btn>
        </div>
        <div class="col-12 q-pa-none">
          <q-btn
            fab
            dark
            color="red-5"
            small
            @click="updatePoint(false)"
            :loading="updatingScore"
            :disabled="updatingScore"
            class="disable-dbl-tap-zoom"
            icon="mdi-minus"
          >
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
import { useTeamStore } from 'src/stores/team-store';
import { Team } from 'src/Models/Team';
const gameInformationStore = useGameInformationStore();
const teamStore = useTeamStore();
const updatingScore = ref<boolean>(false);
const props = defineProps({
  letter: {
    type: String as PropType<string>,
    required: true,
  },
});
const totalScore = computed(
  () => teamScore.value.goals * 3 + teamScore.value.points
);
const team = computed(() => {
  return props.letter === 'A'
    ? teamStore.teamASetupDto
    : teamStore.teamBSetupDto;
});
const teamScore = computed(() => {
  return props.letter === 'A'
    ? gameInformationStore.teamAScore
    : gameInformationStore.teamBScore;
});
function updateGoal(isAdd: boolean) {
  let updateTeamAction =
    props.letter === 'A'
      ? gameInformationStore.updateTeamAGoals
      : gameInformationStore.updateTeamBGoals;
  let handleUpdate = isAdd
    ? teamScore.value.goals + 1
    : teamScore.value.goals - 1;
  if (handleUpdate < 0) return;
  updateTeamAction(handleUpdate);
  updatingScore.value = true;
  setTimeout(() => (updatingScore.value = false), 500);
}
function updatePoint(isAdd: boolean) {
  let updateTeamAction =
    props.letter === 'A'
      ? gameInformationStore.updateTeamAPoints
      : gameInformationStore.updateTeamBPoints;

  let handleUpdate = isAdd
    ? teamScore.value.points + 1
    : teamScore.value.points - 1;
  if (handleUpdate < 0) return;
  updateTeamAction(handleUpdate);
  updatingScore.value = true;
  setTimeout(() => (updatingScore.value = false), 500);
}
</script>
<style scoped></style>
