import { MagazineStore } from "../common/store"

// avitoItem
// :
// null
// avitoItemId
// :
// null
// funPayItem
// :
// null
// funPayItemId
// :
// null
// id
// :
// 1
// lastUpdated
// :
// "2024-10-18T19:53:38.043164Z"
// name
// :
// "COD 2"
// steamItem
// :
// {steamId: 2630, name: 'Call of Duty® 2', packages: Array(2), lastUpdated: '2024-10-18T19:53:38.043164Z'}
// steamItemId
// :
// 2630
// steamItemPackageId
// :
// 177

export type TGame = {
  avitoItem: null,
  avitoItemId: null,
  funPayItem: null,
  funPayItemId: null,
  id: number,
  lastUpdated: string,
  name: string,
  steamItem: {
    lastUpdated: number,
    name: string,
    steamItemId: number,
    steamItemPackageId: number,
    packages: TGameInfoPackage []
  },
  steamItemId: number,
  steamItemPackageId: number
}

export type TGameInfo = {
  packages: TGameInfoPackage[],
  stores: TGameInfoStore[]
}

export type TGameInfoHug = {
  currency: string,
  title: string,
  price: string
}

export type TGameInfoStore = {
  title: string,
  hugs: TGameInfoHug[]
}

export type TGameInfoPackage = {
  discount: number,
  lastUpdated: string,
  name: string,
  onSale: boolean,
  packageId: number,
  prices: {
    country: string,
    finalPrice: number,
    id: number,
    lastUpdated: string,
    originalPrice: 0,
    steamItemPackageId: number
  } [],
  restrictCountries: string []
}
