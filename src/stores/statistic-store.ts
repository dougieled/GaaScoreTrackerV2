import { defineStore } from 'pinia';
import { Notify } from 'quasar'

interface StatisticStoreStateI {
  showStatisticsModal: boolean,
  teamLetter: string
}

export const useStatisticStore = defineStore('statisticStore', {
  state: (): StatisticStoreStateI => ({
    showStatisticsModal: false,
    teamLetter: ''
  }),
  getters: {
  },
  actions: {
    openStatisticsModal(letter: string) {
      this.showStatisticsModal = true
      this.teamLetter = letter
    }
  },
  persist: true,
});
