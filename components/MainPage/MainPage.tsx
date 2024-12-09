import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.scss";
import { Page } from "../Page";
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
import { SettingsPage } from "../SettingsPage";
import { Modal } from "../Modal";
import { DeleteWindow } from "../DeleteWindow";
import { RootStoreContext } from "../../pages/_app";
import { GlobalStore } from "../../common/stores/globalStore";
import { AddStore } from "../../common/stores/addStore";

type TMainPageStores = {
  globalStore: GlobalStore;
};

export const MainPage = observer(() => {
  const { globalStore }: TMainPageStores = useContext(RootStoreContext)
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await globalStore.startLoadingPage();

      if (!globalStore.isAuthorizate) {
        router.push("/auth");
      }
    })();
  }, [globalStore.isAuthorizate]);

  return (
    <Page>
      <Header />
      <Menu />
      <Main>
        <Content>
          {globalStore.currentPage === "main" ? (
            <>
              <ButtonsStateProduct>
                <ButtonAddProduct />
                {globalStore.products.some((el) => el.active) ? (
                  <ButtonDeleteProduct />
                ) : ""}
              </ButtonsStateProduct>

              {globalStore.isAuthorizate ? <TableGames /> : ""}
            </>
          ) : (
            ""
          )}

          {globalStore.currentPage === "settings" ? (
            <>
              <h2 className={styles.heading}>Настройки</h2>
              <SettingsPage />
            </>
          ) : (
            ""
          )}

          {/* <MainInfo
            funpayActivate={magazineStore.settingsData.funpayActivate}
          /> */}
        </Content>
      </Main>

      <CSSTransition
        timeout={300}
        in={globalStore.isOpenModal}
        classNames="drop-animation"
        unmountOnExit
      >
        <Modal>
          <CSSTransition
            timeout={300}
            in={globalStore.isOpenDeleteForm}
            classNames="drop-animation"
            unmountOnExit
          >
            <DeleteWindow />
          </CSSTransition>
        </Modal>
      </CSSTransition>

      <ActionsOverGame />
    </Page>
  );
});
