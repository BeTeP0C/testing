import { makeAutoObservable, observable, runInAction, toJS } from "mobx";
import axios from "axios";
import jwt from "jsonwebtoken"
import { RootStore } from "./rootStore";
import { TGame } from "../../types/tgames";
import { TDataGame, TSettingsCountriesSelect } from "../../types/global";
import { settingsCountries } from "../settingsCountries";
import { TProduct, TStateData, TUserProfile } from "../../types/global";
import { countryData } from "../transformCountriesForSettings";
import { calendar } from "../calendar";

export class GlobalStore {
  rootStore: RootStore

  products: TProduct[] = []
  games: TDataGame[] = []
  userProfile: TUserProfile = {
    username: "",
    storeName: "Название магазина",
    funPayGoldenKey: "",
    email: "",
    countries: []
  }

  TOKEN: string | null =  null
  currentPage: string = 'main'
  endpoint: string = "http://147.45.74.68:35805/api/v2/"

  isAuthorizate: boolean = false
  isOpenActionsGame: boolean = false
  isStateSteam: TStateData = "dead"
  isStateFunPay: TStateData = "dead"
  isSuccessfullySaveProfile: TStateData = "dead"
  isDeleteState: TStateData = "dead"
  isTypeDeleting: "prod" | "table" = "prod"
  isOpenModal: boolean = false
  isOpenDeleteForm: boolean = false

  settingsCountriesChoice = settingsCountries

  constructor (RootStore: RootStore) {
    makeAutoObservable(this)
    this.restoreTokenFromLocalStorage()
    this.rootStore = RootStore
  }

  handleOpenModal () {
    this.isOpenModal = true
  }

  handleCloseModal () {
    this.isOpenModal = false
  }

  handleOpenDeleteForm (type: "prod" | "table" = "prod") {
    this.handleOpenModal()
    this.isOpenDeleteForm = true
    this.isTypeDeleting = type

  }

  handleCloseDeleteForm () {
    this.handleCloseModal()
    this.isOpenDeleteForm = false
  }

  getLocalGame (id: number): TProduct {
    return this.products.find(el => el.id === id)
  }

