import axios from "axios";
import jwt from "jsonwebtoken"
import { action, autorun, makeAutoObservable, observable, runInAction } from "mobx";
import { countryData } from "./transformCountriesForSettings";
import { TGame } from "../types/tgames";
import { TSettingsData } from "../types/settingsData";
import { settingsCountries } from "./settingsCountries";
import { calendar } from "./calendar";
import { TEditionsOptions } from "../types/edtitionInfo";

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
  @observable isLoadingConnectSteam: boolean = false
  @observable isConnectSteam: boolean = false
  @observable isLoadingGame: boolean = false
  @observable isSearchGame: boolean = true
  @observable authorizate: boolean = false
  @observable TOKEN: string =  ""
  @observable currentPage: string = 'main'
  @observable settingsData: TSettingsData = {
    funpayActivate: false,
    titleStore: "Название магазина",
    funpayKey: "",
    countries: []
  }

  @observable settingsCountriesChoice = settingsCountries

  constructor() {
    makeAutoObservable(this);
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

      runInAction(async () => {
        this.games = await resp.data
        this.games = this.games.map((game) => ({...game, lastUpdated: this.transformDate(game.lastUpdated)}))
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
  async startLoadingPage () {
    await this.postAuth()
    this.checkFunpayKeyActive()
    await this.getSettingsData()

    this.changeSettingsCountriesChoice()

    await this.checkSteamConnect()

    if (!this.isConnectSteam) {
      this.connectToSteam()
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
  async postAuth () {
    try {
      if (this.TOKEN === "") {
        console.log(this.TOKEN, 2)
        const resp = await axios.post("http://147.45.74.68:35805/api/auth", {
          username: "admin",
          password: "passadmin"
        })

        if (typeof window !== "undefined") {
          localStorage.setItem("token", JSON.stringify(await resp.data.accessToken))
          this.TOKEN = await resp.data.accessToken
          this.authorizate = true
        }
      }

    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        this.TOKEN = null
        this.authorizate = false
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
      const resp = await axios.get(`http://147.45.74.68:35805/api/v2/profile/admin`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      this.settingsData = {...this.settingsData,
        titleStore: resp.data.email,
        funpayKey: resp.data.funPayGoldenKey,
        countries: resp.data.countries.map((el: string) => countryData[el]).filter(Boolean)
      }

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
    editionSelect: TEditionsOptions
  ) {
    try {
      runInAction(() => {
        this.isOpenAddForm = false
        this.isOpenActionsGame = false
      })

    } catch (error) {
      console.log(error)
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
