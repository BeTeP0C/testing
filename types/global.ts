export type TUserProfile = {
  username: string,
  storeName: string | null,
  funPayGoldenKey: string,
  email: string,
  countries: {
    title: string,
    usename: string,
    id: number
  }[]
}

export type TSettingsCountriesSelect = {
  title: string;
  usename: string;
  id: number;
}

export type TStateData = "alive" | "initializing" | "dead" | "loading"

export type TProduct = {
  // avitoItem: null,
  // avitoItemId: null,
  // funPayItem: TFunPayItem | null,
  active?: boolean,
  funPayItems: TFunPayItem[],
  ides: number[],
  // funPayItemId: null,
  id: number,
  lastUpdated: string,
  name: string,
  // steamItem: {
  //   lastUpdated: number,
  //   name: string,
  //   steamItemId: number,
  //   steamItemPackageId: number,
  //   packages: TGameInfoPackage []
  // },
  steamItemId: number,
  steamItemPackageId: number
}

export type TFunPayItem = {
  genre: string,
  active: boolean,
  packageId: number,
  id: number,
  internalName: string,
  stores: TFunPayStore [],
  lastUpdated: string,
  longDescriptionEn: string,
  longDescriptionRu: string,
  overpaymentPercent: number,
  shortDescriptionEn: string,
  shortDescriptionRu: string,
}

export type TFunPayStore = {
  storeName: string,
  active: boolean,
  items: TFunPaySubItem []
}

export type TFunPaySubItem = {
  funPayItemId: number,
  isActive: boolean,
  country: string,
  active: boolean,
  isDeactivatedAfterSale: boolean,
  isOwnDescription: boolean,
  lastUpdated: string,
  offerId: number,
  price: number,
  countryInfo: TFunPayCountryInfo
}

export type TFunPayCountryInfo = {
  isEdit: boolean,
  active: boolean,
  longDescriptionEn: string,
  longDescriptionRu: string,
  shortDescriptionEn: string,
  shortDescriptionRu: string
}

export type TDataGame = {
  avitoItem: null,
  avitoItemId: null,
  funPayItem: TDataFunPayItem | null,
  funPayItemId: null,
  id: number,
  lastUpdated: string,
  name: string,
  steamItem: {
    lastUpdated: number,
    name: string,
    steamItemId: number,
    steamItemPackageId: number,
    packages: TDataGameInfoPackage []
  },
  steamItemId: number,
  steamItemPackageId: number
}

export type TDataGameInfoPackage = {
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

export type TDataFunPayItem = {
  genre: string,
  // active?: boolean,
  // packageId?: number,
  id: number,
  internalName: string,
  items: TDataFunPaySubItem [],
  lastUpdated: string,
  longDescriptionEn: string,
  longDescriptionRu: string,
  overpaymentPercent: number,
  shortDescriptionEn: string,
  shortDescriptionRu: string,
}

export type TDataFunPaySubItem = {
  country: string,
  funPayItemId: number,
  isActive: boolean,
  // active?: boolean,
  isDeactivatedAfterSale: boolean,
  isOwnDescription: boolean,
  lastUpdated: string,
  longDescriptionEn: string,
  longDescriptionRu: string,
  offerId: number,
  price: number,
  shortDescriptionEn: string,
  shortDescriptionRu: string
}
