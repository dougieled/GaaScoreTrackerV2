<template>
  <div class="row">
    <div class="col-2 text-left">
      <h6 class="q-ma-none">
        <strong>Goals</strong>
      </h6>
    </div>
    <div class="col-8 text-left">
      <h5 class="text-center q-ma-none">
        <strong>{{ team.name }}</strong>
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
          >
            <q-icon name="mdi-plus" dark />
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
          >
            <q-icon name="mdi-minus" dark />
          </q-btn>
        </div>
      </div>
    </div>
    <div class="col-8 text-center">
      <h4 class="text-weight-bold q-mt-none q-mb-none text-center">
        {{ team.goals }} : {{ team.points }}
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
          >
            <q-icon name="mdi-plus" dark />
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
          >
            <q-icon name="mdi-minus" dark />
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
import { Team } from 'src/Models/Team';
const gameInformationStore = useGameInformationStore();
const updatingScore = ref<boolean>(false);
const props = defineProps({
  team: {
    type: Object as PropType<Team>,
    required: true,
  },
  letter: {
    type: String as PropType<string>,
    required: true,
  },
});
const totalScore = computed(() => props.team.goals * 3 + props.team.points);

function updateGoal(isAdd: boolean) {
  let updateTeamAction =
    props.letter === 'A'
      ? gameInformationStore.updateTeamAGoals
      : gameInformationStore.updateTeamBGoals;
  let handleUpdate = isAdd ? props.team.goals + 1 : props.team.goals - 1;
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

  let handleUpdate = isAdd ? props.team.points + 1 : props.team.points - 1;
  if (handleUpdate < 0) return;
  updateTeamAction(handleUpdate);
  updatingScore.value = true;
  setTimeout(() => (updatingScore.value = false), 500);
}
</script>
<style scoped></style>
