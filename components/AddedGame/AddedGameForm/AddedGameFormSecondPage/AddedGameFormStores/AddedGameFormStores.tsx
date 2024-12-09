import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";
import { AddedGameFormStore } from "./AddedGameFormStore/AddedGameFormStore";

export const AddedGameFormStores = observer(() => {
  const { addStore } = useContext(RootStoreContext);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Магазин</h3>

      {addStore.secondPageAddForm.map((el) => {
        if (el.active) {
          return (
            <ul className={styles.list} key={uuidv4()}>
              {el.stores.map((store) => {
                return (
                  <AddedGameFormStore
                    key={uuidv4()}
                    title={store.titleStore}
                    active={store.active}
                  />
                );
              })}
            </ul>
          );
        }
      })}
    </div>
  );
});
