import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";

import { AddStore } from "../../../../../common/stores/addStore";
import { ErrorsStore } from "../../../../../common/stores/errorsStore";
import { RootStoreContext } from "../../../../../pages/_app";
import { AddedGameFormRegion } from "./AddedGameFormRegion/AddedGameFormRegion";

type TAddedGameFormRegions = {
  addStore: AddStore;
  errorsStore: ErrorsStore;
};

export const AddedGameFormRegions = observer(() => {
  const { addStore, errorsStore }: TAddedGameFormRegions =
    useContext(RootStoreContext);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        Регионы
        {/* {error?.visible ? (
          <span className={styles.error}>{error.errorMessage}</span>
        ) : (
          ""
        )} */}
      </h3>

      {addStore.secondPageAddForm.map((el) => {
        if (el.active) {
          return (
            <ul className={styles.list} key={uuidv4()}>
              {el.stores.map((store) => {
                if (store.active) {
                  return store.regions.map((region) => {
                    return (
                      <AddedGameFormRegion
                        key={uuidv4()}
                        title={region.titleRegion}
                        active={region.active}
                      />
                    );
                  });
                }
                return "";
              })}
            </ul>
          );
        }
        return "";
      })}
    </div>
  );
});
