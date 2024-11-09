import { MagazineStore } from "../common/store"

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

export type TGameError = {
  errorMessage: string,
  visible: boolean,
  activate: boolean
}

export type TGameFirstPageErrors = TGameError[]
