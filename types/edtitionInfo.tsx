export type TEditionsOptions = {
  title: string,
  id: number,
  store: string,
  markup: number,
  regions: {
    region: string,
    briefDescr: string,
    fullDescr: string,
    active: boolean
  } [],
  active: boolean,
  posted: boolean,
}
