import { makeAutoObservable, runInAction, toJS } from "mobx";
import { RootStore } from "./rootStore";
import { calendar } from "../calendar";

export class TableStore {
  rootStore: RootStore

  isLoadingTable: boolean = false
  negativeHeight: number = 0
  perhapsCountryHeight: number = 0
  perhapsEditionHeight: number = 0
  sortType: "top" | "bottom" = "top"

  constructor (RootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = RootStore
  }

  private getMonthFromString(month: string): number {
    return calendar.indexOf(month);
  }

  private parseDate(dateString: string): Date {
    const parts = dateString.split(' ');
    const day = parseInt(parts[0], 10);
    const month = this.getMonthFromString(parts[1]?.split(".")[0]);
    const year = parseInt(parts[2], 10);
    const hour = parseInt(parts[3].split(":")[0])
    const minutes = parseInt(parts[3].split(":")[0])

    return new Date(year, month, day, hour, minutes);
  }

  setPerhapsCountryHeight (height: number) {
    this.perhapsCountryHeight = height
  }


  setPerhapsEditionHeight (height: number) {
    this.perhapsEditionHeight = height
  }

  sortProductForDate () {
    runInAction(() => {
      let sortProduct = this.rootStore.globalStore.products
      sortProduct.sort((a, b) => {
        const dateA = this.parseDate(a.lastUpdated);
        const dateB = this.parseDate(b.lastUpdated);

        if (this.sortType === "bottom") {

          this.sortType = "top"
          return dateB.getTime() - dateA.getTime()
        } else if (this.sortType === "top") {
          this.sortType = "bottom"
          return dateA.getTime() - dateB.getTime()
        }

        return 0
      });
    })
  }

  handleOpenProduct(id: number) {
    this.negativeHeight = 0
    this.rootStore.globalStore.products = this.rootStore.globalStore.products.map(product => {
      if (product.id === id) {
        if (product.active) {
          return {
            ...product,
            active: false
          }
        } else {
          return {
            ...product,
            active: true
          }
        }
      } else {
        return {
          ...product,
          active: false
        }
      }
    })
  }

  handleOpenEdition(funpayId: number, height: number) {
    this.rootStore.globalStore.products = this.rootStore.globalStore.products.map(product => {
      if (product.active) {
        return {
          ...product,
          funPayItems: product.funPayItems.map(item => {
            if (item.id === funpayId) {
              if (item.active) {
                return {
                  ...item,
                  active: false
                }
              } else {
                this.negativeHeight = 0
                return {
                  ...item,
                  active: true,
                  stores: item.stores.map(store => {
                    if (product.funPayItems.some(funpayItem => funpayItem.active)) {
                      return {
                        ...store,
                        active: product.funPayItems.find(funpayItem => funpayItem.active).stores.find(el => el.storeName === "FunPay").active,
                        items: store.items.map((el, index) => {
                          if (product.funPayItems.find(funpayItem => funpayItem.active).stores.find(el => el.storeName === "FunPay").items.some(e => e.active)) {
                            return {
                              ...el,
                              active: index === 0 ? true : false
                            }
                          } else {
                            return el
                          }
                        })
                      }
                    } else {
                      return store
                    }
                  })
                }
              }
            } else {
              return {
                ...item,
                active: false
              }
            }
          })
        }
      } else {
        return {
          ...product,
        }
      }
    })
  }

  handleOpenStore(storeName: string, height: number) {
    this.rootStore.globalStore.products = this.rootStore.globalStore.products.map(product => {
      if (product.active) {
        return {
          ...product,
          funPayItems: product.funPayItems.map(funPayItem => {
            if (funPayItem.active) {
              return {
                ...funPayItem,
                stores: funPayItem.stores.map(store => {
                  if (store.storeName === storeName) {
                    if (store.active) {
                      this.negativeHeight = height

                      return {
                        ...store,
                        active: false
                      }
                    } else {
                      this.negativeHeight = 0
                      return {
                        ...store,
                        active: true
                      }
                    }
                  } else {
                    return {
                      ...store,
                      active: false
                    }
                  }
                })
              }
            } else {
              return funPayItem
            }
          })
        }
      } else {
        return product
      }
    })
  }

  setHeight (height: number) {
    this.negativeHeight = height
  }

  handleOpenCountry (country: string, height: number) {

    this.rootStore.globalStore.products = this.rootStore.globalStore.products.map(product => {
      if (product.active) {
        return {
          ...product,
          funPayItems: product.funPayItems.map(funPayItem => {
            if (funPayItem.active) {
              return {
                ...funPayItem,
                stores: funPayItem.stores.map(store => {
                  if (store.active) {
                    return {
                      ...store,
                      items: store.items.map(item => {
                        if (item.country === country) {
                          if (item.active) {
                            this.negativeHeight = height
                            return {
                              ...item,
                              active: false
                            }
                          } else {
                            this.negativeHeight = 0
                            return {
                              ...item,
                              active: true
                            }
                          }
                        } else {
                          return {
                            ...item,
                            active: false
                          }
                        }
                      })
                    }
                  } else {
                    return store
                  }
                })
              }
            } else {
              return funPayItem
            }
          })
        }
      } else {
        return product
      }
    })
  }

}
