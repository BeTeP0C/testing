import React, { useEffect, useState, createContext } from "react";
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

// const magazineStore = new MagazineStore()
export const StoreContext = createContext(null)

export const MainPage = observer(() => {
  const [magazineStore, setMagazineStore] = useState(new MagazineStore())
  useEffect(() => {
    let mounted: boolean = true;
    magazineStore.postAuth()
    if (mounted) {

    }

    return () => {mounted = false}
  }, [magazineStore.authorizate])
  // useEffect (() => {

  // }, [magazineStore.authorizate])

  return (
    <Page>
      <StoreContext.Provider value={magazineStore}>
        <Header />
        <Menu />
        <Main>
          <Content>
            <ButtonsStateProduct>
              <ButtonAddProduct store={magazineStore}/>
              {magazineStore.isOpenGameInfo.open ? <ButtonDeleteProduct store={magazineStore}/> : ""}
            </ButtonsStateProduct>

            {magazineStore.authorizate ?  <TableGames />: ""}

            {/* <StoreContext.Provider value={magazineStore}>

            </StoreContext.Provider> */}
            <MainInfo />
          </Content>
        </Main>

        <ActionsOverGame store={magazineStore}/>
      </StoreContext.Provider>
    </Page>
  )
})
