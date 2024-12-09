import { makeAutoObservable, autorun, runInAction, toJS } from "mobx";
import axios from "axios";
import { RootStore } from "./rootStore";
import { TStateData } from "../../types/global";
import { TFirstPageAddForm, TSecondPageAddForm, TSteamGameCountry, TSteamGameData, TSteamGameDataCountry } from "../../types/addGame";
import { countriesToUsename } from "../countriesToUsename";
import translate from "translate";
import { run } from "node:test";

export class AddStore {
  rootStore: RootStore

  isOpenAddForm: boolean = false
  isSearchGame: TStateData | false = false
  numberActivePage: number = 1
  isShowDropList: boolean = false
  isSuccessfullyCreateProd: TStateData = "dead"

  firstPageAddForm: TFirstPageAddForm = {
    titleName: "",
    appId: null,
    foundGame: {
      titleGame: "",
      urlImg: "",
      countryRestricted: false,
      amountCountry: 0
    },
    selectEditions: [],
    choiceEditions: []
  }

  secondPageAddForm: TSecondPageAddForm = []

  constructor (RootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = RootStore

    autorun(() => {
      if (this.isOpenAddForm && !this.isShowDropList) {
        if (typeof window !== "undefined") {
          window.addEventListener("keydown", this.handleEventEscapeCloseForm)
        }
      } else if (this.isShowDropList) {
        window.removeEventListener("keydown", this.handleEventEscapeCloseForm)
      } else {
        this.handleCloseAddForm()
        window.removeEventListener("keydown", this.handleEventEscapeCloseForm)
      }
    })

    autorun(() => {
      if (this.isShowDropList) {
        window.addEventListener("keydown", this.handleEventEscapeCloseDropList)
      } else {
        window.removeEventListener("keydown", this.handleEventEscapeCloseDropList)
      }
    })
  }

