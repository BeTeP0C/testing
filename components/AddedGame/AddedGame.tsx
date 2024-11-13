import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite";
import { AddedGameSteps } from "./AddedGameSteps";
import { AddedGameForm } from "./AddedGameForm";
import { AddedGameInputTitle } from "./AddedGameInputTitle";
import { AddedGameInputId } from "./AddedGameForm/AddedGameFormInputId";
import { AddedGameEdition } from "./AddedGameForm/AddedGameEdition";
import { AddedGameFormButton } from "./AddedGameForm/AddedGameFormButton";
import { AddedGameFormTitleEdition } from "./AddedGameForm/AddedGameFormTitleEdition";
import { MagazineStore } from "../../common/store";
import { StoreContext } from "../MainPage";
import { AddedGameFormStores } from "./AddedGameForm/AddedGameFormStores";
import { AddedGameFormRegion } from "./AddedGameForm/AddedGameFormRegion";
import { AddedGameFormGlobal } from "./AddedGameForm/AddedGameFormGlobal";
import { AddedGameFormMarkup } from "./AddedGameForm/AddedGameFormMarkup";
import { AddedGameFormBriefDescr } from "./AddedGameForm/AddedGameFormBriefDescr";
import { AddedGameFormFullDescr } from "./AddedGameForm/AddedGameFormFullDescr";
import { AddedGameFormPrices } from "./AddedGameForm/AddedGameFormPrices";
import { AddedGameFormButtonBack } from "./AddedGameForm/AddedGameFormButtonBack";
import { AddedGameFormButtonCreate } from "./AddedGameForm/AddedGameFormButtonCreate";
import { TEditionSteamGame } from "../../types/editionSteamGame";
import { TEditionTransformSteamGame } from "../../types/editionTransformSteamGame";

