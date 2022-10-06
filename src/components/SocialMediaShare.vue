<template>
  <div class="row">
    <div class="col-12 q-pa-none">
      <q-btn
        v-if="!gameInformationStore.isTeamInfoNeeded"
        small
        fab
        dark
        color="blue lighten-1 q-mb-xs"
        :href="
          'https://twitter.com/intent/tweet?text=' +
          encodeURI(gameInformationStore.tweetInformation + '\n') +
          '&hashtags=' +
          encodeURI(gameInformationStore.hashtagString)
        "
        target="_blank"
        icon="mdi-twitter"
      >
      </q-btn>
    </div>
    <div class="col-12 q-pa-none">
      <q-btn
        v-if="!gameInformationStore.isTeamInfoNeeded"
        small
        fab
        dark
        color="whatsapp"
        :href="
          'https://api.whatsapp.com/send?text=' +
          encodeURI(gameInformationStore.tweetInformation)
        "
        target="_blank"
        icon="mdi-whatsapp"
      >
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameInformationStore } from 'src/stores/game-information-store';
const gameInformationStore = useGameInformationStore();
</script>
<style>
.icon {
  font-size: 25px;
}
</style>
