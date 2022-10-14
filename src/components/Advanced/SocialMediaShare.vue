<template>
  <q-btn
    square
    fab-mini
    color="secondary"
    class="disable-dbl-tap-zoom q-mr-xs"
    @click="gameInformationStore.showSocialMediaModal = true"
    icon="mdi-share-variant-outline"
  >
  </q-btn>
  <social-media-modal />
</template>

<script setup lang="ts">
import { useGameInformationStore } from 'src/stores/game-information-store';
import SocialMediaModal from 'src/components/Advanced/SocialMediaModal.vue';
const gameInformationStore = useGameInformationStore();
</script>
<style></style>
