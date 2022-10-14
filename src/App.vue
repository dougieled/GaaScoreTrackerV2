<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useConfigurationStore } from 'src/stores/configuration-store';
const $q = useQuasar();
const configurationStore = useConfigurationStore();

// calling here; equivalent to when component is created
$q.dark.set(configurationStore.isDarkModeActive);
</script>
<style lang="scss">
.disable-dbl-tap-zoom {
  touch-action: manipulation;
}
</style>
