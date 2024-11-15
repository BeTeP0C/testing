import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { log } from "console";
import styles from "./styles.module.scss";
import { StoreContext } from "../../../AuthPage";
import { MagazineStore } from "../../../../common/store";

type TAuthFormButton = {
  login: string;
  password: string;
};

export const AuthFormButton = observer(
  ({ login, password }: TAuthFormButton) => {
    const store: MagazineStore = useContext(StoreContext);
    const [error, setError] = useState(false);

    useEffect(() => {
      // console.log(store.authorizate)
      // console.log("Привет")
    }, []);

    const handleAuth = async () => {
      const status = await store.postAuth(login, password);
      if (status === 401) {
        setError(true);
      } else if (status === 200) {
        setError(false);
      }
    };

    return (
      <div className={styles.centering}>
        {error ? (
          <span className={styles.error}>Неправильный логин или пароль</span>
        ) : (
          ""
        )}
        <button
          type="button"
          onClick={(e) => handleAuth()}
          className={styles.button}
        >
          Войти
        </button>
      </div>
    );
  },
);
