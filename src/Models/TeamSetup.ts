export interface TeamSetup {
  teamName: string
  players: PlayerInfo
}
export interface PlayerInfo {
  [key: string | number]: PlayerInfoObject

}
export interface PlayerInfoObject {
  name: string

}
