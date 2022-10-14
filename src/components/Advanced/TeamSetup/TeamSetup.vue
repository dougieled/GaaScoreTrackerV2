<template>
  <div class="row q-mb-none">
    <div class="col-12 text-center">
      <p class="q-mb-none">
        Enter players names to their corresponding number by tapping on the
        boxes and filling out their names.
      </p>
      <h6 class="q-mt-none q-mb-sm">
        {{
          routerNameIsTeamA
            ? teamStore.teamASetupDto.teamName
              ? teamStore.teamASetupDto.teamName
              : 'Team A'
            : teamStore.teamBSetupDto.teamName
            ? teamStore.teamBSetupDto.teamName
            : 'Team B'
        }}

        <q-icon color="positive" name="mdi-pencil-outline" size="sm" />
        <q-popup-edit
          v-if="routerNameIsTeamA"
          v-model="teamStore.teamASetupDto.teamName"
          auto-save
          buttons
          label-set="Update"
          v-slot="scope"
        >
          <slot name="title">Update Team Name</slot>
          <q-input
            v-model="scope.value"
            dense
            autofocus
            counter
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
        <q-popup-edit
          v-if="routerNameIsTeamB"
          v-model="teamStore.teamBSetupDto.teamName"
          auto-save
          buttons
          label-set="Update"
          v-slot="scope"
        >
          <slot name="title">Update Team Name</slot>
          <q-input
            v-model="scope.value"
            dense
            autofocus
            counter
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </h6>
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-sm" style="height: 8vh">
    <div class="col-4 text-center">
      <player-card :number="13" />
    </div>
    <div class="col-4 text-center">
      <player-card :number="14" />
    </div>
    <div class="col-4 text-center">
      <player-card :number="15" />
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-sm" style="height: 8vh">
    <div class="col-4 text-center">
      <player-card :number="10" />
    </div>
    <div class="col-4 text-center">
      <player-card :number="11" />
    </div>
    <div class="col-4 text-center">
      <player-card :number="12" />
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-sm" style="height: 8vh">
    <div class="col-4 offset-2 text-center">
      <player-card :number="8" />
    </div>
    <div class="col-4 text-center">
      <player-card :number="9" />
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-sm" style="height: 8vh">
    <div class="col-4 text-center">
      <player-card :number="5" />
    </div>
    <div class="col-4 text-center">
      <player-card :number="6" />
    </div>
    <div class="col-4 text-center">
      <player-card :number="7" />
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-sm" style="height: 8vh">
    <div class="col-4 text-center">
      <player-card :number="2" />
    </div>
    <div class="col-4 text-center">
      <player-card :number="3" />
    </div>
    <div class="col-4 text-center">
      <player-card :number="4" />
    </div>
  </div>
  <div class="row q-col-gutter-sm q-mb-md" style="height: 8vh">
    <div class="col-4 offset-4 text-center">
      <player-card :number="1" />
    </div>
  </div>
  <team-actions />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTeamStore } from 'src/stores/team-store';

import PlayerCard from 'src/components/Advanced/TeamSetup/PlayerCard.vue';
import TeamActions from 'src/components/Advanced/TeamSetup/TeamActions.vue';

const teamStore = useTeamStore();
const router = useRouter();
const routerNameIsTeamA = computed(
  () => router.currentRoute.value.name === 'TeamA'
);
const routerNameIsTeamB = computed(
  () => router.currentRoute.value.name === 'TeamB'
);
</script>
<style scoped></style>
