import axios from "axios";
import { action, autorun, makeAutoObservable, observable, runInAction } from "mobx";
import { TGame } from "../types/tgames";
import { calendar } from "./calendar";
import { headers } from "next/headers";
import { json } from "stream/consumers";
import { set } from "lodash";

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
  @observable TOKEN: string =  ""
  @observable authorizate: boolean = false
  @observable isSteam = []
  @observable isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
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
  }

  @action
  async postGame (appId: number, packageId: number, title: string) {
    try {
      const resp = await axios.post(`http://147.45.74.68:35801/api/v2/items/items?steamId=${appId}&steamMainPackageId=${packageId}&customItemName=${title}`, null, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })

      runInAction(() => {
        this.isOpenAddForm = false
        this.isOpenActionsGame = false
      })

      this.getGames()

      console.log(resp.data)
    } catch (error) {
      console.log(error)
    }
  }

  @action
  async getSteamGame (appId: string | null) {
    try {
      const resp = await axios.get(`http://147.45.74.68:35801/api/v2/items/steam/${appId}`, {
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`
        }
      })
      console.log(resp.data)

      return await resp.data
    } catch (error) {
      return {
        lastUpdated: "",
        name: "",
        packages: [],
        steamId: null
      }
    }
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
