<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-green-7 text-black">
      <q-toolbar>
        <img
          class="cursor-pointer"
          src="../assets/gst5050.png"
          height="40"
          width="40"
        />
        <q-toolbar-title> GAA Score Tracker </q-toolbar-title>
        <q-btn
          flat
          icon="mdi-restart"
          size="md"
          color="red"
          class="q-pa-none q-pt-sm"
          @click="openResetModal"
          stack
        >
          RESET
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <q-footer elevated reveal class="bg-grey-9">
      <q-toolbar class="q-pl-xs q-pr-none">
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-btn
            flat
            :active="menuItem.routeName === route.name"
            :icon="menuItem.icon"
            size="sm"
            :color="menuItem.routeName === route.name ? 'teal' : 'grey'"
            :to="{ name: menuItem.routeName }"
            stack
          >
            {{ menuItem.label }}
          </q-btn>
          <q-space />
        </template>
      </q-toolbar>
    </q-footer>
    <reset-data-modal />
  </q-layout>
</template>

<script setup lang="ts">
import ResetDataModal from 'src/components/ResetDataModal.vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const gameInformationStore = useGameInformationStore();

const route = useRoute();

const menuList = ref<
  Array<{ icon: string; label: string; routeName: string; separator: boolean }>
>([
  {
    icon: 'mdi-account-group-outline',
    label: 'Team A',
    routeName: 'TeamA',
    separator: true,
  },
  {
    icon: 'mdi-account-group-outline',
    label: 'Team B',
    routeName: 'TeamB',
    separator: false,
  },
  {
    icon: 'mdi-volleyball',
    label: 'Match',
    routeName: 'Match',
    separator: false,
  },
  {
    icon: 'mdi-format-list-text',
    label: 'Stats',
    routeName: 'Statistics',
    separator: false,
  },
  {
    icon: 'mdi-clipboard-list-outline',
    label: 'Scores',
    routeName: 'Scores',
    separator: false,
  },
]);
function openResetModal() {
  gameInformationStore.updateShowResetModal(true);
}
</script>
<style scoped>
.fade-enter-active {
  animation: fade 1.4s;
}
.fade-leave-to,
.fade-leave-active {
  display: none;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
