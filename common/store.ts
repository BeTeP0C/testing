import axios from "axios";
import { action, autorun, computed, makeAutoObservable, observable, runInAction, toJS } from "mobx";
import { countryData } from "./transformCountriesForSettings";
import { TGame } from "../types/tgames";
import { TSettingsData } from "../types/settingsData";
import { settingsCountries } from "./settingsCountries";
import { calendar } from "./calendar";
import { TEditionsOptions } from "../types/edtitionInfo";
import { countriesToUsename, usenameToCountries } from "./countriesToUsename";

export class MagazineStore {
  @observable games: TGame[] = [];
  @observable isLoadingGames: boolean = false;
  @observable isOpenActionsGame: boolean = false
  @observable isOpenAddForm: boolean = false
  @observable isOpenEditForm: boolean = false
  @observable isSteam = []
  @observable isOpen: boolean = false;
  @observable isLoadingConnectSteam: boolean = false
  @observable isConnectSteam: boolean = false
  @observable isLoadingGame: boolean = false
  @observable isSearchGame: boolean = true
  @observable authorizate: boolean = false
  @observable isOpenModal: boolean = false
  @observable isOpenDelete: boolean = false
  @observable TOKEN: string =  ""
  @observable currentPage: string = 'main'
  @observable settingsData: TSettingsData = {
    funpayActivate: false,
    titleStore: "Название магазина",
    funpayKey: "",
    countries: []
  }

  @observable isOpenGameInfo = {
    open: false,
    openStore: false,
    funpayId: null,
    funpay_active: false,
    funpayCountry: null,
    funpayCountryActive: false,
    id: null
  };
  endpoint: string = "http://147.45.74.68:35805/api/v2/"

  @observable negativeHeight = 0
  @observable settingsCountriesChoice = settingsCountries

  constructor() {
    this.restoreTokenFromLocalStorage()
    makeAutoObservable(this);
  }

  @action
  handleDeleteProduct () {
    this.handleOpenModal()
    this.openModalDelete()
  }

  @action
  handleOpenModal () {
    this.isOpenModal = true
  }

  @action
  openModalDelete () {
    this.isOpenDelete = true
  }

  @action
  handleCloseModal () {
    this.isOpenModal = false
    this.isOpenDelete = false
  }

  getGameLocal (id: number): TGame {
    const game: TGame = this.games.find(el => el.id === id)

    return game
  }

  @action
  async handleDeleteGame() {
    const game: TGame = this.getGameLocal(this.isOpenGameInfo.id)
    console.log(game)
    let flag: boolean = true
    let move: boolean = true
    let checkKey: boolean = true
    try {
      if (game.funPayItems) {
        for (let el of game.funPayItems) {
          if (move) {
            const resp = await axios.delete(`${this.endpoint}items/funpay/${el.id}`, {
              headers: {
                "Authorization": `Bearer ${this.TOKEN}`
              }
            })

            console.log(resp.data)
          } else {
            break
          }
        }
      }
    } catch (error) {
      console.error(error)
      move = false
      flag = false
      return error
    }

    try {
      if (flag) {
        const resp = await axios.delete(`${this.endpoint}items/${game.id}`, {
          headers: {
            "Authorization": `Bearer ${this.TOKEN}`
          }
        })

        console.log(resp.data)
      }
    } catch (error) {
      console.error(error)
      flag = false
      return error
    }

    if (flag) {
      runInAction(() => {
        this.games = this.games.filter(el => el.id !== game.id);
        this.handleCloseModal()
      })
      return 200
    }
  }

  @action
  changeOpenGameInfo (id: number, height: number) {
    if (id === this.isOpenGameInfo.funpayId) {
      this.negativeHeight = !this.isOpenGameInfo.funpay_active ? 0 : height
    } else {
      this.negativeHeight = 0
    }

    const backState = this.isOpenGameInfo.funpay_active

    this.isOpenGameInfo = {
      ...this.isOpenGameInfo,
      funpayId: id,
      funpay_active: id === this.isOpenGameInfo.funpayId ? !this.isOpenGameInfo.funpay_active : true
    }

    this.handleOpenInfoFunpay(backState)
  }

