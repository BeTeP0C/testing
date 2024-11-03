import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss"
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

export function AddedGame () {
  const store: MagazineStore = useContext(StoreContext)
  const [packagesSelect, setPackagesSelect] = useState([])
  const [packagesChoice, setPackagesChoice] = useState([])
  const firstRef = useRef(null)
  const secondRef = useRef(null)
  // const formRef = useRef(null)

  const [isNextStep, setIsNextStep] = useState(false)

  const [title, setTitle] = useState("")
  const [appId, setAppId] = useState(null)
  const [editionTitle, setEditionTitle] = useState("")
  const [stores, setStores] = useState([])
  const [region, setRegion] = useState("")
  const [markup, setMarkup] = useState(null)
  const [briefDescr, setBriefDescr] = useState(null)
  const [fullDescr, setFullDescr] = useState(null)
  const [isGlobal, setIsGlobal] = useState(false)
  const [steamGame, setSteamGame] = useState({
    lastUpdated: "",
    name: "",
    packages: [],
    steamId: null
  })

  const addPack = (id: string) => {
    if (packagesSelect.length === 0) {
      setPackagesSelect([ ...packagesSelect, packagesChoice.find(el => el.id === id)])
      setPackagesChoice(packagesChoice.filter(el => el.id !== id))
      setEditionTitle(packagesSelect[0]?.title)
    }
  }

  const deletePack = (id: string) => {
    setPackagesChoice([...packagesChoice, packagesSelect.find(el => el.id === id)])
    setPackagesSelect(packagesSelect.filter(el => el.id !== id))
    setEditionTitle("")
  }

  useEffect(() => {
    if (isNextStep) {
      firstRef.current.style.transform = `translateX(-${firstRef.current.offsetWidth + 200}px)`
      secondRef.current.style.transform = `translateX(0px)`
      // formRef.current.style.height = `${secondRef.current.offsetHeight}px`
    } else {
      firstRef.current.style.transform = `translateX(0px)`
      secondRef.current.style.transform = `translateX(${secondRef.current.offsetWidth + 200}px)`
      // formRef.current.style.height = `${firstRef.current.offsetHeight}px`
    }
  }, [isNextStep])

  useEffect(() => {
    setPackagesChoice(steamGame.packages.map(el => {
      return {
        title: el.name,
        countries: el.restrictCountries,
        id: el.packageId
      }
    }))
  }, [steamGame])

  useEffect(() => {
    (async () => {
      appId ? setSteamGame(await store.getSteamGame(appId)) : false
    })()
  }, [appId])

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Добавление товара</h2>

      <AddedGameSteps isNext={isNextStep}/>

      <AddedGameForm>
        <div className={styles.form}>
          <div ref={firstRef} className={`${styles.first_block} ${!isNextStep ? styles.first_block_active : ""}`}>
            <AddedGameInputTitle title={title} setTitle={setTitle}/>
            <AddedGameInputId title={steamGame.name} setAppId={setAppId}/>
            <AddedGameEdition packagesChoice={packagesChoice} packagesSelect={packagesSelect} funcs={{deletePack, addPack}}/>
            <AddedGameFormButton setIsNextStep={setIsNextStep}/>
          </div>

          <div  ref={secondRef} className={`${styles.second_block} ${isNextStep ? styles.second_block_active : ""}`}>
            <AddedGameFormTitleEdition title={editionTitle}/>
            <AddedGameFormStores setStores={setStores}/>
            <AddedGameFormRegion setRegion={setRegion}/>
            <AddedGameFormGlobal setIsGlobal={setIsGlobal}/>
            <AddedGameFormMarkup setMarkup={setMarkup}/>
            {!isGlobal ? (
              <>
                <AddedGameFormBriefDescr setBriefDescr={setBriefDescr}/>
                <AddedGameFormFullDescr setFullDescr={setFullDescr}/>
              </>
            ): ""}
            <AddedGameFormPrices />

            <div className={styles.buttons}>
              <AddedGameFormButtonBack setIsNextStep={setIsNextStep}/>
              <AddedGameFormButtonCreate func={store.postGame} appId={Number(appId)} packageId={Number(Number(packagesSelect[0]?.id))} title={title}/>
            </div>
          </div>
        </div>
      </AddedGameForm>


    </div>
  )
}
