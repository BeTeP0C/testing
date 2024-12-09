import { makeAutoObservable, runInAction, toJS } from "mobx";
import { RootStore } from "./rootStore";
import axios from "axios";
import translate from "translate";
import { TFunPayItem, TFunPayStore, TFunPaySubItem, TProduct, TStateData } from "../../types/global";
import { stat } from "fs";

export class EditorStore {
  rootStore: RootStore

  isSaveState: TStateData = "dead"

  constructor (RootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = RootStore
  }

  handleEditorMode = () => {
    this.rootStore.globalStore.products = this.rootStore.globalStore.products.map(product => {
      if (product.active) {
        return {
          ...product,
          funPayItems: product.funPayItems.map(funpayItem => {
            if (funpayItem.active) {
              return {
                ...funpayItem,
                stores: funpayItem.stores.map(store => {
                  if (store.active) {
                    return {
                      ...store,
                      items: store.items.map(item => {
                        if (item.active) {
                          return {
                            ...item,
                            countryInfo: {
                              ...item.countryInfo,
                              isEdit: true
                            }
                          }
                        }

                        return item
                      })
                    }
                  }

                  return store
                })
              }
            }

            return funpayItem
          })
        }
      }

      return product
    })
  }

  async saveProdData (briefDescr: string, fullDescr: string, count = 0): Promise<number> {
    const currentItem = this.rootStore.globalStore.products.find(product => product.active)
    .funPayItems.find(funpayItem => funpayItem.active)
    const currentStore = currentItem.stores.find(store => store.active)

    if (briefDescr.length === 0) {
      this.rootStore.errorsStore.addBriefDescrForm("Поле не может быть пустым")
    } else if (briefDescr.length < 15) {
      this.rootStore.errorsStore.addBriefDescrForm("Минимум 15 символов")
    } else if (fullDescr.length === 0) {
      this.rootStore.errorsStore.addFullDescrForm("Поле не может быть пустым")
    } else if (fullDescr.length < 15) {
      this.rootStore.errorsStore.addFullDescrForm("Минимум 15 символов")
    } else {
      this.rootStore.errorsStore.deleteBriefDescrForm()
      this.rootStore.errorsStore.deleteFullDescrForm()
      if (currentItem && currentStore) {
        try {
          const resp = await axios.patch(`${this.rootStore.globalStore.endpoint}items/funpay/${currentItem.id}`,
            {
              "internalName": currentItem.internalName,
              "genre": currentItem.genre,
              "shortDescriptionRu": currentItem.shortDescriptionRu,
              "longDescriptionRu": currentItem.shortDescriptionRu,
              "shortDescriptionEn": currentItem.shortDescriptionEn,
              "longDescriptionEn": currentItem.longDescriptionEn,
              "overpaymentPercent": currentItem.overpaymentPercent,
              "items": await Promise.all(currentStore.items.map(async (el) => {
                if (el.active) {
                  return {
                    "offerId": el.offerId,
                    "isOwnDescription": el.isOwnDescription,
                    "isActive": el.isActive,
                    "isDeactivatedAfterSale": el.isDeactivatedAfterSale,
                    "country": el.country,
                    "shortDescriptionRu": briefDescr,
                    "longDescriptionRu": fullDescr,
                    "shortDescriptionEn": await translate(briefDescr, {from: "ru", to: "en"}),
                    "longDescriptionEn": await translate(fullDescr, {from: "ru", to: "en"})
                  }
                } else {
                  return {
                    "offerId": el.offerId,
                    "isOwnDescription": el.isOwnDescription,
                    "isActive": el.isActive,
                    "isDeactivatedAfterSale": el.isDeactivatedAfterSale,
                    "country": el.country,
                    "shortDescriptionRu": el.countryInfo.shortDescriptionRu,
                    "longDescriptionRu": el.countryInfo.longDescriptionRu,
                    "shortDescriptionEn": el.countryInfo.shortDescriptionEn,
                    "longDescriptionEn": el.countryInfo.longDescriptionEn
                  }
                }
              }).filter(Boolean))
            }, {
            headers: {
              "Authorization": `Bearer ${this.rootStore.globalStore.TOKEN}`
            }
          })

          this.rootStore.errorsStore.deleteForm()
          return resp.status
        } catch (error) {
          if (error.status === 401) {
            this.rootStore.globalStore.logout()
          } else if (error.status === 404) {
            this.rootStore.errorsStore.addForm("Этого товара не существует. Перезагрузите страницу")
          } else if (error.status === 500) {
            if (count === 0) {
              this.rootStore.globalStore.checkFunpayKey(this.rootStore.globalStore.userProfile.funPayGoldenKey)
              this.saveProdData(briefDescr, fullDescr, 1)
            } else {
              this.rootStore.errorsStore.addForm("Ошибка сервера. Попробуйте позже")
            }
          }

          return error.status
        }
      }
    }
  }

