import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { Page } from "../Page";
import { MagazineStore } from "../../common/store";
import { Auth } from "../Auth/Auth";

export const StoreContext = createContext(null);
const store: MagazineStore = new MagazineStore();

export const AuthPage = observer(() => {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (store.authorizate) {
      router.push("/");
      setRedirectToHome(true);
    }
  }, [store.authorizate]);

  return (
    <Page>
      <StoreContext.Provider value={store}>
        <Auth />
      </StoreContext.Provider>
    </Page>
  );
});
