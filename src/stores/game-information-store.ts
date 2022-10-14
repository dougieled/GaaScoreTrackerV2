import { defineStore } from 'pinia';
import { Team } from 'src/Models/Team'
import { useStopWatchStore } from 'src/stores/stop-watch-store';
import { useTeamStore } from 'src/stores/team-store'


interface GameInformationStoreStateI {
  competition: string
  hashtagArray: string[],
  teamAScore: Team,
  teamBScore: Team,
  totalDateTimeSinceTeamAScore: Date | null,
  totalDateTimeSinceTeamBScore: Date | null,
  showResetModal: boolean,
  showSocialMediaModal: boolean
}

export const useGameInformationStore = defineStore('gameInformationStore', {
  state: (): GameInformationStoreStateI => ({
    competition: 'Test Competition',
    hashtagArray: ['GAAScoreTracker'],
    teamAScore: {
      goals: 0,
      points: 0
    },
    teamBScore: {
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
      const a = state.teamAScore.goals * 3
      const b = state.teamAScore.points
      return a + b
    },
    totalScoreTeamB(state): number {
      const a = state.teamBScore.goals * 3
      const b = state.teamBScore.points
      return a + b
    },
    tweetInformation(state): string {
      const teamStore = useTeamStore()
      const stopWatchStore = useStopWatchStore()
      const teamAScore = `${teamStore.teamASetupDto.teamName} ${state.teamAScore.goals}:${state.teamAScore.points
        } (${this.totalScoreTeamA})\n`
      const teamBScore = `${teamStore.teamBSetupDto.teamName} ${state.teamBScore.goals}:${state.teamBScore.points
        } (${this.totalScoreTeamB})\n`
      return `${state.competition}\n${teamAScore}${teamBScore}${stopWatchStore.halfOption}${this.minutesInTweet}`
    },
    minutesInTweet(): string {
      const stopWatchStore = useStopWatchStore()
      return stopWatchStore.started === true ? ' - ' + stopWatchStore.minutes + 'mins' : ''
    },
    teamInLead(state): string {
      const stopWatchStore = useStopWatchStore()
      const teamStore = useTeamStore()
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
          return `${teamStore.teamASetupDto.teamName} won by ${difference} ${points}\n`
        }
        return `${teamStore.teamASetupDto.teamName} winning by ${difference} ${points}\n`
      }
      if (this.totalScoreTeamB > this.totalScoreTeamA) {
        const difference2 = this.totalScoreTeamB - this.totalScoreTeamA
        let points2 = 'points'
        difference2 === 1 ? points2 = 'point.' : points2 = 'points.'
        if (
          stopWatchStore.halfOption === 'Full Time' ||
          stopWatchStore.halfOption === 'After Extra Time'
        ) {
          return `${teamStore.teamBSetupDto.teamName} won by ${difference2} ${points2}\n`
        }
        return `${teamStore.teamBSetupDto.teamName} winning by ${difference2} ${points2}\n`
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
      this.teamAScore = data
    },
    updateTeamAGoals(data: number) {
      this.teamAScore.goals = data
    },
    updateTeamAPoints(data: number) {
      this.teamAScore.points = data
    },
    updateTeamB(data: Team) {
      this.teamBScore = data
    },
    updateTeamBGoals(data: number) {
      this.teamBScore.goals = data
    },
    updateTeamBPoints(data: number) {
      this.teamBScore.points = data
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
