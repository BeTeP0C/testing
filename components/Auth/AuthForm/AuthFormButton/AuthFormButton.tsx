import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { ErrorsStore } from "../../../../common/stores/errorsStore";
import { RootStoreContext } from "../../../../pages/_app";

export const AuthFormButton = observer(() => {
  const { errorsStore } = useContext(RootStoreContext);

  return (
    <div className={styles.centering}>
      {errorsStore.authError.active ? (
        <span className={styles.error}>{errorsStore.authError.message}</span>
      ) : (
        ""
      )}
      <button type="submit" className={styles.button}>
        Войти
      </button>
    </div>
  );
});
