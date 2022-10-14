<template>
  <div class="row items-center q-pl-sm q-pr-sm q-mt-sm">
    <div class="col-12">
      <q-form ref="settings" v-model="valid" lazy-validation>
        <q-input
          label="Team A Name"
          :rules="[(v) => !!v || 'Team A Name is required']"
          required
          v-model="teamAName"
        ></q-input>
        <q-input
          label="Team B Name"
          :rules="[(v) => !!v || 'Team B Name is required']"
          required
          v-model="teamBName"
        ></q-input>
        <q-input
          label="Competition Name"
          :rules="[(v) => !!v || 'Competition Name is required']"
          required
          v-model="competitionName"
        ></q-input>
      </q-form>
    </div>
    <div class="col-12">
      <q-input
        label="Insert Hashtag"
        ref="hashtagField"
        :rules="[
          (v) =>
            (!!v && v.length >= 3) ||
            'Hashtag must be a minimum of 3 characters',
        ]"
        v-model="selectedHashtag"
      >
        <template v-slot:append>
          <q-btn
            block
            round
            color="green darken-2"
            @click="addToArray"
            icon="mdi-plus"
            dark
          ></q-btn>
        </template>
      </q-input>
    </div>

    <div class="col-6" v-for="(item, index) in hashtagArray" :key="index">
      <p>
        #{{ item }} -
        <q-btn
          flat
          round
          icon="mdi-delete"
          color="red"
          size="md"
          @click="removeHashtag(index)"
        />
      </p>
    </div>
    <div class="col-12 q-mt-md">
      <q-btn
        color="green darken-3"
        @click="updateSettings"
        dark
        class="full-width"
        >Update</q-btn
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGameInformationStore } from 'src/stores/game-information-store';
import { useTeamStore } from 'src/stores/team-store';
import { useRouter } from 'vue-router';
const router = useRouter();
const gameInformationStore = useGameInformationStore();
const teamStore = useTeamStore();
onMounted(() => {
  bindStateData();
});
const hashtagField = ref();
const settings = ref();
const valid = ref<boolean>(true);
const teamAName = ref<string>('');
const teamBName = ref<string>('');
const competitionName = ref<string>('');
const selectedHashtag = ref<string>('');
const hashtagArray = ref<string[]>([]);

function bindStateData() {
  teamAName.value = teamStore.teamASetupDto.teamName;
  teamBName.value = teamStore.teamBSetupDto.teamName;
  competitionName.value = gameInformationStore.competition;
  hashtagArray.value = gameInformationStore.hashtagArray;
}
function addToArray() {
  if (hashtagField.value.validate()) {
    hashtagArray.value.push(selectedHashtag.value.replace('#', ''));
    selectedHashtag.value = '';
    gameInformationStore.updateHashtagArray(hashtagArray.value);

    hashtagArray.value = gameInformationStore.hashtagArray;
  }
}
function updateSettings() {
  settings.value.validate().then(async (success: boolean) => {
    if (success) {
      teamStore.updateTeamAName(teamAName.value);
      teamStore.updateTeamBName(teamBName.value);
      gameInformationStore.updateCompetitionName(competitionName.value);
      gameInformationStore.updateHashtagArray(hashtagArray.value);
      router.push('/');
    }
  });
}
function removeHashtag(index: number) {
  hashtagArray.value.splice(index, 1);
}
</script>
<style></style>
