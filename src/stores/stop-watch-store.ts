/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { defineStore } from 'pinia';
import { useGameInformationStore } from './game-information-store';

interface StopWatchStoreStateI {
  halfOption: string
  started: boolean
  paused: boolean
  startDateTime: Date | null,
  dateTimeNow: Date | null,
  pausedAtDateTime: Date | null,
  showTimerResetDialog: boolean
}

export const useStopWatchStore = defineStore('StopWatchStore', {
  state: (): StopWatchStoreStateI => ({
    halfOption: '1st Half',
    started: false,
    paused: false,
    startDateTime: null,
    dateTimeNow: null,
    pausedAtDateTime: null,
    showTimerResetDialog: false,
  }),
  getters: {
    getStopwatch(state): string {
      if (state.startDateTime == null || state.dateTimeNow == null) {
        return '00:00'
      } else {
        const timeDifference = new Date(state.startDateTime).getTime() - new Date(state.dateTimeNow).getTime()

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

        return result
      }
    },
    minutes(state): number {
      const timeDifference = new Date(state.startDateTime).getTime() - new Date(state.dateTimeNow).getTime()

      // Time elapsed in seconds
      const timeElapsed = Math.abs(timeDifference / 1000)

      // Time remaining in seconds
      const timeRemaining = timeElapsed

      // Convert seconds into minutes and seconds
      const minutes = Math.floor(timeRemaining / 60)
      return minutes
    },
  },
  actions: {
    updateHalfOption(data: string) {
      this.halfOption = data
    },
    updateStarted(data: boolean) {
      this.started = data
    },
    updatePaused(data: boolean) {
      this.paused = data
    },
    updateStartDateTime(data: Date | null) {
      this.startDateTime = data
    },
    updateDateTimeNow(data: Date | null) {
      this.dateTimeNow = data
    },
    updatePausedAtDateTime(data: Date | null) {
      this.pausedAtDateTime = data
    },
    handleUnpauseTimeDifference(data: { pausedAtDateTime: Date | null, dateNow: Date | null }) {
      const diffTime = Math.abs(data.pausedAtDateTime - data.dateNow);
      const newStartedDateTime = new Date(this.startDateTime);
      newStartedDateTime.setMilliseconds(newStartedDateTime.getMilliseconds() + diffTime);
      this.startDateTime = newStartedDateTime
    },
    handleUnpause() {
      const gameInformationStore = useGameInformationStore()
      const dto = { dateNow: new Date(), pausedAtDateTime: new Date(this.pausedAtDateTime) };
      this.handleUnpauseTimeDifference(dto);
      gameInformationStore.handleUnpauseTimeDifferenceTeamALastScore(dto)
      gameInformationStore.handleUnpauseTimeDifferenceTeamBLastScore(dto)
      this.updatePaused(false)
      this.updatePausedAtDateTime(null)
    },
    resetTimer() {
      this.updateStarted(false);
      this.updatePaused(false);
      this.updatePausedAtDateTime(null);
      this.showTimerResetDialog = false;
    }
  },
  persist: true,
});
