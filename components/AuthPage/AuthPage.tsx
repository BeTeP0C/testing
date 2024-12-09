import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { Page } from "../Page";
import { Auth } from "../Auth/Auth";
import { GlobalStore } from "../../common/stores/globalStore";
import { RootStoreContext } from "../../pages/_app";

export const AuthPage = observer(() => {
  const { globalStore } = useContext(RootStoreContext);
  const router = useRouter();

  useEffect(() => {
    if (globalStore.isAuthorizate) {
      router.push("/");
    }
  }, [globalStore.isAuthorizate]);

  return (
    <Page>
      <Auth />
    </Page>
  );
});
