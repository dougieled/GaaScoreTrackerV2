import { defineStore } from 'pinia';
import { Team } from 'src/Models/Team'
import { useStopWatchStore } from 'src/stores/stop-watch-store';


interface GameInformationStoreStateI {
  competition: string
  hashtagArray: string[],
  teamA: Team,
  teamB: Team,
  totalDateTimeSinceTeamAScore: Date | null,
  totalDateTimeSinceTeamBScore: Date | null,
  showResetModal: boolean,
  showSocialMediaModal: boolean
}

export const useGameInformationStore = defineStore('gameInformationStore', {
  state: (): GameInformationStoreStateI => ({
    competition: 'Test Competition',
    hashtagArray: ['GAAScoreTracker'],
    teamA: {
      name: 'Team A',
      goals: 0,
      points: 0
    },
    teamB: {
      name: 'Team B',
      goals: 0,
      points: 0
    },
    totalDateTimeSinceTeamAScore: null,
    totalDateTimeSinceTeamBScore: null,
    showResetModal: false,
    showSocialMediaModal: false
  }),
  getters: {
    hashtagString(): string {
      return this.hashtagArray.join(',')
    },
    isTeamInfoNeeded(state): boolean {
      return !!(state.teamA.name === '' || state.teamB.name === '')
    },
    totalTimeSinceTeamAScore(state): string {
      const stopWatchStore = useStopWatchStore()
      if (state.totalDateTimeSinceTeamAScore == null || stopWatchStore.dateTimeNow == null) {
        return '00:00'
      } else {
        const timeDifference = new Date(state.totalDateTimeSinceTeamAScore).getTime() - new Date(stopWatchStore.dateTimeNow).getTime()

        // Time elapsed in seconds
        const timeElapsed = Math.abs(timeDifference / 1000)

        // Time remaining in seconds
        const timeRemaining = timeElapsed

        // Convert seconds into minutes and seconds
        const minutes = Math.floor(timeRemaining / 60)
        const seconds = Math.floor(timeRemaining) - (60 * minutes)

        // Display minutes, add a 0 to the start if less than 10
        let result = (minutes < 10) ? '0' + minutes : minutes

        // Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ':0' + seconds : ':' + seconds
        state.totalDateTimeSinceTeamAScore > stopWatchStore.pausedAtDateTime

        return stopWatchStore.paused && state.totalDateTimeSinceTeamAScore > stopWatchStore.pausedAtDateTime ? '00:00' : result.toString()
      }
    },
    totalTimeSinceTeamBScore(state): string {
      const stopWatchStore = useStopWatchStore()
      if (state.totalDateTimeSinceTeamBScore == null || stopWatchStore.dateTimeNow == null) {
        return '00:00'
      } else {
        const timeDifference = new Date(state.totalDateTimeSinceTeamBScore).getTime() - new Date(stopWatchStore.dateTimeNow).getTime()

        // Time elapsed in seconds
        const timeElapsed = Math.abs(timeDifference / 1000)

        // Time remaining in seconds
        const timeRemaining = timeElapsed

        // Convert seconds into minutes and seconds
        const minutes = Math.floor(timeRemaining / 60)
        const seconds = Math.floor(timeRemaining) - (60 * minutes)

        // Display minutes, add a 0 to the start if less than 10
        let result = (minutes < 10) ? '0' + minutes : minutes

        // Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ':0' + seconds : ':' + seconds

        return stopWatchStore.paused && state.totalDateTimeSinceTeamBScore > stopWatchStore.pausedAtDateTime ? '00:00' : result.toString()
      }
    },
    totalScoreTeamA(state): number {
      const a = state.teamA.goals * 3
      const b = state.teamA.points
      return a + b
    },
    totalScoreTeamB(state): number {
      const a = state.teamB.goals * 3
      const b = state.teamB.points
      return a + b
    },
    tweetInformation(state): string {
      const stopWatchStore = useStopWatchStore()
      const teamAScore = `${state.teamA.name} ${state.teamA.goals}:${state.teamA.points
        } (${this.totalScoreTeamA})\n`
      const teamBScore = `${state.teamB.name} ${state.teamB.goals}:${state.teamB.points
        } (${this.totalScoreTeamB})\n`
      return `${state.competition}\n${teamAScore}${teamBScore}${stopWatchStore.halfOption}${this.minutesInTweet}`
    },
    minutesInTweet(): string {
      const stopWatchStore = useStopWatchStore()
      return stopWatchStore.started === true ? ' - ' + stopWatchStore.minutes + 'mins' : ''
    },
    teamInLead(state): string {
      const stopWatchStore = useStopWatchStore()
      // IF time == FT AET
      if (this.totalScoreTeamA > this.totalScoreTeamB) {
        const difference = this.totalScoreTeamA - this.totalScoreTeamB
        // Point or Points
        let points = 'points'
        difference === 1 ? points = 'point.' : points = 'points.'
        if (
          stopWatchStore.halfOption === 'Full Time' ||
          stopWatchStore.halfOption === 'After Extra Time'
        ) {
          return `${state.teamA.name} won by ${difference} ${points}\n`
        }
        return `${state.teamA.name} winning by ${difference} ${points}\n`
      }
      if (this.totalScoreTeamB > this.totalScoreTeamA) {
        const difference2 = this.totalScoreTeamB - this.totalScoreTeamA
        let points2 = 'points'
        difference2 === 1 ? points2 = 'point.' : points2 = 'points.'
        if (
          stopWatchStore.halfOption === 'Full Time' ||
          stopWatchStore.halfOption === 'After Extra Time'
        ) {
          return `${state.teamB.name} won by ${difference2} ${points2}\n`
        }
        return `${state.teamB.name} winning by ${difference2} ${points2}\n`
      }
      return 'All Level. \n'
    }
  },
  actions: {
    updateCompetitionName(data: string) {
      this.competition = data
    },
    updateHashtagArray(data: string[]) {
      this.hashtagArray = data
    },
    updateTeamA(data: Team) {
      this.teamA = data
    },
    updateTeamAName(data: string) {
      this.teamA.name = data
    },
    updateTeamAGoals(data: number) {
      this.teamA.goals = data
    },
    updateTeamAPoints(data: number) {
      this.teamA.points = data
    },
    updateTeamB(data: Team) {
      this.teamB = data
    },
    updateTeamBName(data: string) {
      this.teamB.name = data
    },
    updateTeamBGoals(data: number) {
      this.teamB.goals = data
    },
    updateTeamBPoints(data: number) {
      this.teamB.points = data
    },
    updateTotalDateTimeSinceTeamAScore(data: Date) {
      this.totalDateTimeSinceTeamAScore = data
    },
    updateTotalDateTimeSinceTeamBScore(data: Date) {
      this.totalDateTimeSinceTeamBScore = data
    },
    updateShowResetModal(data: boolean) {
      this.showResetModal = data
    },
    handleUnpauseTimeDifferenceTeamALastScore(data: { pausedAtDateTime: Date, dateNow: Date }) {
      if (this.totalDateTimeSinceTeamAScore > data.pausedAtDateTime) {
        this.totalDateTimeSinceTeamAScore = data.dateNow
      } else {
        const diffTime = Math.abs(data.pausedAtDateTime - data.dateNow);
        const newStartedDateTime = new Date(this.totalDateTimeSinceTeamAScore);
        newStartedDateTime.setMilliseconds(newStartedDateTime.getMilliseconds() + diffTime);
        this.totalDateTimeSinceTeamAScore = newStartedDateTime
      }

    },
    handleUnpauseTimeDifferenceTeamBLastScore(data: { pausedAtDateTime: Date, dateNow: Date }) {
      if (this.totalDateTimeSinceTeamBScore !== null && this.totalDateTimeSinceTeamBScore > data.pausedAtDateTime) {
        this.totalDateTimeSinceTeamBScore = data.dateNow
      } else {
        const diffTime = Math.abs(data.pausedAtDateTime - data.dateNow);

        const newStartedDateTime = new Date(this.totalDateTimeSinceTeamBScore);
        newStartedDateTime.setMilliseconds(newStartedDateTime.getMilliseconds() + diffTime);
        this.totalDateTimeSinceTeamBScore = newStartedDateTime
      }
    }
  },
  persist: true,
});
