import { defineStore } from 'pinia';
import { useTeamStore } from 'src/stores/team-store';
import StatisticDTO from 'src/dtos/StatisticDTO';
import { Statistic } from 'src/Models/Statistic';
import { useGameInformationStore } from 'src/stores/game-information-store';

interface StatisticStoreStateI {
  showStatisticsModal: boolean,
  allGameStatistics: Statistic[]
  teamLetter: string,
  statOption: string,
  subStatOption: string,
  selectedPlayer: string,
  statOptions: { label: string, value: string }[],
  subStatOptions: { label: string, value: string }[],
}

export const useStatisticStore = defineStore('statisticStore', {
  state: (): StatisticStoreStateI => ({
    showStatisticsModal: false,
    allGameStatistics: [],
    teamLetter: '',
    statOption: '',
    subStatOption: '',
    selectedPlayer: '',
    statOptions: [
      { label: 'Goal', value: 'goal' },
      { label: 'Point', value: 'point' },
      { label: 'Wide', value: 'wide' },
      { label: 'Saved', value: 'saved' },
      { label: 'Saved / our for 45', value: 'saved / out for 45' },
      { label: 'Off Post', value: 'off post' },
      { label: 'Short', value: 'short' },
      { label: 'Penalty Conceded', value: 'penalty conceded' },
      { label: 'Free Conceded', value: 'free conceded' },
      { label: 'Own Kickout Won', value: 'own kickout won' },
      { label: 'Own Kickout Lost', value: 'own kickout lost' },
      { label: 'Opposition Kickout Won', value: 'opposition kickout won' },
      { label: 'Opposition Kickout Lost', value: 'opposition kickout lost' },
    ],
    subStatOptions: [
      { label: 'From Play', value: 'from play' },
      { label: 'From Free', value: 'from free' },
      { label: 'From Penalty', value: 'from penalty' },
      { label: 'From 45', value: 'from 45' },
      { label: 'Black Card', value: 'black card' },
      { label: 'Yellow Card', value: 'yellow card' },
      { label: 'Red Card', value: 'red card' },
    ]
  }),
  getters: {
  },
  actions: {
    openStatisticsModal(letter: string) {
      this.showStatisticsModal = true
      this.teamLetter = letter
      this.selectedPlayer = ''
      this.statOption = ''
      this.subStatOption = ''
    },
    setPlayer(playerName: string) {
      this.selectedPlayer = playerName
    },
    resetStatistics() {
      this.allGameStatistics = []
    },
    resetStatisticModal() {
      this.selectedPlayer = ''
      this.statOption = ''
      this.subStatOption = ''
    },
    addStatistic() {
      const teamStore = useTeamStore()
      const dto = new StatisticDTO()
      dto.stat = this.statOption
      dto.subStat = this.subStatOption
      dto.player = this.selectedPlayer
      dto.teamLetter = this.teamLetter
      dto.team = teamStore.teamByLetter(this.teamLetter).teamName
      dto.dateTime = new Date()

      this.allGameStatistics.push(dto)
      this.checkStatisticGoal(dto)
      this.checkStatisticPoint(dto)
      this.showStatisticsModal = false
      this.resetStatisticModal()
    },
    checkStatisticGoal(dto: Statistic) {
      const gameInformationStore = useGameInformationStore()
      if (dto.stat !== 'goal') return
      dto.teamLetter === 'A' ? gameInformationStore.updateTeamAGoals(gameInformationStore.teamAScore.goals + 1) : gameInformationStore.updateTeamBGoals(gameInformationStore.teamBScore.goals + 1)

    },
    checkStatisticPoint(dto: Statistic) {
      const gameInformationStore = useGameInformationStore()
      if (dto.stat !== 'point') return
      dto.teamLetter === 'A' ? gameInformationStore.updateTeamAPoints(gameInformationStore.teamAScore.points + 1) : gameInformationStore.updateTeamBPoints(gameInformationStore.teamBScore.points + 1)

    }
  },
  persist: true,
});
