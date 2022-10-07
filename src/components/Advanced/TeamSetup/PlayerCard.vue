<template>
  <q-card class="cursor-pointer full-height">
    <q-card-section class="q-pb-xs q-pl-none q-pr-none q-pt-sm">
      <span style="font-size: 10px">
        {{
          routerNameIsTeamA
            ? teamStore.teamASetupDto.players[number].name
              ? teamStore.teamASetupDto.players[number].name
              : number
            : teamStore.teamBSetupDto.players[number].name
            ? teamStore.teamBSetupDto.players[number].name
            : number
        }}
      </span>
    </q-card-section>
    <q-popup-edit
      v-if="routerNameIsTeamA"
      v-model="teamStore.teamASetupDto.players[number].name"
      auto-save
      buttons
      label-set="Update"
      v-slot="scope"
    >
      <slot name="title">Update Player Name</slot>
      <q-input
        v-model="scope.value"
        dense
        autofocus
        counter
        @keyup.enter="scope.set"
      />
    </q-popup-edit>
    <q-popup-edit
      v-else
      v-model="teamStore.teamBSetupDto.players[number].name"
      auto-save
      buttons
      label-set="Update"
      v-slot="scope"
    >
      <slot name="title">Update Player Name</slot>
      <q-input
        v-model="scope.value"
        dense
        autofocus
        counter
        @keyup.enter="scope.set"
      />
    </q-popup-edit>
  </q-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useTeamStore } from 'src/stores/team-store';
import { computed } from 'vue';
const teamStore = useTeamStore();

const router = useRouter();

const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
});
const routerNameIsTeamA = computed(
  () => router.currentRoute.value.name === 'TeamA'
);
</script>
<style scoped></style>
