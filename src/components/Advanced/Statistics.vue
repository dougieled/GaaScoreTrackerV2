<template>
  <div class="col-12 text-center q-pr-xs q-mt-sm">
    <q-btn outline color="secondary" class="disable-dbl-tap-zoom full-width">
      Enter Stats
    </q-btn>
  </div>
</template>
<script setup lang="ts">
import { Team } from 'src/Models/Team';
import { PropType } from 'vue';
const props = defineProps({
  team: {
    type: Object as PropType<Team>,
    required: true,
  },
  letter: {
    type: String as PropType<string>,
    required: true,
  },
});
</script>
<style></style>
