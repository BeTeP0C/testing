import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";
import { TAuthError } from "../../types/errors";

export class ErrorsStore {
  rootStore: RootStore

  authError: TAuthError = {
    active: false,
    message: ""
  }

  firstPageAddFormErrors = {
    titleNameError: {
      active: false,
      message: ""
    },
    appIdError: {
      active: false,
      message: ""
    },
    editionsError: {
      active: false,
      message: ""
    }
  }

  secondPageAddFormErrors = {
    shortDescrError: {
      active: false,
      message: ""
    },
    fullDescrError: {
      active: false,
      message: ""
    },
    formError: {
      active: false,
      message: ""
    }
  }

  deleteFormErrors = {
    active: false,
    message: ""
  }

  editFormErrors = {
    shortDescrError: {
      active: false,
      message: ""
    },
    fullDescrError: {
      active: false,
      message: ""
    },
    formError: {
      active: false,
      message: ""
    }
  }

  constructor (RootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = RootStore
  }

  resetAuthError () {
    this.authError = {
      active: false,
      message: ""
    }
  }

  addDeleteForm (message: string) {
    this.deleteFormErrors = {
      active: true,
      message: message
    }
  }

  deleteDeleteForm () {
    this.deleteFormErrors = {
      active: false,
      message: ""
    }
  }

  addBriefDescrForm (message: string) {
    this.editFormErrors = {
      ...this.editFormErrors,
      shortDescrError: {
        active: true,
        message: message
      }
    }
  }

  deleteBriefDescrForm () {
    this.editFormErrors = {
      ...this.editFormErrors,
      shortDescrError: {
        active: false,
        message: ""
      }
    }
  }

  addFullDescrForm (message: string) {
    this.editFormErrors = {
      ...this.editFormErrors,
      fullDescrError: {
        active: true,
        message: message
      }
    }
  }

  deleteFullDescrForm () {
    this.editFormErrors = {
      ...this.editFormErrors,
      fullDescrError: {
        active: false,
        message: ""
      }
    }
  }

  addForm (message: string) {
    this.editFormErrors = {
      ...this.editFormErrors,
      formError: {
        active: true,
        message: message
      }
    }
  }

  deleteForm () {
    this.editFormErrors = {
      ...this.editFormErrors,
      formError: {
        active: false,
        message: ""
      }
    }
  }

  addAuthError () {
    this.authError = {
      active: true,
      message: "Неправильный логин или пароль"
    }
  }

  addTitleNameError (message: string) {
    this.firstPageAddFormErrors = {
      ...this.firstPageAddFormErrors,
      titleNameError: {
        active: true,
        message: message
      }
    }
  }

  deleteTitleNameError () {
    this.firstPageAddFormErrors = {
      ...this.firstPageAddFormErrors,
      titleNameError: {
        active: false,
        message: ""
      }
    }
  }

  addAppIdError (message: string) {
    this.firstPageAddFormErrors = {
      ...this.firstPageAddFormErrors,
      appIdError: {
        active: true,
        message: message
      }
    }
  }

  deleteAppIdError () {
    this.firstPageAddFormErrors = {
      ...this.firstPageAddFormErrors,
      appIdError: {
        active: false,
        message: ""
      }
    }
  }

  addEditionsError (message: string) {
    this.firstPageAddFormErrors = {
      ...this.firstPageAddFormErrors,
      editionsError: {
        active: true,
        message: message
      }
    }
  }

  deleteEditionsError () {
    this.firstPageAddFormErrors = {
      ...this.firstPageAddFormErrors,
      editionsError: {
        active: false,
        message: ""
      }
    }
  }

  checkFirstPageAddFormErrors () {
    if (Object.values(this.firstPageAddFormErrors).some(error => error.active)) {
      return true
    }
    return false
  }

  addShortDescrError (message: string) {
    this.secondPageAddFormErrors = {
      ...this.secondPageAddFormErrors,
      shortDescrError: {
        active: true,
        message: message
      }
    }
  }

  deleteShortDescrError () {
    this.secondPageAddFormErrors = {
      ...this.secondPageAddFormErrors,
      shortDescrError: {
        active: false,
        message: ""
      }
    }
  }

  addFullDescrError (message: string) {
    this.secondPageAddFormErrors = {
      ...this.secondPageAddFormErrors,
      fullDescrError: {
        active: true,
        message: message
      }
    }
  }

  deleteFullDescrError () {
    this.secondPageAddFormErrors = {
      ...this.secondPageAddFormErrors,
      fullDescrError: {
        active: false,
        message: ""
      }
    }
  }

  addFormError (message: string) {
    this.secondPageAddFormErrors = {
      ...this.secondPageAddFormErrors,
      formError: {
        active: true,
        message: message
      }
    }
  }

  deleteFormError () {
    this.secondPageAddFormErrors = {
      ...this.secondPageAddFormErrors,
      formError: {
        active: false,
        message: ""
      }
    }
  }

  checkSecondPageAddFormErrors () {
    if (Object.values(this.secondPageAddFormErrors).some(error => error.active)) {
      return true
    }
    return false
  }
}
