<template>
  <div class="col-12">
    <h6 class="text-center q-ma-none">
      <b>{{ team.teamName }}</b> last Scored:
      <span class="text-danger">
        <b v-html="timeSince" />
      </span>
    </h6>
  </div>
</template>

<script setup lang="ts">
import { useTeamStore } from 'src/stores/team-store';
import { useGameInformationStore } from 'src/stores/game-information-store';
import { Team } from 'src/Models/Team';
import { PropType, computed } from 'vue';
const gameInformationStore = useGameInformationStore();
const teamStore = useTeamStore();
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
const timeSince = computed(() => {
  return props.letter === 'A'
    ? gameInformationStore.totalTimeSinceTeamAScore
    : gameInformationStore.totalTimeSinceTeamBScore;
});
</script>
