<template>
  <q-dialog
    v-model="gameInformationStore.showSocialMediaModal"
    persistent
    full-width
  >
    <q-card>
      <q-card-section class="row items-center" @click="openTwitter()">
        <q-avatar
          icon="mdi-twitter"
          color="blue"
          text-color="white"
          class="disable-dbl-tap-zoom cursor-pointer"
        />
        <span class="q-ml-sm">Share to Twitter</span>
      </q-card-section>

      <q-card-section class="row items-center" @click="openWhatsapp()">
        <q-avatar icon="mdi-whatsapp" color="whatsapp" text-color="white" />
        <span class="q-ml-sm">Share to Whatsapp</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useGameInformationStore } from 'src/stores/game-information-store';
const gameInformationStore = useGameInformationStore();

function openTwitter() {
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURI(
      gameInformationStore.tweetInformation + '\n'
    )}&hashtags=${encodeURI(gameInformationStore.hashtagString)}`,
    '_blank'
  );
  gameInformationStore.showSocialMediaModal = false;
}
function openWhatsapp() {
  window.open(
    `https://api.whatsapp.com/send?text=${encodeURI(
      gameInformationStore.tweetInformation
    )}`,
    '_blank'
  );
  gameInformationStore.showSocialMediaModal = false;
}
</script>
<style></style>