  handleSaveNewValues = async (briefDescr: string, fullDescr: string) => {
    this.isSaveState = "loading"
    const status = await this.saveProdData(briefDescr, fullDescr)

    if (status === 204) {
      this.rootStore.globalStore.products = this.rootStore.globalStore.products.map(product => {
        if (product.active) {
          return {
            ...product,
            funPayItems: product.funPayItems.map(funpayItem => {
              if (funpayItem.active) {
                return {
                  ...funpayItem,
                  stores: funpayItem.stores.map(store => {
                    if (store.active) {
                      return {
                        ...store,
                        items: store.items.map(item => {
                          if (item.active) {
                            return {
                              ...item,
                              countryInfo: {
                                ...item.countryInfo,
                                shortDescriptionRu: briefDescr,
                                longDescriptionRu: fullDescr,
                                isEdit: false
                              }
                            }
                          }

                          return item
                        })
                      }
                    }

                    return store
                  })
                }
              }

              return funpayItem
            })
          }
        }

        return product
      })
    }

    this.isSaveState = "dead"
  }

  async deleteFunpayCountryData (funpayItem: TFunPayItem, store: TFunPayStore, count = 0) {
    try {
      this.rootStore.globalStore.isDeleteState = "loading"
      const resp = await axios.patch(`${this.rootStore.globalStore.endpoint}items/funpay/${funpayItem.id}`, {
        "internalName": funpayItem.internalName,
        "genre": funpayItem.genre,
        "shortDescriptionRu": funpayItem.shortDescriptionRu,
        "longDescriptionRu": funpayItem.shortDescriptionRu,
        "shortDescriptionEn": funpayItem.shortDescriptionEn,
        "longDescriptionEn": funpayItem.longDescriptionEn,
        "overpaymentPercent": funpayItem.overpaymentPercent,
        "items": store.items.map(item => {
          if (!item.active) {
            return {
              "offerId": item.offerId,
              "isOwnDescription": item.isOwnDescription,
              "isActive": item.isActive,
              "isDeactivatedAfterSale": item.isDeactivatedAfterSale,
              "country": item.country,
              "shortDescriptionRu": item.countryInfo.shortDescriptionRu,
              "longDescriptionRu": item.countryInfo.longDescriptionRu,
              "shortDescriptionEn": item.countryInfo.shortDescriptionEn,
              "longDescriptionEn": item.countryInfo.longDescriptionEn
            }
          }
          return false
        }).filter(Boolean)
      }, {
        headers: {
          "Authorization": `Bearer ${this.rootStore.globalStore.TOKEN}`
        }
      })

      this.rootStore.globalStore.isDeleteState = "dead"
      this.rootStore.errorsStore.deleteDeleteForm()
      return resp.status
    } catch (error) {
      if (error.status === 401) {
        this.rootStore.globalStore.logout()
      } else if (error.status === 404) {
        this.rootStore.errorsStore.addDeleteForm("Этот товар уже удален")
      } else if (error.status === 500) {
        if (count === 0) {
          this.rootStore.globalStore.checkFunpayKey(this.rootStore.globalStore.userProfile.funPayGoldenKey)
          this.deleteFunpayCountryData(funpayItem, store, 1)
        } else {
          this.rootStore.errorsStore.addDeleteForm("Ошибка сервера. Попробуйте позже")
        }
      }

      this.rootStore.globalStore.isDeleteState = "dead"
      return error.status
    }
  }

