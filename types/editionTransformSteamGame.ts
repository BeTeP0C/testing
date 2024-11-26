export type TEditionTransformSteamGame = {
  name: string,
  steamId: number,
  iconUrl: string | null,
  countryRestricted: boolean,
  packages: {
    title: string,
    id: number,
    countries: string[]
  } []
}
