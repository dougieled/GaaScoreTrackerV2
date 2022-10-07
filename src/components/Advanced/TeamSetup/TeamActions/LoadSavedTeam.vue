<template>
  <q-btn
    dense
    outline
    color="info"
    class="disable-dbl-tap-zoom full-width full-height"
    @click="teamStore.loadSaveTeamModal = true"
  >
    Load Saved Team
  </q-btn>
  <load-saved-team-modal />
</template>

<script setup lang="ts">
import LoadSavedTeamModal from './LoadSavedTeamModal.vue';
import { useTeamStore } from 'src/stores/team-store';
const teamStore = useTeamStore();
</script>
<style scoped></style>
