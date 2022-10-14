import { defineStore } from 'pinia';

interface ConfigurationStoreStateI {
  isDarkModeActive: boolean
}

export const useConfigurationStore = defineStore('configurationStore', {
  state: (): ConfigurationStoreStateI => ({
    isDarkModeActive: false,
  }),
  getters: {
  },
  actions: {
  },
  persist: true,
});
