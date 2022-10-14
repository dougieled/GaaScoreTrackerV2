<template>
  <q-card
    class="cursor-pointer full-height"
    :class="
      statisticStore.selectedPlayer === playerName ||
      statisticStore.selectedPlayer === props.number.toString()
        ? 'bg-grey-5'
        : ''
    "
    @click="
      statisticStore.setPlayer(
        playerName ? playerName : props.number.toString()
      )
    "
  >
    <q-card-section class="q-pb-xs q-pl-none q-pr-none q-pt-sm">
      <span v-if="playerName" style="font-size: 10px">
        {{ playerName }}
      </span>
      <span v-else style="font-size: 20px">
        {{ number }}
      </span>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useTeamStore } from 'src/stores/team-store';
import { computed } from 'vue';
import { useStatisticStore } from 'src/stores/statistic-store';
const teamStore = useTeamStore();
const statisticStore = useStatisticStore();

const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
});
const playerName = computed(() => {
  return statisticStore.teamLetter === 'A'
    ? teamStore.teamASetupDto.players[props.number].name
    : teamStore.teamBSetupDto.players[props.number].name;
});
</script>
<style scoped></style>
