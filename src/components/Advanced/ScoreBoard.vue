<template>
  <div class="row">
    <div class="col-12 text-center">
      <h6 class="text-center q-ma-none">
        <strong>{{
          team.teamName ? team.teamName : `Team ${props.letter}`
        }}</strong>
      </h6>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="row items-end">
        <div class="col-3 text-left">
          <div class="row">
            <div class="col-12">
              <span class="q-ml-sm">Goals</span>
            </div>
            <div class="col-12 q-mb-sm">
              <q-btn
                color="green"
                square
                fab
                @click="updateGoal(true)"
                :loading="updatingScore"
                :disabled="updatingScore"
                class="disable-dbl-tap-zoom"
                icon="mdi-plus"
              >
              </q-btn>
            </div>
            <div class="col-12">
              <q-btn
                color="red-5"
                square
                fab
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
        <div class="col-6 text-center">
          <h4 class="text-weight-bold q-ma-none">{{ totalScore }}</h4>
          <h5 class="q-ma-none">
            ({{ teamScore.goals }}-{{ teamScore.points }})
          </h5>
          <statistics :letter="props.letter" />
        </div>
        <div class="col-3 text-right">
          <div class="row q-mr-xs">
            <div class="col-12">
              <span class="q-mr-sm">Points</span>
            </div>
            <div class="col-12 q-mb-sm">
              <q-btn
                color="green"
                square
                fab
                @click="updatePoint(true)"
                :loading="updatingScore"
                :disabled="updatingScore"
                class="disable-dbl-tap-zoom"
                icon="mdi-plus"
              >
              </q-btn>
            </div>
            <div class="col-12">
              <q-btn
                color="red-5"
                square
                fab
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import Statistics from 'src/components/Advanced/Statistics.vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
import { useTeamStore } from 'src/stores/team-store';
const gameInformationStore = useGameInformationStore();
const teamStore = useTeamStore();
const updatingScore = ref<boolean>(false);
const props = defineProps({
  letter: {
    type: String as PropType<string>,
    required: true,
  },
});
const team = computed(() => {
  return props.letter === 'A'
    ? teamStore.teamASetupDto
    : teamStore.teamBSetupDto;
});
const teamScore = computed(() => {
  return props.letter === 'A'
    ? gameInformationStore.teamA
    : gameInformationStore.teamB;
});
const totalScore = computed(
  () => teamScore.value.goals * 3 + teamScore.value.points
);

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
