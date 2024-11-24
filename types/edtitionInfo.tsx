export type TEditionsOptions = {
  title: string,
  id: number,
  store: string,
  markup: number | null,
  regions: {
    region: string,
    briefDescr: string,
    fullDescr: string,
    active: boolean
  } [],
  price: number,
  active: boolean,
  posted: boolean,
}
