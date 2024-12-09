export type TFirstPageAddForm = {
  titleName: string,
  appId: number | null,
  foundGame: {
    titleGame: string,
    urlImg: string | null,
    countryRestricted: boolean,
    amountCountry: number
  },
  selectEditions: TGameEdition[],
  choiceEditions: TGameEdition[]
}

export type TSecondPageAddForm = {
  titleEdition: string,
  active: boolean,
  posted: boolean,
  id: number,
  stores: {
    titleStore: string,
    active: boolean,
    markup: number,
    regions: {
      titleRegion: string,
      active: boolean,
      isGlobal: boolean,
      shortDescr: string,
      fullDescr: string,
      price: number
    }[]
  } []
}[]

export type TGameEdition = {
  title: string,
  countries: {
    country: string,
    price: number
  }[],
  id: number,
}

export type TSteamGameData = {
  id: number,
  name: string,
  visible: boolean,
  countryRestricted: boolean,
  iconUrl: string | null,
  purchaseOptions: TSteamGameDataCountry[]
}

export type TSteamGameCountry = {
  id: number,
  name: string,
  countries: {
    country: string,
    price: number
  }[],
  originalPrice: number,
  finalPrice: number,
  discountPercent: number,
  discountAmount: number | null,
  discountEndDate: number | null,
  isGiftable: boolean
}

export type TSteamGameDataCountry = {
  id: number,
  name: string,
  country: string,
  originalPrice: number,
  finalPrice: number,
  discountPercent: number,
  discountAmount: number | null,
  discountEndDate: number | null,
  isGiftable: boolean
}
