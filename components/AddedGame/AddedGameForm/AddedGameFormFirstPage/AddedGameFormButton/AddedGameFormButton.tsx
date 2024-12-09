import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { RootStoreContext } from "../../../../../pages/_app";
import { AddStore } from "../../../../../common/stores/addStore";

type TPackagesSelect = {
  title: string;
  countries: string[];
  id: string;
  price: number;
}[];

export const AddedGameFormButton = observer(() => {
  const { addStore } = useContext(RootStoreContext);

  return (
    <div className={styles.container}>
      <button
        onClick={() => addStore.handleNextPageForm()}
        className={styles.button}
        type="button"
      >
        Далее
      </button>
    </div>
  );
});
