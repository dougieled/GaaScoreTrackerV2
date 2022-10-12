<template>
  <div class="row q-mb-none"></div>
  <div class="row q-col-gutter-sm q-mb-xs" style="height: 8vh">
    <div class="col-4 text-center">
      <player-card-statistics :number="13" />
    </div>
    <div class="col-4 text-center">
      <player-card-statistics :number="14" />
    </div>
    <div class="col-4 text-center">
      <player-card-statistics :number="15" />
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-xs" style="height: 8vh">
    <div class="col-4 text-center">
      <player-card-statistics :number="10" />
    </div>
    <div class="col-4 text-center">
      <player-card-statistics :number="11" />
    </div>
    <div class="col-4 text-center">
      <player-card-statistics :number="12" />
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-xs" style="height: 8vh">
    <div class="col-4 text-center">
      <player-card-statistics :number="8" />
    </div>
    <div class="col-4 text-center q-mt-sm">TEAM NAME</div>
    <div class="col-4 text-center">
      <player-card-statistics :number="9" />
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-xs" style="height: 8vh">
    <div class="col-4 text-center">
      <player-card-statistics :number="5" />
    </div>
    <div class="col-4 text-center">
      <player-card-statistics :number="6" />
    </div>
    <div class="col-4 text-center">
      <player-card-statistics :number="7" />
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-xs" style="height: 8vh">
    <div class="col-4 text-center">
      <player-card-statistics :number="2" />
    </div>
    <div class="col-4 text-center">
      <player-card-statistics :number="3" />
    </div>
    <div class="col-4 text-center">
      <player-card-statistics :number="4" />
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-xs" style="height: 8vh">
    <div class="col-4 offset-4 text-center">
      <player-card-statistics :number="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTeamStore } from 'src/stores/team-store';
import { useStatisticStore } from 'src/stores/statistic-store';

import PlayerCardStatistics from 'src/components/Advanced/Statistics/PlayerCardStatistics.vue';

const teamStore = useTeamStore();
const router = useRouter();
const statisticStore = useStatisticStore();
const routerNameIsTeamA = computed(
  () => router.currentRoute.value.name === 'TeamA'
);
const routerNameIsTeamB = computed(
  () => router.currentRoute.value.name === 'TeamB'
);
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
<style scoped></style>
