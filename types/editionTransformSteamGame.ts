export type TEditionTransformSteamGame = {
  name: string,
  steamId: number,
  packages: {
    title: string,
    id: number,
    countries: string[]
  } []
}
