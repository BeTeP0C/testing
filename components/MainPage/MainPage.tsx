import React, { useEffect, useState, createContext } from "react";
import styles from "./styles.module.scss"
import {Page} from "../Page";
import { Header } from "../Header";
import { Menu } from "../Menu";
import { Main } from "../Main";
import { Content } from "../Content";
import { ButtonsStateProduct } from "../ButtonsStateProduct";
import { ButtonAddProduct } from "../ButtonAddProduct";
import { ButtonDeleteProduct } from "../ButtonDeleteProduct";
import { TableGames } from "../TabelGames";
import { MainInfo } from "../MainInfo";
import { ActionsOverGame } from "../ActionsOverGame";
import { observer } from "mobx-react-lite";
import { MagazineStore } from "../../common/store";
import { SettingsPage } from "../SettingsPage";

// const magazineStore = new MagazineStore()
export const StoreContext = createContext(null)

export const MainPage = observer(() => {
  const [magazineStore, setMagazineStore] = useState(new MagazineStore())
  useEffect(() => {
    let mounted: boolean = true;
    magazineStore.postAuth()
    // magazineStore.connectToSteam()
    // console.log(magazineStore.currentPage)

    return () => {mounted = false}
  }, [magazineStore.authorizate])

  // useEffect(() => {

  // }, [])
  // // useEffect (() => {

  // // }, [magazineStore.authorizate])

  return (
    <Page>
      <StoreContext.Provider value={magazineStore}>
        <Header titleStore={magazineStore.settingsData.titleStore} funpayActivate={magazineStore.settingsData.funpayActivate}/>
        <Menu />
        <Main>
          <Content>
            {magazineStore.currentPage === "main" ? (
              <>
                <ButtonsStateProduct>
                  <ButtonAddProduct store={magazineStore}/>
                  {magazineStore.isOpenGameInfo.open ? <ButtonDeleteProduct store={magazineStore}/> : ""}
                </ButtonsStateProduct>

                {magazineStore.authorizate ?  <TableGames />: ""}
              </>
            ) : ""}

            {magazineStore.currentPage === "settings" ? (
              <>
                <h2 className={styles.heading}>Настройки</h2>
                <SettingsPage />
              </>
            ) : ""}

            {/* <StoreContext.Provider value={magazineStore}>

            </StoreContext.Provider> */}
            <MainInfo funpayActivate={magazineStore.settingsData.funpayActivate}/>
          </Content>
        </Main>

        <ActionsOverGame store={magazineStore}/>
      </StoreContext.Provider>
    </Page>
  )
})
