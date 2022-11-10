<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useConfigurationStore } from 'src/stores/configuration-store';
import { apiURLENV } from 'src/app.config.js';
const $q = useQuasar();
const configurationStore = useConfigurationStore();

// calling here; equivalent to when component is created
$q.dark.set(configurationStore.isDarkModeActive);
onMounted(() => {
  console.log('apiURLENV', apiURLENV);
  console.log(import.meta.env.VITE_APP_API_URL);
});
</script>
<style lang="scss">
.disable-dbl-tap-zoom {
  touch-action: manipulation;
}
</style>
