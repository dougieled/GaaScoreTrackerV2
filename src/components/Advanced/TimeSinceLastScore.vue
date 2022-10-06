<template>
  <div class="col-12">
    <h6 class="text-center q-ma-none">
      <b>{{ props.team.name }}</b> last Scored:
      <span class="text-danger">
        <b v-html="props.timeSince" />
      </span>
    </h6>
  </div>
</template>

<script setup lang="ts">
import { Team } from 'src/Models/Team';
import { PropType } from 'vue';
const props = defineProps({
  team: {
    type: Object as PropType<Team>,
    required: true,
  },
  timeSince: {
    type: String as PropType<string>,
    required: true,
  },
});
</script>
