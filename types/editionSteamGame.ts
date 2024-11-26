export type TEditionSteamGame = {
  countryRestricted: boolean,
  id: number,
  name: string,
  iconUrl: string | null,
  visible: boolean,
  purchaseOptions: {
    country: string,
    discountAmount: null | number,
    discountEndDate: null | number,
    discountPercent: number,
    finalPrice: number,
    id: number,
    isGiftable: boolean,
    name: string,
    originalPrice: number,
  }[]
}
