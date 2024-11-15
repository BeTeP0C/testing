import React, { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
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
import { MagazineStore } from "../../common/store";
import { SettingsPage } from "../SettingsPage";

export const StoreContext = createContext(null);

export const MainPage = observer(() => {
  const [magazineStore, setMagazineStore] = useState(new MagazineStore());
  const [redirectToHome, setRedirectToHome] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await magazineStore.startLoadingPage();

      if (!magazineStore.authorizate) {
        router.push("/auth");
      }
    })();
  }, [magazineStore.authorizate]);

  return (
    <Page>
      <StoreContext.Provider value={magazineStore}>
        <Header />
        <Menu />
        <Main>
          <Content>
            {magazineStore.currentPage === "main" ? (
              <>
                <ButtonsStateProduct>
                  <ButtonAddProduct />
                  {magazineStore.isOpenGameInfo.open ? (
                    <ButtonDeleteProduct store={magazineStore} />
                  ) : (
                    ""
                  )}
                </ButtonsStateProduct>

                {magazineStore.authorizate ? <TableGames /> : ""}
              </>
            ) : (
              ""
            )}

            {magazineStore.currentPage === "settings" ? (
              <>
                <h2 className={styles.heading}>Настройки</h2>
                <SettingsPage />
              </>
            ) : (
              ""
            )}

            <MainInfo
              funpayActivate={magazineStore.settingsData.funpayActivate}
            />
          </Content>
        </Main>

        <ActionsOverGame store={magazineStore} />
      </StoreContext.Provider>
    </Page>
  );
});
