<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-green-7 text-black">
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleDrawer"
        /> -->
        <img
          class="cursor-pointer"
          src="../assets/gst5050.png"
          height="40"
          width="40"
        />
        <q-toolbar-title> GAA Score Tracker </q-toolbar-title>
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
      <q-toolbar>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-btn
            flat
            :active="menuItem.routeName === route.name"
            :icon="menuItem.icon"
            size="md"
            :color="menuItem.routeName === route.name ? 'secondary' : 'grey'"
            :to="{ name: menuItem.routeName }"
            stack
          >
            {{ menuItem.label }}
          </q-btn>
          <q-space />
        </template>
        <q-btn
          flat
          icon="mdi-restart"
          size="md"
          color="red"
          active-class="text-baby-blue"
          @click="openResetModal"
          stack
        >
          RESET
        </q-btn>
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

const drawer = ref<boolean>(false);

const menuList = ref<
  Array<{ icon: string; label: string; routeName: string; separator: boolean }>
>([
  {
    icon: 'home',
    label: 'Home',
    routeName: 'Home',
    separator: true,
  },
  {
    icon: 'settings',
    label: 'Settings',
    routeName: 'Settings',
    separator: false,
  },
  {
    icon: 'account_circle',
    label: 'MyAccount',
    routeName: 'MyAccount',
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
