import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameFormButtonBack } from "../AddedGameFormButtonBack";
import { AddedGameFormButtonCreate } from "../AddedGameFormButtonCreate";
import { ErrorsStore } from "../../../../../common/stores/errorsStore";
import { RootStoreContext } from "../../../../../pages/_app";

export const AddedGameFormSecondFunctionals = observer(() => {
  const { errorsStore } = useContext(RootStoreContext);

  return (
    <div className={styles.buttons}>
      {errorsStore.secondPageAddFormErrors.formError.active ? (
        <span className={styles.error}>
          {errorsStore.secondPageAddFormErrors.formError.message}
        </span>
      ) : (
        ""
      )}
      <AddedGameFormButtonBack />
      <AddedGameFormButtonCreate />
    </div>
  );
});
