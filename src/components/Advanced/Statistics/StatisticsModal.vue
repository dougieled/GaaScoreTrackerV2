<template>
  <q-dialog v-model="statisticStore.showStatisticsModal" full-width full-height>
    <q-card>
      <q-card-section class="row q-pb-none">
        <div class="text-h6">{{ team.teamName }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="row items-center">
        <div class="col-12 q-mb-sm">
          <q-select
            emit-value
            dense
            outlined
            v-model="statOption"
            :options="statOptions"
            class="q-pb-none"
            map-options
            label="Statistic Type:"
            :popup-content-style="{ maxHeight: '300px' }"
          />
        </div>
        <div class="col-12">
          <q-select
            emit-value
            dense
            outlined
            v-model="subStatOption"
            :options="subStatOptions"
            class="q-pb-none"
            map-options
            label="Sub Statistic Type:"
            :popup-content-style="{ maxHeight: '300px' }"
          />
        </div>
      </q-card-section>
      <q-card-section class="col-12 items-center">
        <team-setup-statistics />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="OK" color="green" v-close-popup />
        <q-btn label="RESET" color="secondary" v-close-popup />
        <q-btn label="Cancel" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import TeamSetupStatistics from 'src/components/Advanced/Statistics/TeamSetupStatistics.vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
import { useTeamStore } from 'src/stores/team-store';
import { useStatisticStore } from 'src/stores/statistic-store';

import { computed, ref } from 'vue';
const gameInformationStore = useGameInformationStore();
const teamStore = useTeamStore();
const statisticStore = useStatisticStore();
const statOption = ref<string>('');
const subStatOption = ref<string>('');
const statOptions = ref<{ label: string; value: string }[]>([
  { label: 'Goal', value: 'goal' },
  { label: 'Point', value: 'point' },
  { label: 'Wide', value: 'wide' },
  { label: 'Saved', value: 'saved' },
  { label: 'Saved / our for 45', value: 'saved / out for 45' },
  { label: 'Off Post', value: 'off post' },
  { label: 'Short', value: 'short' },
  { label: 'Penalty Conceded', value: 'penalty conceded' },
  { label: 'Free Conceded', value: 'free conceded' },
  { label: 'Own Kickout Won', value: 'own kickout won' },
  { label: 'Own Kickout Lost', value: 'own kickout lost' },
  { label: 'Opposition Kickout Won', value: 'opposition kickout won' },
  { label: 'Opposition Kickout Lost', value: 'opposition kickout lost' },
]);
const subStatOptions = ref<{ label: string; value: string }[]>([
  { label: 'From Play', value: 'from play' },
  { label: 'From Free', value: 'from free' },
  { label: 'From Penalty', value: 'from penalty' },
  { label: 'From 45', value: 'from 45' },
  { label: 'Black Card', value: 'black card' },
  { label: 'Yellow Card', value: 'yellow card' },
  { label: 'Red Card', value: 'red card' },
]);
const team = computed(() => {
  return statisticStore.teamLetter === 'A'
    ? teamStore.teamASetupDto
    : teamStore.teamBSetupDto;
});
const teamScore = computed(() => {
  return statisticStore.teamLetter === 'A'
    ? gameInformationStore.teamA
    : gameInformationStore.teamB;
});
</script>
<style></style>