  deleteItemLocal = () => {
    this.rootStore.globalStore.products = this.rootStore.globalStore.products.filter(product => !product.active)
  }


  deleteFunpayEditionLocal = () => {
    this.rootStore.globalStore.products = this.rootStore.globalStore.products.map(product => {
      if (product.active) {
        return {
          ...product,
          funPayItems: product.funPayItems.filter(item => !item.active)
        }
      }
      return product
    })
  }

  deleteFunpayCountryLocal = () => {
    this.rootStore.globalStore.products = this.rootStore.globalStore.products.map(product => {
      if (product.active) {
        return {
          ...product,
          funPayItems: product.funPayItems.map(funpayItem => {
            if (funpayItem.active) {
              return {
                ...funpayItem,
                stores: funpayItem.stores.map(store => {
                  if (store.active) {
                    return {
                      ...store,
                      items: store.items.filter(item => !item.active)
                    }
                  }

                  return store
                })
              }
            }

            return funpayItem
          })
        }
      }
      return product
    })
  }

  // async deleteProductData () {
  //   const itemDeleting = this.rootStore.globalStore.products.find(product => product.active)

  //   if (itemDeleting) {
  //     this.rootStore.globalStore.isDeleteState = "loading"
  //     await Promise.all(itemDeleting.funPayItems.map(async (funPayItem) => {
  //       await this.rootStore.globalStore.deleteFunpayItemData(funPayItem.id)
  //       this.rootStore.globalStore.deleteFunpayItemLocal(funPayItem.id)
  //     }))

  //     await Promise.all(itemDeleting.ides.map(async (id) => {
  //       await this.rootStore.globalStore.deleteSteamItemData(id)
  //     }))

  //     runInAction(() => {
  //       this.rootStore.globalStore.isDeleteState = "dead"
  //     })
  //     this.rootStore.globalStore.deleteItemLocal(itemDeleting.id)
  //     this.rootStore.globalStore.handleCloseDeleteForm()
  //     return 204
  //   }
  // }

  deleteFunpayCountry = async () => {
    const productActive: TProduct = this.rootStore.globalStore.products.find(product => product.active)
    const funpayActive: TFunPayItem = productActive.funPayItems.find(funpayItem => funpayItem.active)
    const storeActive = funpayActive.stores.find(store => store.active)
    const itemActive = storeActive.items.find(item => item.active)

    this.rootStore.globalStore.isDeleteState = "loading"
    if (storeActive.items.length === 1) {
      if (productActive.funPayItems.length === 1) {
        const status = await this.rootStore.globalStore.deleteProductData()

        if (status === 204) {
          // this.rootStore.globalStore.deleteItemLocal(productActive.id)
          this.rootStore.globalStore.handleCloseDeleteForm()
        }
      } else {
        const status = await this.rootStore.globalStore.deleteFunpayItemData(funpayActive.id)

        if (status === 204) {
          this.rootStore.tableStore.setHeight(this.rootStore.tableStore.perhapsEditionHeight)
          this.rootStore.globalStore.handleCloseDeleteForm()

          setTimeout(() => {
            this.deleteFunpayEditionLocal()
            this.rootStore.tableStore.setHeight(0)
          }, 500)
        }
      }
    } else {
      const status = await this.deleteFunpayCountryData(funpayActive, storeActive)

      if (status === 204) {
        this.rootStore.tableStore.setHeight(this.rootStore.tableStore.perhapsCountryHeight)
        this.rootStore.globalStore.handleCloseDeleteForm()

        setTimeout(() => {
          this.deleteFunpayCountryLocal()
          this.rootStore.tableStore.setHeight(0)
        }, 500)

      }
    }

    console.log(toJS(this.rootStore.globalStore.products))

    runInAction(() => {
      this.rootStore.globalStore.isDeleteState = "dead"
    })
  }
}
