import axios from "axios";
import { action, autorun, makeAutoObservable, observable, runInAction } from "mobx";
import { TGame } from "../types/tgames";
import { TSettingsData } from "../types/settingsData";
import { settingsCountries } from "./settingsCountries";
import { calendar } from "./calendar";

// nwifyiudu4djeeu1cgcorripz4axevsx
// nwifyiudu4djeeu1cgcorripz4axevsx
// 2ea7r0yp6s5eznao043lkwsu3as6jxvm
export class MagazineStore {
  @observable games: TGame[] = [];
  @observable isLoadingGames: boolean = false;
  @observable isOpenGameInfo = {
    open: false,
    id: null
  };
  @observable isOpenActionsGame: boolean = false
  @observable isOpenAddForm: boolean = false
  @observable isOpenEditForm: boolean = false
  @observable isSteam = []
  @observable isOpen: boolean = false;
  @observable isConnectSteam: boolean = false
  @observable isLoadingGame: boolean = false
  @observable isSearchGame: boolean = true
  @observable authorizate: boolean = false

  @observable settingsCountriesChoice = settingsCountries
  @observable TOKEN: string =  ""
  @observable currentPage: string = 'main'
  // @observable funpayActivate: boolean = false
  @observable settingsData: TSettingsData = {
    funpayActivate: false,
    titleStore: "Название магазина",
    funpayKey: "",
    countries: []
  }

  constructor() {
    makeAutoObservable(this);
  }

  @action
  handleSaveSettings (title: string, key: string, countriesSelect: any[]) {
    runInAction (async () => {
      const status = this.settingsData.funpayKey === key ? true : await this.checkFunpayKey(key) === 200
      this.settingsData = {
        funpayActivate: status ? true : false,
        titleStore: title,
        funpayKey: status ? key : "",
        countries: countriesSelect
      }
    })
    // this.settingsCountriesChoice = {
    //   ...this.settingsCountriesChoice
    // }
  }

  @action transformDate (date: string) {
    const [year, mounth, day] = date.split("T")[0].split("-")
    const [hour, min] = date.split("T")[1].split(".")[0].split(":")

    return `${day} ${calendar[Number(mounth)- 1]}. ${year} ${hour}:${min}`
  }

  @action
  async getGames () {
    this.isLoadingGames = true
   try {
    const resp = await axios.get("http://147.45.74.68:35801/api/v2/items", {
      headers: {
        "Authorization": `Bearer ${this.TOKEN}`
      }
    })

    console.log(resp.data, "1", this.isLoadingGames)
    runInAction(async () => {
      this.games = await resp.data
      this.games = this.games.map((game) => ({...game, lastUpdated: this.transformDate(game.lastUpdated)}))
      this.isLoadingGames = false
    })
   } catch (error) {
    console.log(this.TOKEN)
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
  async postAuth () {
    try {
      if (this.TOKEN === "") {
        console.log(this.TOKEN, 2)
        const resp = await axios.post("http://147.45.74.68:35801/api/auth", {
          username: "admin",
          password: "passadmin"
        })

        if (typeof window !== "undefined") {
          localStorage.setItem("token", JSON.stringify(await resp.data.accessToken))
          this.TOKEN = await resp.data.accessToken
          this.authorizate = true
        }

        console.log(this.TOKEN, "1")
      }

    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        this.TOKEN = null
        this.authorizate = false
      }
    }

    this.connectToSteam()
  }

  @action
  async postGame (appId: number, packageId: number, title: string, markup: number, regions: {region: string, shortDescr: string, fullDescr: string}[]) {
    try {
      const resp1 = await axios.post(`http://147.45.74.68:35801/api/v2/items/items?steamId=${appId}&steamMainPackageId=${packageId}&customItemName=${title}`, null, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })


      const resp2 = await axios.post(`http://147.45.74.68:35801/api/v2/items/funpay?storeItemId=${resp1.data.id}`, {
        "internalName": "string",
        "genre": "string",
        "shortDescriptionRu": "",
        "longDescriptionRu": "",
        "shortDescriptionEn": "",
        "longDescriptionEn": "",
        "overpaymentPercent": markup,
        "items": regions.map(el => {
          return {
            "isOwnDescription": true,
            "isActive": true,
            "isDeactivatedAfterSale": true,
            "country": el.region,
            "shortDescriptionRu": el.shortDescr,
            "longDescriptionRu": el.fullDescr,
            "shortDescriptionEn": "string",
            "longDescriptionEn": "string"
          }
        })
      }, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      runInAction(() => {
        this.isOpenAddForm = false
        this.isOpenActionsGame = false
      })

      this.getGames()


      console.log(resp1.data)
    } catch (error) {
      console.log(error)
    }
  }

  @action
  async checkFunpayKey (key: string) {
    try {
      const resp = await axios.post(`http://147.45.74.68:35801/api/v2/funpay?goldenKey=${key}`, null, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      console.log(resp.data)
      return resp.status
    } catch (error) {
      console.log(error)
    }
  }

  @action
  async connectToSteam () {
    this.isConnectSteam = false
    try {
      const resp1 = await axios.post("http://147.45.74.68:35801/api/v2/steam", null, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        },
      })

      console.log(resp1.data)
    } catch (error) {
      console.log(error)
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
      const resp = await axios.get(`http://147.45.74.68:35801/api/v2/steam/app?appIds=${appId}${strCountryCodes}`, {
        // params: {
        //   appIds: appId,
        //   countryCodes: this.settingsData.countries.map(el => el.usename),
        // },
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        },
      })

      if (resp.status === 200) {
        console.log(resp.data.apps[0])
        if (!resp.data.apps[0]) {
          this.isSearchGame = false
          // return {
          //   lastUpdated: "",
          //   name: "",
          //   packages: [],
          //   steamId: null
          // }
        } else {
          this.isSearchGame = true
          this.isLoadingGame = false
          return resp.data.apps[0]
        }

      }
      //  else {
      //   // this.isSearchGame = false
      //   this.connectToSteam()
      // }

      // return await resp.data
    } catch (error) {
      console.log(error)
      // this.isSearchGame = false
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
  handleClickGame(gameId: number) {
    runInAction(() => {
      if (this.isOpenAddForm) {
        this.isOpenAddForm = false
        this.isOpenActionsGame = false

        setTimeout(() => {
          this.isOpenGameInfo = {
            id: gameId === this.isOpenGameInfo.id ? null : gameId,
            open: this.isOpenGameInfo.id === null ? true :
                  this.isOpenGameInfo.id === gameId ? !this.isOpenGameInfo.open : true
          }
          this.isOpenActionsGame = this.isOpenGameInfo.open
        }, 500)
      } else {
        this.isOpenGameInfo = {
          id: gameId === this.isOpenGameInfo.id ? null : gameId,
          open: this.isOpenGameInfo.id === null ? true :
                this.isOpenGameInfo.id === gameId ? !this.isOpenGameInfo.open : true
        }


        this.isOpenActionsGame = this.isOpenGameInfo.open
      }
    })
  }

  @action
  handleDeleteGame(gameId: number) {
    runInAction(() => {
      this.games = this.games.filter(el => el.id !== gameId);
      this.isOpenGameInfo = {
        open: false,
        id: null
      }

      this.isOpenActionsGame = false
    })
  }

  @action
  handleSaveGame(gameId: number, value: number) {
    console.log(gameId, value)
    runInAction(() => {
      this.games = this.games.map(el => el.id === gameId ? {...el, id: value} : el);
      this.isOpenGameInfo = {
        open: false,
        id: null
      }

      this.isOpenActionsGame = false
    })
  }
}