  restoreTokenFromLocalStorage () {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")

      if (token) {
        this.TOKEN = token
      }
    }
  }

  logout () {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      this.TOKEN = null
      this.isAuthorizate = false
      this.isStateSteam = "dead"
      this.isStateFunPay = "dead"
      this.userProfile = {
        username: "",
        storeName: "Название магазина",
        funPayGoldenKey: "",
        email: "",
        countries: []
      }
    }
  }

  async getGames (): Promise<TDataGame[]> {
    const resp = await axios.get(`${this.endpoint}items`, {
      headers: {
        "Authorization": `Bearer ${this.TOKEN}`,
      }
    })

    return resp.data
  }

  private transformDate (date: string) {
    const [year, mounth, day] = date.split("T")[0].split("-")
    const [hour, min] = date.split("T")[1].split(".")[0].split(":")

    return `${day} ${calendar[Number(mounth)- 1]}. ${year} ${hour}:${min}`
  }

  async getProducts () {
    this.rootStore.tableStore.isLoadingTable = true

    try {
      this.games = await this.getGames()

      runInAction(() => {
        this.products = []

        this.games.forEach(game => {
          if (this.products.some(product => product.steamItemId === game.steamItemId)) {
            this.products = this.products.map(product => {
              if (product.steamItemId === game.steamItemId) {
                return {
                  active: false,
                  id: game.id,
                  lastUpdated: game.lastUpdated,
                  name: game.name,
                  steamItemId: game.steamItemId,
                  steamItemPackageId: game.steamItemPackageId,
                  ides: [...product.ides, ...[game.id]],
                  funPayItems: game.funPayItem !== null ? [
                    ...product.funPayItems,
                    {
                      genre: game.funPayItem.genre,
                      active: false,
                      packageId: game.steamItemPackageId,
                      id: game.funPayItem.id,
                      internalName: game.funPayItem.internalName,
                      stores: [{
                        storeName: "FunPay",
                        active: false,
                        items: game.funPayItem.items.map(item => {
                          return {
                            funPayItemId: item.funPayItemId,
                            isActive: item.isActive,
                            active: false,
                            isDeactivatedAfterSale: item.isDeactivatedAfterSale,
                            isOwnDescription: item.isOwnDescription,
                            lastUpdated: item.lastUpdated,
                            offerId: item.offerId,
                            price: item.price,
                            country: item.country,
                            countryInfo: {
                              active: false,
                              isEdit: false,
                              longDescriptionEn: item.longDescriptionEn,
                              longDescriptionRu: item.longDescriptionRu,
                              shortDescriptionEn: item.shortDescriptionEn,
                              shortDescriptionRu: item.shortDescriptionRu
                            }
                          }
                        })
                      }],
                      lastUpdated: game.funPayItem.lastUpdated,
                      longDescriptionEn: game.funPayItem.longDescriptionEn,
                      longDescriptionRu: game.funPayItem.longDescriptionRu,
                      overpaymentPercent: game.funPayItem.overpaymentPercent,
                      shortDescriptionEn: game.funPayItem.shortDescriptionEn,
                      shortDescriptionRu: game.funPayItem.shortDescriptionRu,
                    }
                  ] : [...product.funPayItems]
                }
              }

              return {...product}
            })
          } else {
            this.products.push({
              active: false,
              funPayItems: game.funPayItem !== null ? [{
                ...game.funPayItem,
                active: false,
                packageId: game.steamItemPackageId,
                stores: [{
                  storeName: "FunPay",
                  active: false,
                  items: game.funPayItem.items.map(item => {
                    return {
                      funPayItemId: item.funPayItemId,
                      isActive: item.isActive,
                      active: false,
                      isDeactivatedAfterSale: item.isDeactivatedAfterSale,
                      isOwnDescription: item.isOwnDescription,
                      lastUpdated: item.lastUpdated,
                      offerId: item.offerId,
                      price: item.price,
                      country: item.country,
                      countryInfo: {
                        active: false,
                        isEdit: false,
                        longDescriptionEn: item.longDescriptionEn,
                        longDescriptionRu: item.longDescriptionRu,
                        shortDescriptionEn: item.shortDescriptionEn,
                        shortDescriptionRu: item.shortDescriptionRu
                      }
                    }
                  })
                }]
              }] : [],
              ides: [game.id],
              id: game.id,
              lastUpdated: game.lastUpdated,
              name: game.name,
              steamItemId: game.steamItemId,
              steamItemPackageId: game.steamItemPackageId
            })
          }
        })

        this.products = this.products.map(product => {
          return {
            ...product,
            lastUpdated: this.transformDate(product.lastUpdated)
          }
        })
        console.log(toJS(this.products))
      })

      runInAction(() => {
        this.rootStore.tableStore.isLoadingTable = false
      })
    } catch (error) {
      if (error.status === 401) {
        runInAction(() => {
          this.logout()
        })
      } else if (error.status === 500) {
        console.error(error.message)
      }
    }
  }

  changePage (page: string) {
    if (page !== "main") {
      this.isOpenActionsGame = false
    }

    this.currentPage = page
  }

  async checkAuth (): Promise<number> {
    try {
      const resp = await axios.get(`${this.endpoint}profile/${jwt.decode(this.TOKEN, {complete: true}).payload.sub}`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      return resp.status
    } catch (error) {
      if (error.status === 401) {
        this.logout()
      }
    }
  }

  async startLoadingPage () {
    console.log("start")
    const statusAuth = await this.checkAuth()

    if (statusAuth === 200) {
      runInAction(() => {
        this.isAuthorizate = true
      })
      const status = this.checkSteamConnect()
      this.checkFunpayKeyActive()

      if (await status !== 200) {
        await this.connectToSteam()
      }

      await this.getUserProfile()
      this.changeSettingsCountriesChoice()
      await this.getProducts()
    }
  }

  async postAuth (login: string, password: string): Promise<number> {
    try {
      const resp = await axios.post(`http://147.45.74.68:35805/api/auth`, {
        username: login,
        password: password
      })

      if (resp.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", resp.data.accessToken)
          this.TOKEN = resp.data.accessToken
          this.isAuthorizate = true
        }

        return resp.status
      }

    } catch (error) {
      this.logout()
      return error.status
    }
  }

  async checkSteamConnect () {
    try {
      const resp = await axios.get(`${this.endpoint}status`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      runInAction(() => {
        this.isStateSteam = resp.data.steam
      })

      return resp.status
    } catch (error) {
      if (error.status === 401) {
        this.logout()
      } else {
        this.isStateSteam = "dead"
      }
    }
  }

  async checkFunpayKeyActive () {
    this.isStateFunPay = "loading"

    try {
      const resp = await axios.get(`${this.endpoint}status`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      runInAction(() => {
        this.isStateFunPay = resp.data.funPay
      })
    } catch (error) {
      if (error.status === 401) {
        this.logout()
      } else {
        this.isStateFunPay = "dead"
      }
    }
  }

  setUserProfileLocal (data: any, isSave: boolean = false) {
    this.userProfile = {
      ...this.userProfile,
      username: data.username,
      storeName: data.storeName,
      funPayGoldenKey: data.funPayGoldenKey,
      countries: isSave ? data.countries : data.countries.map((el: string) => countryData[el]).filter(Boolean)
    }
  }

  async getUserProfile () {
    try {
      const resp = await axios.get(`${this.endpoint}profile/${jwt.decode(this.TOKEN, {complete: true}).payload.sub}`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      runInAction(() => {
        this.setUserProfileLocal(resp.data)
      })
    } catch (error) {
      if (error.status === 401) {
        this.logout()
      }
    }
  }

  async deleteProduct (itemId: number) {
    const resp = await axios.delete(`${this.endpoint}items/${itemId}`, {
      headers: {
        "Authorization": `Bearer ${this.TOKEN}`
      }
    })

    return resp
  }

  changeSettingsCountriesChoice () {
    this.settingsCountriesChoice = settingsCountries.map(el => {
      let flag = true
      for (let country of this.userProfile.countries) {
        console.log("Сработало")
        if (country.id === el.id) {

          flag = false
          break
        }
      }

      if (flag) {
        return el
      }
    }).filter(Boolean)
  }

  async saveUserProfile (title: string, key: string, countriesSelect: TSettingsCountriesSelect[]) {
    this.isSuccessfullySaveProfile = "loading"

    try {
      const resp = await axios.patch(`${this.endpoint}profile/${jwt.decode(this.TOKEN, {complete: true}).payload.sub}`, {
        username: jwt.decode(this.TOKEN, {complete: true}).payload.sub,
        email: title,
        storeName: title,
        countries: countriesSelect.map(el => el.usename),
        funPayGoldenKey: key
      }, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      this.setUserProfileLocal({
        username: this.userProfile.username,
        storeName: title,
        funPayGoldenKey: key,
        countries: countriesSelect
      }, true)

      this.changeSettingsCountriesChoice()

      this.checkFunpayKey(this.userProfile.funPayGoldenKey)
      await this.checkFunpayKeyActive()

      if (resp.status === 204) {
        runInAction(() => {
          this.isSuccessfullySaveProfile = "alive"
        })
        let timeout = null

        timeout = setTimeout(() => {
          runInAction(() => {
            this.isSuccessfullySaveProfile = "dead"
          })
          clearTimeout(timeout)
        }, 1500)
      }
    } catch (error) {
      this.isSuccessfullySaveProfile = "dead"
      if (error.status === 401) {
        this.logout()
      }
    }
  }

  async checkFunpayKey (key: string): Promise<number> {
    try {
      const resp = await axios.post(`${this.endpoint}funpay?goldenKey=${key}`, null, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      return resp.status
    } catch (error) {
      return error.status
    }
  }

  async connectToSteam () {
    this.isStateSteam = "loading"

    try {
      const resp = await axios.post(`${this.endpoint}steam`, null, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        },
      })

      if (resp.status === 204) {
        await this.checkSteamConnect()
      }
    } catch (error) {
      this.isStateSteam = "dead"
    }
  }

  async deleteSteamItemData (itemId: number) {
    try {
      const resp = await axios.delete(`${this.endpoint}items/${itemId}`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      this.rootStore.errorsStore.deleteDeleteForm()
      return resp.status
    } catch (error) {
      if (error.status === 401) {
        this.logout()
      } else if (error.status === 404) {
        this.rootStore.errorsStore.addDeleteForm("Удалите все товары")
      } else if (error.status === 400) {
        this.rootStore.errorsStore.addDeleteForm("Этот товар уже удален")
      } else if (error.status === 500) {
        this.rootStore.errorsStore.addDeleteForm("Ошибка сервера. Попробуйте позже")
      }

      this.isDeleteState = "dead"
      return error.status
    }
  }

  deleteItemLocal(itemId: number) {
    this.products = this.products.filter(product => product.id !== itemId)
  }

  async deleteFunpayItemData (itemId: number, count: number = 0) {
    try {
      const resp = await axios.delete(`${this.endpoint}items/funpay/${itemId}`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      this.rootStore.errorsStore.deleteDeleteForm()
      return resp.status
    } catch (error) {
      if (error.status === 401) {
        this.logout()
      } else if (error.status === 404) {
        this.rootStore.errorsStore.addDeleteForm("Этот товар уже удален")
      } else if (error.status === 500) {
        if (count === 0) {
          await this.checkFunpayKey(this.userProfile.funPayGoldenKey)
          await this.deleteFunpayItemData(itemId, 1)
        } else {
          this.rootStore.errorsStore.addDeleteForm("Ошибка сервера. Попробуйте позже")
        }
      }

      this.isDeleteState = "dead"
      return error.status
    }
  }

  deleteFunpayItemLocal(itemId: number) {
    this.products = this.products.map(product => {
      return {
        ...product,
        funPayItems: product.funPayItems.filter(item => item.id === itemId)
      }
    })
  }

  async deleteProductData () {
    const itemDeleting = this.products.find(product => product.active)

    if (itemDeleting) {
      this.isDeleteState = "loading"
      await Promise.all(itemDeleting.funPayItems.map(async (funPayItem) => {
        await this.deleteFunpayItemData(funPayItem.id)
      }))

      await Promise.all(itemDeleting.ides.map(async (id) => {
        await this.deleteSteamItemData(id)
      }))

      runInAction(() => {
        this.isDeleteState = "dead"
      })
      this.deleteItemLocal(itemDeleting.id)
      this.handleCloseDeleteForm()
      return 204
    }
  }
}

