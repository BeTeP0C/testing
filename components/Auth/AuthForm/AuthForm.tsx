import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { GlobalStore } from "../../../common/stores/globalStore";
import { RootStoreContext } from "../../../pages/_app";
import { ErrorsStore } from "../../../common/stores/errorsStore";

type TAuthForm = {
  children: React.ReactNode;
  login: string;
  password: string;
};

type TAuthFormStores = {
  globalStore: GlobalStore;
  errorsStore: ErrorsStore;
};

export const AuthForm = observer((props: TAuthForm) => {
  const { children, login, password } = props;
  const { globalStore, errorsStore }: TAuthFormStores =
    useContext(RootStoreContext);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status: number = await globalStore.postAuth(login, password);
    if (status === 401) {
      errorsStore.addAuthError();
    } else if (status === 200) {
      errorsStore.resetAuthError();
    }
  };

  return (
    <form method="post" onSubmit={handleAuth} className={styles.form}>
      {children}
    </form>
  );
});