  @action
  changeOpenGameStore (country: string, height: number) {
    if (country === this.isOpenGameInfo.funpayCountry) {
      this.negativeHeight = !this.isOpenGameInfo.funpayCountry ? 0 : height
    } else {
      this.negativeHeight = 0
    }

    const backState = this.isOpenGameInfo.funpayCountryActive

    this.isOpenGameInfo = {
      ...this.isOpenGameInfo,
      funpayCountry: country,
      funpayCountryActive: country === this.isOpenGameInfo.funpayCountry ? !this.isOpenGameInfo.funpayCountryActive : true
    }

    this.handleOpenInfoProduct(backState)
  }

  @action
  handleOpenInfoProduct (backState: boolean) {
    this.games = this.games.map(game => {
      if (game.id === this.isOpenGameInfo.id) {
        return {
          ...game,
          funPayItems: game.funPayItems.map(el => {
            if (el.id === this.isOpenGameInfo.funpayId) {
              return {...el, items: el.items.map(item => {
                if (item.country === countriesToUsename[this.isOpenGameInfo.funpayCountry]) {

                  return {...item, active: backState ? true : this.isOpenGameInfo.funpayCountryActive}
                }
                return {...item, active: false}
              })}
            }
            return {...el, items: el.items.map(item => {
              return {...item, active: false}
            })}
          })
        }
      }

      return {
        ...game,
        funPayItems: game.funPayItems.map(el => {
          return {...el, active: false}
        })
      }
    })
  }

  @action
  handleOpenInfoFunpay (backState: boolean) {
    this.games = this.games.map(game => {
      if (game.id === this.isOpenGameInfo.id) {
        return {
          ...game,
          funPayItems: game.funPayItems.map(el => {
            if (el.id === this.isOpenGameInfo.funpayId) {
              return {...el,
                active: backState ? true : this.isOpenGameInfo.funpay_active,
                items: el.items.map(item => {
                  if (item.country === countriesToUsename[this.isOpenGameInfo.funpayCountry]) {

                    return {...item, active: this.isOpenGameInfo.funpayCountryActive}
                  }
                  return {...item, active: false}
                })
              }
            }
            return {...el,
              active: false,
              items: el.items.map(item => {
                return {...item, active: false}
              })
            }
          })
        }
      }

      return {
        ...game,
        funPayItems: game.funPayItems.map(el => {
          return {...el, active: false}
        })
      }
    })
  }

  @action
  handleOpenInfoStore (height: number) {
    this.negativeHeight = this.isOpenGameInfo.openStore ? height : 0

    this.isOpenGameInfo = {...this.isOpenGameInfo, openStore: !this.isOpenGameInfo.openStore}
  }

