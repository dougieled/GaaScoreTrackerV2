<template>
  <div class="row q-col-gutter-sm q-mb-md">
    <div class="col-4 text-center">
      <q-btn
        @click="teamStore.saveTeam()"
        dense
        outline
        color="info"
        class="disable-dbl-tap-zoom full-width full-height"
      >
        Save Team
      </q-btn>
    </div>
    <div class="col-4 text-center">
      <q-btn
        dense
        outline
        color="info"
        class="disable-dbl-tap-zoom full-width full-height"
      >
        Make Sub
      </q-btn>
    </div>
    <div class="col-4 text-center">
      <q-btn
        dense
        outline
        color="info"
        class="disable-dbl-tap-zoom full-width full-height"
      >
        View Subs
      </q-btn>
    </div>
    <div class="col-4 text-center">
      <load-saved-team />
    </div>
    <div class="col-4 text-center">
      <q-btn
        dense
        outline
        color="info"
        class="disable-dbl-tap-zoom full-width full-height"
        @click="teamStore.resetTeam()"
      >
        Reset Team
      </q-btn>
    </div>
    <div class="col-4 text-center">
      <q-btn
        dense
        outline
        color="info"
        class="disable-dbl-tap-zoom full-width full-height"
      >
        Create New Team
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadSavedTeam from './TeamActions/LoadSavedTeam.vue';
import { useTeamStore } from 'src/stores/team-store';
const teamStore = useTeamStore();
</script>
<style scoped></style>
