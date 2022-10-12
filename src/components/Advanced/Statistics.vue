<template>
  <div class="col-12 text-center q-pr-xs q-mt-sm">
    <q-btn
      outline
      color="secondary"
      class="disable-dbl-tap-zoom full-width"
      @click="statisticStore.openStatisticsModal(props.letter)"
    >
      Enter Stats
    </q-btn>
  </div>
</template>
<script setup lang="ts">
import { useStatisticStore } from 'src/stores/statistic-store';

import { PropType } from 'vue';
const statisticStore = useStatisticStore();
const props = defineProps({
  letter: {
    type: String as PropType<string>,
    required: true,
  },
});
</script>
<style></style>
