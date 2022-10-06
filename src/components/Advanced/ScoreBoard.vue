<template>
  <div class="row">
    <div class="col-12 text-center">
      <h6 class="text-center q-ma-none">
        <strong>{{ team.name }}</strong>
      </h6>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="row items-center">
        <div class="col-4 text-left q-ml-none">
          <div class="row">
            <div class="col-12">
              <span class="q-ml-sm">Goals</span>
            </div>
            <div class="col-12 q-mb-sm">
              <q-btn
                outline
                color="green"
                square
                fab
                @click="updateGoal(true)"
                :loading="updatingScore"
                :disabled="updatingScore"
                class="disable-dbl-tap-zoom"
              >
                <q-icon v-if="team.goals === 0" name="mdi-plus" dark />
                <span class="text-weight-bolder text-body1" v-else>{{
                  team.goals
                }}</span>
              </q-btn>
            </div>
            <div class="col-12">
              <q-btn
                outline
                color="red-5"
                square
                fab
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
        <div class="col-3 text-center">
          <h5 class="text-weight-bold q-ma-none">({{ totalScore }})</h5>
        </div>
        <div class="col-4 text-right">
          <div class="row">
            <div class="col-12">
              <span class="q-mr-sm">Points</span>
            </div>
            <div class="col-12 q-mb-sm">
              <q-btn
                outline
                color="green"
                square
                fab
                @click="updatePoint(true)"
                :loading="updatingScore"
                :disabled="updatingScore"
                class="disable-dbl-tap-zoom"
              >
                <q-icon v-if="team.points === 0" name="mdi-plus" dark />
                <span class="text-weight-bolder text-body1" v-else>{{
                  team.points
                }}</span>
              </q-btn>
            </div>
            <div class="col-12">
              <q-btn
                outline
                color="red-5"
                square
                fab
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
<style scoped>
.disable-dbl-tap-zoom {
  touch-action: manipulation;
}
</style>
