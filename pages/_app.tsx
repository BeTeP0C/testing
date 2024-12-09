import type { AppProps } from "next/app";
import React, { createContext } from "react";
import { enableStaticRendering, observer } from "mobx-react-lite";
import { RootStore } from "../common/stores/rootStore";
import "../styles/styles.global.scss";

enableStaticRendering(typeof window === "undefined");
export const RootStoreContext = createContext<RootStore | null>(null);
const rootStore = new RootStore();

export default observer(({ Component, pageProps }: AppProps) => (
  <RootStoreContext.Provider value={rootStore}>
    <Component {...pageProps} />
  </RootStoreContext.Provider>
));