export const AddedGame = observer(() => {
  const store: MagazineStore = useContext(StoreContext)
  const [packagesSelect, setPackagesSelect] = useState([])
  const [packagesChoice, setPackagesChoice] = useState([])
  const firstRef = useRef(null)
  const secondRef = useRef(null)
  const [isNextStep, setIsNextStep] = useState(false)
  const [title, setTitle] = useState("")
  const [appId, setAppId] = useState(null)
  const [editionsOptions, setEditionOptions] = useState([])
  const [isGlobal, setIsGlobal] = useState(false)
  const [steamGame, setSteamGame] = useState({
    name: "",
    packages: [],
    steamId: null
  })

  const [firstPageErrors, setFirstPageErrors] = useState([
    {
      errorMessage: "Поле обязательно для заполнения",
      visible: title !== "" ? false : true,
      activate: false
    },
    {
      errorMessage: "Поле обязательно для заполнения",
      visible: appId ? false : true,
      activate: false
    },
    {
      errorMessage: "Выберите хотя бы одно издание",
      visible: packagesSelect.length !== 0 ? false : true,
      activate: false
    }
  ])

  useEffect(() => {
    const newErrors = firstPageErrors.map((el, index) => {
      if (index === 0) {
        return {...el,
          visible: title !== "" ? false : true,
        }
      } else if (index === 1) {
        return {...el,
          visible: appId ? false : true,
        }
      } else if (index === 2) {
        console.log(packagesSelect.length, "fsfds")
        return {...el,
          visible: packagesSelect.length !== 0 ? false : true,
        }
      }
    })

    setFirstPageErrors(newErrors)
  }, [title, appId, packagesSelect])

  const transformSteamGame =  (game: TEditionSteamGame): TEditionTransformSteamGame => {
    const countries: string[] = game.purchaseOptions.map(el => {
      return el.country
    })

    const uniqueCountries = countries.filter((el,index) => countries.indexOf(el) === index)

    return {
      name: game.name,
      steamId: game.id,
      packages: filterUniqueByField(game.purchaseOptions.map(el => {
        return {
          title: el.name,
          id: el.id,
          countries: uniqueCountries
        }
      }), "id")
    }
  }

  const addPack = (id: string) => {
    setPackagesSelect([ ...packagesSelect, packagesChoice.find(el => el.id === id)])
    setPackagesChoice(packagesChoice.filter(el => el.id !== id))
  }

  const deletePack = (id: string) => {
    setPackagesChoice([...packagesChoice, packagesSelect.find(el => el.id === id)])
    setPackagesSelect(packagesSelect.filter(el => el.id !== id))
  }

  useEffect(() => {
    if (isNextStep) {
      firstRef.current.style.transform = `translateX(-${firstRef.current.offsetWidth + 200}px)`
      secondRef.current.style.transform = `translateX(0px)`
    } else {
      firstRef.current.style.transform = `translateX(0px)`
      secondRef.current.style.transform = `translateX(${secondRef.current.offsetWidth + 200}px)`
    }
  }, [isNextStep])

  const filterUniqueByField = (arr: any[], field: string) => {
    const uniqueIds = new Set();
    return arr?.filter(item => {
      const itemId = item[field];
      if (!uniqueIds.has(itemId)) {
        uniqueIds.add(itemId);
        return true;
      }
      return false;
    });
  }

  useEffect(() => {
    setPackagesSelect([])
    setPackagesChoice(steamGame.packages)
    console.log(steamGame)
  }, [steamGame])

  useEffect(() => {
    (async () => {

      if (appId) {
        const steamGame = await store.getSteamGame(appId)
        store.isSearchGame ? setSteamGame(transformSteamGame(steamGame)) : false
      }
    })()
  }, [appId])

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Добавление товара</h2>

      <AddedGameSteps isNext={isNextStep}/>

      <AddedGameForm>
        <div className={styles.form}>
          <div ref={firstRef} className={`${styles.first_block} ${!isNextStep ? styles.first_block_active : ""}`}>
            <AddedGameInputTitle title={title} titleError={firstPageErrors[0]} setTitle={setTitle}/>
            <AddedGameInputId setAppId={setAppId} title={steamGame.name} idError={firstPageErrors[1]}/>
            <AddedGameEdition editionError={firstPageErrors[2]} packagesChoice={packagesChoice} packagesSelect={packagesSelect} funcs={{deletePack, addPack}}/>
            <AddedGameFormButton setErrors={setFirstPageErrors} errors={firstPageErrors} setIsNextStep={setIsNextStep} setEditionOptions={setEditionOptions} packagesSelect={packagesSelect}/>
          </div>

          <div  ref={secondRef} className={`${styles.second_block} ${isNextStep ? styles.second_block_active : ""}`}>
            <AddedGameFormTitleEdition editionOptions={editionsOptions} setEditionOptions={setEditionOptions}/>
            <AddedGameFormStores editionsOptions={editionsOptions}/>
            <AddedGameFormRegion editionsOptions={editionsOptions} setEditionOptions={setEditionOptions}/>
            <AddedGameFormGlobal setIsGlobal={setIsGlobal}/>
            <AddedGameFormMarkup editionsOptions={editionsOptions} setEditionOptions={setEditionOptions}/>
            <AddedGameFormBriefDescr isGlobal={isGlobal} editionsOptions={editionsOptions} setEditionOptions={setEditionOptions}/>
            <AddedGameFormFullDescr isGlobal={isGlobal} editionsOptions={editionsOptions} setEditionOptions={setEditionOptions}/>
            <AddedGameFormPrices />

            <div className={styles.buttons}>
              <AddedGameFormButtonBack setIsNextStep={setIsNextStep}/>
              <AddedGameFormButtonCreate appId={Number(appId)} packageId={Number(packagesSelect[0]?.id)} title={title} isGlobal={isGlobal} titleGame={steamGame.name} editionsOptions={editionsOptions}/>
            </div>
          </div>
        </div>
      </AddedGameForm>


    </div>
  )
})
