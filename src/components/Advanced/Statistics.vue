<template>
  <div class="col-12 text-center q-pr-xs q-mt-sm">
    <q-btn outline color="secondary" class="disable-dbl-tap-zoom full-width">
      Enter Stats
    </q-btn>
  </div>
</template>
<script setup lang="ts">
import { useGameInformationStore } from 'src/stores/game-information-store';
import { useTeamStore } from 'src/stores/team-store';

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
const teamScore = computed(() => {
  return props.letter === 'A'
    ? gameInformationStore.teamA
    : gameInformationStore.teamB;
});
</script>
<style></style>
