<template>
  <div class="col-12">
    <table class="myTable">
      <thead>
        <tr>
          <th class="text-left">
            Score <br />
            1-03(6)
          </th>
          <th class="text-right">Total</th>
          <th class="text-right">From <br />Play</th>
          <th class="text-right">From 45 <br />peno</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">Goals</td>
          <td class="text-right">1</td>
          <td class="text-right">0</td>
          <td class="text-right">0</td>
        </tr>
        <tr>
          <td class="text-left">Points</td>
          <td class="text-right">1</td>
          <td class="text-right">0</td>
          <td class="text-right">0</td>
        </tr>
        <tr>
          <td class="text-left">Wides</td>
          <td class="text-right">1</td>
          <td class="text-right">0</td>
          <td class="text-right">0</td>
        </tr>
        <tr>
          <td class="text-left">
            Out for<br />
            45
          </td>
          <td class="text-right">1</td>
          <td class="text-right">0</td>
          <td class="text-right">0</td>
        </tr>
        <tr>
          <td class="text-left">Off Posts</td>
          <td class="text-right">1</td>
          <td class="text-right">0</td>
          <td class="text-right">0</td>
        </tr>
        <tr>
          <td class="text-left">Saved</td>
          <td class="text-right">1</td>
          <td class="text-right">0</td>
          <td class="text-right">0</td>
        </tr>
        <tr>
          <td class="text-left">Short</td>
          <td class="text-right">1</td>
          <td class="text-right">0</td>
          <td class="text-right">0</td>
        </tr>
        <tr>
          <td colspan="4" class="text-left">
            Total Shots: 2 <br />Scored : 1 (50%)
          </td>
        </tr>
        <tr>
          <td colspan="4" class="text-left">
            Shots from play: 1<br />
            Scored : 1 (100%)
          </td>
        </tr>
        <tr>
          <td colspan="4" class="text-left">
            Shots from free/pen/45: 1<br />
            Scored : 0 (0%)
          </td>
        </tr>
        <tr>
          <td colspan="4" class="text-left">Frees conceded : 0</td>
        </tr>
        <tr>
          <td colspan="4" class="text-left">Total Own Puck/Kick Outs : 0</td>
        </tr>
        <tr>
          <td colspan="4" class="text-left">Won : 0 0%</td>
        </tr>
        <tr>
          <td colspan="4" class="text-left">Lost : 0 0%</td>
        </tr>
        <tr>
          <td colspan="4" class="text-left">Cards</td>
        </tr>
        <tr>
          <td colspan="4" class="text-left">Subs Used : 0</td>
        </tr>
      </tbody>
    </table>
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
    ? gameInformationStore.teamAScore
    : gameInformationStore.teamBScore;
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
<style scoped>
.myTable {
  background-color: #eee;
  border-collapse: collapse;
}
.myTable th {
  background-color: #000;
  color: white;
  width: 0%;
}
.myTable td,
.myTable th {
  padding: 1px;
  border: 1px solid #000;
}
</style>