  @action
  restoreTokenFromLocalStorage () {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")

      if (token) {
        this.TOKEN = token
      }
    }
  }

  @action
  handleSaveSettings (title: string, key: string, countriesSelect: any[]) {
    runInAction (async () => {
      const status = this.settingsData.funpayKey === key && this.settingsData.funpayKey !== "" ? true : await this.checkFunpayKey(key) === 200
      this.settingsData = {
        funpayActivate: status ? true : false,
        titleStore: title,
        funpayKey: status ? key : "",
        countries: countriesSelect
      }

      this.changeSettingsCountriesChoice()

      try {
        const resp = await axios.patch(`http://147.45.74.68:35805/api/v2/profile/admin`, {
          username: "admin",
          email: title,
          countries: countriesSelect.map(el => el.usename),
          funPayGoldenKey: status ? key : ""
        }, {
          headers: {
            "Authorization": `Bearer ${this.TOKEN}`
          }
        })

        console.log(resp.data)
      } catch (error) {
        console.log(error)
      }

    })
  }

  @action
  async getGames () {
    this.isLoadingGames = true
    try {
      const resp = await axios.get("http://147.45.74.68:35805/api/v2/items", {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`,
        }
      })

      console.log(resp.data)

      runInAction(async () => {
        this.games = await resp.data
        let reductGames: TGame[] = []
        this.games.forEach(el => {
          console.log(reductGames, "1")
          if (!reductGames.some(game => game.steamItemId === el.steamItemId)) {
            reductGames.push({...el, funPayItems: el.funPayItem ? [...[{
              ...el.funPayItem,
              packageId: el.steamItemPackageId,
              active: false,
              items: el.funPayItem.items.map(item => {
                return {...item, active: false}
              })
            }]] : []})
          } else {
            reductGames = reductGames.map(game => {
              if (game.steamItemId === el.steamItemId) {

                if (el.funPayItems) {
                  return {
                    ...game,
                    funPayItems: [...game.funPayItems, {
                      ...el.funPayItem,
                      items: el.funPayItem.items.map(item => {
                        return {...item, active: false}
                      })
                    }]
                  }
                } else {
                  return {
                    ...game,
                  }
                }


              }
              return {
                ...game
              }
            })
          }

          console.log(reductGames, "2")
        })

        console.log(reductGames)

        this.games = reductGames.map((game) => ({...game, lastUpdated: this.transformDate(game.lastUpdated)}))
        console.log(resp.data)
        console.log(toJS(this.games))
        this.sortGameForDate("bottom")
        this.isLoadingGames = false
      })
    } catch (error) {
      this.TOKEN = ""
      this.authorizate = false
    }
  }

  @action
  changePage (page: string) {
    runInAction(() => {
      this.currentPage = page
    })
  }

  @action
  changeSettingsCountriesChoice () {
    runInAction(() => {
      this.settingsCountriesChoice = settingsCountries.map(el => {
        let flag = true

        for (let country of this.settingsData.countries) {
          if (country.id === el.id) {
            flag = false
            break
          }
        }

        if (flag) {
          return el
        }
      }).filter(Boolean)
    })
  }

  @action
  async checkAuth () {
    try {
      const resp = await axios.get("http://147.45.74.68:35805/api/v2/profile/admin", {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      return resp.status
    } catch(error) {
      console.error(error)
    }
  }

  @action
  async startLoadingPage () {
    const statusAuth = await this.checkAuth()

    if (statusAuth === 200) {
      this.authorizate = true
      this.checkFunpayKeyActive()
      await this.getSettingsData()

      this.changeSettingsCountriesChoice()

      await this.checkSteamConnect()

      if (!this.isConnectSteam) {
        this.connectToSteam()
      }
    } else if (statusAuth === 401) {
      console.log("Авторизация")
      this.authorizate = false
    }
  }

  @action transformDate (date: string) {
    const [year, mounth, day] = date.split("T")[0].split("-")
    const [hour, min] = date.split("T")[1].split(".")[0].split(":")

    return `${day} ${calendar[Number(mounth)- 1]}. ${year} ${hour}:${min}`
  }

  getMonthFromString(month: string): number {
    return calendar.indexOf(month);
  }

  parseDate(dateString: string): Date {
    const parts = dateString.split(' ');
    const day = parseInt(parts[0], 10);
    const month = this.getMonthFromString(parts[1].split(".")[0]);
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }

  sortGameForDate (type: string) {
    this.games = this.games.sort((a, b) => {
      const dateA = new Date(this.parseDate(a.lastUpdated));
      const dateB = new Date(this.parseDate(b.lastUpdated));

      if (type === "bottom") {
        return dateB.getTime() - dateA.getTime()
      } else if (type === "top") {
        return dateA.getTime() - dateB.getTime()
      }
    });
  }

  @action
  logout () {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      this.TOKEN = null
      this.authorizate = false
    }
  }

  @action
  async postAuth (login: string, password: string) {
    try {
      const resp = await axios.post("http://147.45.74.68:35805/api/auth", {
        username: login,
        password: password
      })

      if (resp.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", resp.data.accessToken)
          this.TOKEN = resp.data.accessToken
          this.authorizate = true
        }

        return resp.status
      } else if (resp.status === 401) {
        return resp.status
      }

    } catch (error) {
      this.logout()
      if (error.status === 401) {
        return error.status
      } else {
        console.error('Ошибка при получении данных:', error);
      }
    }
  }

  @action
  async checkSteamConnect () {
    this.isLoadingConnectSteam = true
    try {
      const resp = await axios.get(`http://147.45.74.68:35805/api/v2/status`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      if (resp.data.steam === "alive") {
        this.isConnectSteam = true
      } else if (resp.data.steam) {
        this.isConnectSteam = false
      }
    } catch (error) {
      console.error(error)
    }

    this.isLoadingConnectSteam = false
  }

  @action
  async checkFunpayKeyActive () {
    try {
      const resp = await axios.get(`http://147.45.74.68:35805/api/v2/status`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      if (resp.data.funPay === "alive") {
        this.settingsData = {...this.settingsData, funpayActivate: true}
      } else if (resp.data.funPay) {
        this.settingsData = {...this.settingsData, funpayActivate: false}
      }
    } catch (error) {
      console.error(error)
    }
  }

  @action
  async getSettingsData () {
    try {
      const resp = await axios.get(`${this.endpoint}profile/admin`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      runInAction(() => {
        this.settingsData = {...this.settingsData,
          titleStore: resp.data.email,
          funpayKey: resp.data.funPayGoldenKey,
          countries: resp.data.countries.map((el: string) => countryData[el]).filter(Boolean)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  @action
  async postGame (
    appId: number,
    packageId: number,
    title: string,
    titleGame: string,
    isGlobal: boolean,
    editionSelect: TEditionsOptions,
    editionOptions: TEditionsOptions[]
  ) {
    try {
      const resp1 = await axios.post(`http://147.45.74.68:35805/api/v2/items/items?steamId=${appId}&steamMainPackageId=${packageId}&customItemName=${title}`, null, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      if (resp1.status === 200) {
        try {
          const resp2 = await axios.post(`http://147.45.74.68:35805/api/v2/items/funpay?storeItemId=${resp1.data.id}`, {
            internalName: editionSelect.title,
            genre: "Экшен",
            shortDescriptionRu: "Steam ключ, дешево!",
            longDescriptionRu: `Быстрая и надежная доставка ключа активации для игры ${titleGame} в Steam. Получите ключ мгновенно после оплаты и начните играть!`,
            shortDescriptionEn: "Steam key, cheap! Steam key, cheap!",
            longDescriptionEn: `Fast and reliable delivery of the activation key for the game ${titleGame} on Steam. Get your key instantly after payment and start playing!`,
            overpaymentPercent: editionSelect.markup,
            items: editionSelect.regions.map(el => {
              return {
                isOwnDescription: !isGlobal,
                isActive: true,
                isDeactivatedAfterSale: true,
                country: countriesToUsename[el.region],
                shortDescriptionRu: el.briefDescr,
                longDescriptionRu: el.fullDescr,
                shortDescriptionEn: "Steam key, cheap! Steam key, cheap!",
                longDescriptionEn: `Fast and reliable delivery of the activation key for the game ${titleGame} on Steam. Get your key instantly after payment and start playing!`
              }
            })

          }, {
            headers: {
              "Authorization": `Bearer ${this.TOKEN}`
            }
          })

          if (resp2.status === 200) {
            console.log(editionOptions)
            if (editionOptions.length === editionOptions.filter(el => el.posted).length + 1) {
              runInAction(() => {
                this.isOpenAddForm = false
                this.isOpenActionsGame = false
              })

              this.getGames()

              return ""
            } else {
              return {
                ...editionSelect,
                posted: true,
                active: false,
                regions: editionSelect.regions.map((region) => {
                  return { ...region, active: false };
                }),
              }
            }
          }
        } catch (error) {
          if (error.status === 400) {
            return {
              type: "funpay",
              status: 400
            }
          } else if (error.status === 500) {
            return {
              type: "funpay",
              status: 500
            }
          }
        }
      }

    } catch (error) {
      if (error.status === 400) {
        return {
          type: "steam",
          status: 400
        }
      } else if (error.status === 500) {
        return {
          type: "steam",
          status: 500
        }
      }
    }

  }

  @action
  async checkFunpayKey (key: string) {
    try {
      const resp = await axios.post(`http://147.45.74.68:35805/api/v2/funpay?goldenKey=${key}`, null, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      return resp.status
    } catch (error) {
      console.error(error)
    }
  }

  @action
  async connectToSteam () {
    this.isConnectSteam = false
    try {
      const resp1 = await axios.post("http://147.45.74.68:35805/api/v2/steam", null, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        },
      })
    } catch (error) {
      console.error(error)
    }

    this.isConnectSteam = true
  }

  @action
  async getSteamGame (appId: string | null) {
    this.isLoadingGame = true
    this.isSearchGame = false
    try {
      const strCountryCodes = this.settingsData.countries.map(el => {
        return `&countryCodes=${el.usename}`
      }).join("")
      const resp = await axios.get(`http://147.45.74.68:35805/api/v2/steam/app?appIds=${appId}${strCountryCodes}`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        },
      })

      if (resp.status === 200) {
        if (!resp.data.apps[0]) {
          this.isSearchGame = false
        } else {
          this.isSearchGame = true
          this.isLoadingGame = false
          return resp.data.apps[0]
        }

      }
    } catch (error) {
      console.log(error)
      this.isLoadingGame = false
      this.connectToSteam()
      return {
        lastUpdated: "",
        name: "",
        packages: [],
        steamId: null
      }
    }

    this.isLoadingGame = false
  }

  @action
  handleClickAddGame () {
    runInAction(() => {
      if (this.isOpenGameInfo.open) {
        this.isOpenGameInfo = {
          id: null,
          open: false,
          funpayId: null,
          openStore: false,
          funpay_active: false,
          funpayCountry: null,
          funpayCountryActive: false
        }

        this.isOpenActionsGame = false

        setTimeout(() => {
          this.isOpenActionsGame = true
          this.isOpenAddForm = true
        }, 500)
      } else {
        this.isOpenActionsGame = true
        this.isOpenAddForm = true
      }
    })

  }

  @action
  handleClickGame(gameId: number, funpayId: number) {
    runInAction(() => {
      if (this.isOpenAddForm) {
        this.isOpenAddForm = false
        this.isOpenActionsGame = false

        setTimeout(() => {
          this.isOpenGameInfo = {
            id: gameId === this.isOpenGameInfo.id ? null : gameId,
            funpayId: funpayId === this.isOpenGameInfo.funpayId ? null : funpayId,
            open: this.isOpenGameInfo.id === null ? true :
                  this.isOpenGameInfo.id === gameId ? !this.isOpenGameInfo.open : true,
            openStore: false,
            funpayCountry: null,
            funpayCountryActive: false,
            funpay_active: false
          }
        }, 500)
      } else {
        this.isOpenGameInfo = {
          id: gameId === this.isOpenGameInfo.id ? null : gameId,
          funpayId: funpayId === this.isOpenGameInfo.funpayId ? null : funpayId,
          open: this.isOpenGameInfo.id === null ? true :
                this.isOpenGameInfo.id === gameId ? !this.isOpenGameInfo.open : true,
          openStore: false,
          funpayCountry: null,
          funpayCountryActive: false,
          funpay_active: false
        }

        if (gameId === this.isOpenGameInfo.id) {
          this.negativeHeight = 0
        } else {
          this.negativeHeight = this.isOpenGameInfo.open ? this.negativeHeight : 0
        }
      }
    })
  }

  @action
  handleSaveGame(gameId: number, value: number) {
    console.log(gameId, value)
    runInAction(() => {
      this.games = this.games.map(el => el.id === gameId ? {...el, id: value} : el);
      this.isOpenGameInfo = {
        funpayId: null,
        open: false,
        id: null,
        openStore: false,
        funpay_active: false,
        funpayCountry: null,
        funpayCountryActive: false,
      }

      this.isOpenActionsGame = false
    })
  }
}
