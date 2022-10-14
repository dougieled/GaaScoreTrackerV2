<template>
  <q-dialog v-model="statisticStore.showStatisticsModal" full-width full-height>
    <q-card>
      <q-card-section class="row q-pb-none">
        <div class="text-h6">
          {{
            team.teamName ? team.teamName : `Team ${statisticStore.teamLetter}`
          }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="row items-center">
        <div class="col-12 q-mb-sm">
          <q-select
            emit-value
            dense
            outlined
            v-model="statisticStore.statOption"
            :options="statisticStore.statOptions"
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
            v-model="statisticStore.subStatOption"
            :options="statisticStore.subStatOptions"
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
        <q-btn
          label="RESET"
          color="secondary"
          @click="statisticStore.resetStatisticModal()"
        />
        <q-btn
          label="OK"
          color="green"
          @click="statisticStore.addStatistic()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import TeamSetupStatistics from 'src/components/Advanced/Statistics/TeamSetupStatistics.vue';
import { useTeamStore } from 'src/stores/team-store';
import { useStatisticStore } from 'src/stores/statistic-store';

import { computed } from 'vue';
const teamStore = useTeamStore();
const statisticStore = useStatisticStore();

const team = computed(() => {
  return statisticStore.teamLetter === 'A'
    ? teamStore.teamASetupDto
    : teamStore.teamBSetupDto;
});
</script>
<style></style>
