export type TEditionsOptions = {
  title: string,
  id: number,
  store: string,
  regions: {
    region: string,
    markup: number,
    briefDescr: string,
    fullDescr: string,
    active: boolean
  } [],
  active: boolean
}
