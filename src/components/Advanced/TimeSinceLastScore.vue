<template>
  <div class="col-12 q-mt-xs">
    <p class="text-center q-ma-none">
      <b>{{ team.teamName }}</b> last Scored:
      <span class="text-danger">
        <b v-html="timeSince" />
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Team } from 'src/Models/Team';
import { useTeamStore } from 'src/stores/team-store';
import { useGameInformationStore } from 'src/stores/game-information-store';
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
