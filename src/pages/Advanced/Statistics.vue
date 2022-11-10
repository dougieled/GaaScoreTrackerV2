<template>
  <q-page class="q-pl-none q-pr-none q-mt-sm">
    <div class="row">
      <div class="col-6 q-mb-sm">
        <statistics-board letter="A" />
      </div>
      <div class="col-6">
        <statistics-board letter="B" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import StatisticsBoard from 'src/components/Advanced/Statistics/StatisticsBoard.vue';
</script>