  handleEventEscapeCloseForm = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      this.handleCloseAddForm()
      window.removeEventListener("keydown", this.handleEventEscapeCloseForm)
    }
  }

  handleEventEscapeCloseDropList = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      this.changeShowDropList()
      window.removeEventListener("keydown", this.handleEventEscapeCloseDropList)
    }
  }

  handleOpenAddForm () {
    this.rootStore.globalStore.isOpenActionsGame = true
    this.isOpenAddForm = true
  }

  handleCloseAddForm () {
    runInAction(() => {
      this.rootStore.globalStore.isOpenActionsGame = false
      this.isOpenAddForm = false
    })
  }

  resetFirstPageAddForm () {
    this.firstPageAddForm = {
      ...this.firstPageAddForm,
      titleName: "",
      appId: null,
      foundGame: {
        titleGame: "",
        urlImg: "",
        countryRestricted: false,
        amountCountry: 0
      },
      selectEditions: [],
      choiceEditions: []
    }
  }

  filterUniqueByField (arr: any[], field: string) {
    const uniqueIds = new Set();
    return arr?.filter((item) => {
      const itemId = item[field];
      if (!uniqueIds.has(itemId)) {
        uniqueIds.add(itemId);
        return true;
      }
      return false;
    });
  };

  async getSteamGameData () {
    this.isSearchGame = "loading"
    try {
      const resp = await axios.get(`${this.rootStore.globalStore.endpoint}steam/app?appIds=${this.firstPageAddForm.appId}${this.rootStore.globalStore.userProfile.countries.map(country => {
        return `&countryCodes=${country.usename}`
      }).join("")}`, {
        headers: {
          "Authorization": `Bearer ${this.rootStore.globalStore.TOKEN}`
        }
      })

      let data: TSteamGameData = resp.data.apps[0]
      let regions: TSteamGameCountry[] = []

      data.purchaseOptions.forEach(el => {
        if (regions.some(country => country.id === el.id)) {
          regions = regions.map(item => {
            if (item.id === el.id) {
              return {
                ...item,
                countries: [...item.countries, {
                  country: el.country,
                  price: el.finalPrice
                }]
              }
            }

            return {
              ...item
            }
          })
        } else {
          regions.push({
            ...el,
            countries: [{
              country: el.country,
              price: el.finalPrice
            }]
          })
        }
      });

      data = {
        ...data,
        purchaseOptions: this.filterUniqueByField(data.purchaseOptions, "id")
      }

      runInAction(() => {
        if (data) {
          this.firstPageAddForm = {
            ...this.firstPageAddForm,
            foundGame: {
              titleGame: data.name,
              urlImg: data.iconUrl,
              countryRestricted: data.countryRestricted,
              amountCountry: data.purchaseOptions.length
            },
            choiceEditions: data.purchaseOptions.map(el => {
              return {
                title: el.name,
                countries: regions.find(item => item.id === el.id).countries.map(item => {
                  return {
                    country: item.country,
                    price: item.price
                  }
                }),
                id: el.id,
              }
            }),
            selectEditions: []
          }

          this.resetSecondPageAddForm()
        } else {
          this.resetFirstPageAddForm()
        }

        this.isSearchGame = "alive"
      })



    } catch (error) {
      if (error.status === 401) {
        this.rootStore.globalStore.logout()
      } else {
        runInAction(() => {
          this.firstPageAddForm = {
            ...this.firstPageAddForm,
            selectEditions: []
          }
          this.isSearchGame = "dead"
        })
      }
    }
  }

  handleAddEdition = (id: number) => {
    this.firstPageAddForm = {
      ...this.firstPageAddForm,
      choiceEditions: this.firstPageAddForm.choiceEditions.filter(el => el.id !== id),
      selectEditions: [
        ...this.firstPageAddForm.selectEditions,
        this.firstPageAddForm.choiceEditions.find(el => el.id === id)
      ]
    }
  }

  handleDeleteEdition = (id: number) => {
    this.firstPageAddForm = {
      ...this.firstPageAddForm,
      selectEditions: this.firstPageAddForm.selectEditions.filter(el => el.id !== id),
      choiceEditions: [
        ...this.firstPageAddForm.choiceEditions,
        this.firstPageAddForm.selectEditions.find(el => el.id === id)
      ]
    }
  }

  handleSaveTitleProduct (value: string) {
    this.firstPageAddForm = {
      ...this.firstPageAddForm,
      titleName: value
    }
  }

  async handleSearchSteamGame (value: number) {
    this.handleSaveAppIdProduct(value)
    await this.getSteamGameData()
  }

  handleSaveAppIdProduct (value: number) {
    this.firstPageAddForm = {
      ...this.firstPageAddForm,
      appId: value
    }
  }

  changeEditionActive (id: number) {
    this.secondPageAddForm = this.secondPageAddForm.map(el => {
      if (el.id === id) {
        return {
          ...el,
          active: true
        }
      } else {
        this.rootStore.errorsStore.deleteFormError()
        return {
          ...el,
          active: false
        }
      }
    })

    this.isShowDropList = false
  }

  changeRegionActive (title: string) {
    this.secondPageAddForm = this.secondPageAddForm.map(el => {
      if (el.active) {
        return {
          ...el,
          stores: el.stores.map(store => {
            if (store.active) {
              return {
                ...store,
                regions: store.regions.map(region => {
                  if (region.titleRegion === title) {
                    return {
                      ...region,
                      active: true
                    }
                  } else {
                    return {
                      ...region,
                      active: false
                    }
                  }
                })
              }
            }

            return store
          })
        }
      }

      return el
    })
  }

  changeGlobalActive (title: string) {
    this.secondPageAddForm = this.secondPageAddForm.map(el => {
      if (el.active) {
        return {
          ...el,
          stores: el.stores.map(store => {
            if (store.active) {
              return {
                ...store,
                regions: store.regions.map(region => {
                  if (region.titleRegion === title) {
                    return {
                      ...region,
                      isGlobal: !region.isGlobal
                    }
                  } else {
                    return region
                  }
                })
              }
            }

            return store
          })
        }
      }

      return el
    })
  }

  changeShortDescr (value: string) {
    this.secondPageAddForm = this.secondPageAddForm.map(el => {
      if (el.active) {
        return {
          ...el,
          stores: el.stores.map(store => {
            if (store.active) {
              return {
                ...store,
                regions: store.regions.map(region => {
                  if (region.active) {
                    return {
                      ...region,
                      shortDescr: value
                    }
                  } else {
                    return region
                  }
                })
              }
            }

            return store
          })
        }
      }

      return el
    })
  }

  changeFullDescr (value: string) {
    this.secondPageAddForm = this.secondPageAddForm.map(el => {
      if (el.active) {
        return {
          ...el,
          stores: el.stores.map(store => {
            if (store.active) {
              return {
                ...store,
                regions: store.regions.map(region => {
                  if (region.active) {
                    return {
                      ...region,
                      fullDescr: value
                    }
                  } else {
                    return region
                  }
                })
              }
            }

            return store
          })
        }
      }

      return el
    })
  }

  changeMarkup (markup: number, title: string) {
    this.secondPageAddForm = this.secondPageAddForm.map(el => {
      if (el.active) {
        return {
          ...el,
          stores: el.stores.map(store => {
            if (store.titleStore === title) {
              return {
                ...store,
                markup: markup
              }
            }

            return store
          })
        }
      }

      return el
    })
  }

  addSecondPageAddForm () {
    if (this.secondPageAddForm.length === 0) {
      this.secondPageAddForm = this.firstPageAddForm.selectEditions.map((edition, index) => {
        return {
          titleEdition: edition.title,
          active: index === 0 ? true : false,
          posted: false,
          id: edition.id,
          stores: [{
            titleStore: "funPay",
            active: true,
            markup: 0,
            regions: edition.countries.map((item, index) => {
              return {
                titleRegion: item.country,
                active: index === 0 ? true : false,
                isGlobal: false,
                shortDescr: "",
                fullDescr: "",
                price: item.price,
              }
            })
          }]
        }
      })
    }
  }

  handleBackPage () {
    this.numberActivePage = this.numberActivePage - 1
  }

  resetSecondPageAddForm () {
    this.secondPageAddForm = []
  }

  changeShowDropList () {
    this.isShowDropList = !this.isShowDropList
  }

  async handleAddSteamGame () {
    const promises = this.secondPageAddForm.map(async (el) => {
      if (el.active) {
        try {
          const resp = await axios.post(`${this.rootStore.globalStore.endpoint}items/items?steamId=${this.firstPageAddForm.appId}&steamMainPackageId=${el.id}&customItemName=${this.firstPageAddForm.titleName}`, null, {
            headers: {
              "Authorization": `Bearer ${this.rootStore.globalStore.TOKEN}`
            }
          })

          return resp
        } catch (error) {
          runInAction(() => {
            this.isSuccessfullyCreateProd = 'dead'

            if (error.status === 401) {
              this.rootStore.globalStore.logout()
            } else if (error.status === 400) {
              this.rootStore.errorsStore.addFormError("Продукт уже добавлен")
            } else {
              this.rootStore.errorsStore.addFormError("Ошибка. Попробуйте позже")
            }
          })
          return error

        }
      } else {
        return null
      }
    })

    return promises[0]
  }

  async handleAddFunPayProd (itemId: number) {
    const promises = this.secondPageAddForm.map(async (el) => {
      if (el.active) {
        const promisesStore = el.stores.map(async (store) => {
          if (store.active) {
            const data = {
              internalName: el.titleEdition,
              genre: "Экшен",
              shortDescriptionRu: "Steam ключ, дешево!",
              longDescriptionRu: `Быстрая и надежная доставка ключа активации для игры ${this.firstPageAddForm.foundGame.titleGame} в Steam. Получите ключ мгновенно после оплаты и начните играть!`,
              shortDescriptionEn: "Steam key, cheap! Steam key, cheap!",
              longDescriptionEn: `Fast and reliable delivery of the activation key for the game ${this.firstPageAddForm.foundGame.titleGame} on Steam. Get your key instantly after payment and start playing!`,
              overpaymentPercent: store.markup,
              items: await Promise.all(store.regions.map(async (region) => {
                return {
                  isOwnDescription: !region.isGlobal,
                  isActive: true,
                  isDeactivatedAfterSale: true,
                  country: countriesToUsename[region.titleRegion] === "Беларусь" ? "СНГ" : countriesToUsename[region.titleRegion],
                  shortDescriptionRu: region.shortDescr,
                  longDescriptionRu: region.fullDescr,
                  shortDescriptionEn: region.shortDescr === "" ? "" : await translate(region.shortDescr, {from: "ru", to: "en"}),
                  longDescriptionEn: region.fullDescr === "" ? "" : await translate(region.fullDescr, {from: "ru", to: "en"})
                }
              }))
            }

            try {
              const resp = await axios.post(`${this.rootStore.globalStore.endpoint}items/funpay?storeItemId=${itemId}`, data, {
                headers: {
                  "Authorization": `Bearer ${this.rootStore.globalStore.TOKEN}`
                }
              })

              return resp.status
            } catch (error) {
              if (error.status === 401) {
                this.rootStore.globalStore.logout()
              } else if (error.status === 500) {
                const status = await this.rootStore.globalStore.checkFunpayKey(this.rootStore.globalStore.userProfile.funPayGoldenKey)

                if (status === 200) {
                  try {
                    const resp = await axios.post(`${this.rootStore.globalStore.endpoint}items/funpay?storeItemId=${itemId}`, data, {
                      headers: {
                        "Authorization": `Bearer ${this.rootStore.globalStore.TOKEN}`
                      }
                    })

                    return resp.status
                  } catch (er) {
                    runInAction(async () => {
                      await this.rootStore.globalStore.deleteProduct(itemId)
                    })
                    if (er.status === 401) {
                      runInAction(() => {
                        this.rootStore.globalStore.logout()
                      })
                    }

                    runInAction(() => {
                      this.rootStore.errorsStore.addFormError("Проверьте поля")
                      this.isSuccessfullyCreateProd = "dead"
                    })
                  }
                } else {
                  console.log("trtere")
                  runInAction(() => {
                    this.rootStore.errorsStore.addFormError("Обновите FunPay ключ")
                    this.isSuccessfullyCreateProd = "dead"
                  })
                }
              } else if (error.status === 400) {
                runInAction(async () => {
                  await this.rootStore.globalStore.deleteProduct(itemId)
                  this.rootStore.errorsStore.addFormError("Проверьте поля")
                  this.isSuccessfullyCreateProd = "dead"
                })
              }
            }
          }
        })

        return promisesStore[0]
      }
    })

    return promises[0]
  }

  async handleCreateProduct () {
    this.secondPageAddForm.map(el => {
      if (el.active) {
        el.stores.map(store => {
          if (store.active) {
            store.regions.map(region => {
              if (region.active) {
                if (region.shortDescr.length === 0 && !region.isGlobal) {
                  this.rootStore.errorsStore.addShortDescrError("Поле обязательно для заполнения")
                } else if (region.shortDescr.length < 15) {
                  runInAction(() => {
                    this.rootStore.errorsStore.addShortDescrError("Минимум 15 символов")
                  })
                }else {
                  runInAction(() => {
                    this.rootStore.errorsStore.deleteShortDescrError()
                  })
                }

                if (region.shortDescr.length === 0 && !region.isGlobal) {
                  this.rootStore.errorsStore.addFullDescrError("Поле обязательно для заполнения")
                }else if (region.shortDescr.length < 15) {
                  runInAction(() => {
                    this.rootStore.errorsStore.addFullDescrError("Минимум 15 символов")
                  })
                } else {
                  runInAction(() => {
                    this.rootStore.errorsStore.deleteFullDescrError()
                  })
                }
              }
            })
          }
        })
      }
    })

    this.rootStore.errorsStore.deleteFormError()

    if (!this.rootStore.errorsStore.checkSecondPageAddFormErrors()) {
      this.isSuccessfullyCreateProd = "loading"
      const respSteam = await this.handleAddSteamGame()

      if (respSteam.status === 200) {
        runInAction(() => {
          this.rootStore.errorsStore.deleteFormError()
        })

        const respFunpay = await this.handleAddFunPayProd(respSteam.data.id)

        if (respFunpay === 200) {
          runInAction(() => {
            this.isSuccessfullyCreateProd = "alive"

            this.rootStore.errorsStore.deleteFormError()

            setTimeout(() => {
              runInAction(() => {
                this.isSuccessfullyCreateProd = "dead"
                this.switchNextEdition()
              })
            }, 1000)
          })
        }
      }
    }
  }

  switchNextEdition () {
    if (this.secondPageAddForm.length === this.secondPageAddForm.filter(el => el.posted).length + 1) {
      this.handleCloseAddForm ()

      setTimeout(() => {
        runInAction(() => {
          this.resetFirstPageAddForm ()
          this.resetSecondPageAddForm ()
          this.numberActivePage = 1
        })
      }, 500)

      this.rootStore.globalStore.getProducts()
    } else {
      let activeIndex = null

      runInAction(() => {
        this.secondPageAddForm = this.secondPageAddForm.map((el, index) => {
          // let newEl =
          if (el.active) {
            activeIndex = index + 1
            return {
              ...el,
              active: false,
              posted: true
            }
          } else {
            if (index === activeIndex) {
              return {
                ...el,
                active: true
              }
            } else {
              return {
                ...el,
                active: false
              }
            }
          }
        }).sort((a,b) => {
          if (a.posted && !b.posted) return 1;

          if (!a.posted && b.posted) return -1;

          return 0;
        })
      })
    }
  }

  handleNextPageForm () {
    if (this.firstPageAddForm.titleName.length === 0) {
      this.rootStore.errorsStore.addTitleNameError("Поле обязательно для заполнения")
    } else {
      this.rootStore.errorsStore.deleteTitleNameError()
    }

    if (this.firstPageAddForm.appId === null) {
      this.rootStore.errorsStore.addAppIdError("Поле обязательно для заполнения")
    } else {
      this.rootStore.errorsStore.deleteAppIdError()
    }

    if (this.firstPageAddForm.selectEditions.length === 0) {
      this.rootStore.errorsStore.addEditionsError("Выберете хотя бы одно издание")
    } else {
      this.rootStore.errorsStore.deleteEditionsError()
    }

    if (this.rootStore.errorsStore.checkFirstPageAddFormErrors()) {
      this.numberActivePage = 1
    } else {
      this.numberActivePage = 2
      this.addSecondPageAddForm()
    }
  }
}

