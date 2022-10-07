<template>
  <q-dialog v-model="teamStore.loadSaveTeamModal" full-width>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Load Saved Team</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="row items-center">
        <q-list dense separator bordered class="full-width">
          <q-item
            v-for="(team, index) in teamStore.allTeams"
            clickable
            v-ripple
            :key="index"
            @click="teamStore.loadTeam(team)"
          >
            <q-item-section>{{ team.teamName }}</q-item-section>
            <q-item-section avatar>
              <q-icon color="positive" name="mdi-export" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useTeamStore } from 'src/stores/team-store';
const teamStore = useTeamStore();
</script>
<style></style>
