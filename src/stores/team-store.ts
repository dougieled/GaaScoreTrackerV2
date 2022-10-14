import { defineStore } from 'pinia';
import TeamSetupDTO from 'src/dtos/TeamSetupDTO';
import { TeamSetup } from 'src/Models/TeamSetup'
import { Notify } from 'quasar'

interface TeamStoreStateI {
  teamASetupDto: TeamSetup,
  teamBSetupDto: TeamSetup,
  defaultTeamSetupDto: TeamSetup,
  allTeams: TeamSetup[],
  loadSaveTeamModal: boolean,
}

export const useTeamStore = defineStore('teamStore', {
  state: (): TeamStoreStateI => ({
    teamASetupDto: new TeamSetupDTO('Team A'),
    teamBSetupDto: new TeamSetupDTO('Team B'),
    defaultTeamSetupDto: new TeamSetupDTO(),
    allTeams: [],
    loadSaveTeamModal: false
  }),
  getters: {
    isTeamInfoNeeded(state): boolean {
      return !!(state.teamASetupDto.teamName === '' || state.teamBSetupDto.teamName === '')
    },
    teamByLetter: (state) => (letter: string) => {
      return letter === 'A' ? state.teamASetupDto : state.teamBSetupDto
    },
  },
  actions: {
    saveTeam() {
      const isTeamA = this.router.currentRoute.value.name === 'TeamA'
      const team = isTeamA ? this.teamASetupDto : this.teamBSetupDto;
      const teamIndex = this.allTeams.findIndex(x => x.teamName.toLowerCase() === team.teamName.toLowerCase())
      console.log(teamIndex)
      if (teamIndex > -1) {
        this.allTeams.splice(teamIndex, 1, team)
        Notify.create({
          color: 'positive', message: 'Team updated successfully', icon: 'done'
        })
        return
      }
      this.allTeams.push(team)
      Notify.create({
        color: 'positive', message: 'Team created successfully', icon: 'done'
      })


    },
    loadTeam(team: TeamSetup) {
      const isTeamA = this.router.currentRoute.value.name === 'TeamA'
      console.log(team)
      isTeamA ? this.teamASetupDto = team : this.teamBSetupDto = team;
      console.log(this.teamASetupDto)
      this.loadSaveTeamModal = false
      Notify.create({
        color: 'positive', message: 'Team loaded', icon: 'done'
      })
    },
    resetTeam() {
      const isTeamA = this.router.currentRoute.value.name === 'TeamA'
      isTeamA ? this.teamASetupDto = this.defaultTeamSetupDto : this.teamBSetupDto = this.defaultTeamSetupDto;
      Notify.create({
        color: 'positive', message: 'Team reset', icon: 'done'
      })
    },
    resetTeams() {
      this.teamASetupDto = this.defaultTeamSetupDto
      this.teamBSetupDto = this.defaultTeamSetupDto
    },
    updateTeamAName(data: string) {
      this.teamASetupDto.teamName = data
    },
    updateTeamBName(data: string) {
      this.teamBSetupDto.teamName = data
    },
  },
  persist: true,
});
