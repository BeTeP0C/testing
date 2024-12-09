import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TEditionsOptions } from "../../../../../types/edtitionInfo";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";

export const AddedGameFormTitleEdition = observer(() => {
  const { addStore } = useContext(RootStoreContext);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Издание</h3>

      <div className={styles.select_block}>
        <span
          role="button"
          tabIndex={0}
          onClick={() => addStore.changeShowDropList()}
          className={styles.edition_select}
        >
          {(() => {
            if (addStore.secondPageAddForm.some((el) => el.active)) {
              return addStore.secondPageAddForm.find((el) => el.active)
                .titleEdition;
            }
            return "Нет Изданий";
          })()}
        </span>

        <span
          className={`${styles.icon} ${addStore.isShowDropList ? styles.icon_open : ""}`}
        />

        {addStore.secondPageAddForm.length !== 1 ? (
          <ul
            className={`${styles.list} ${addStore.isShowDropList ? styles.list_show : ""}`}
          >
            {addStore.secondPageAddForm.map((el) => {
              if (el.posted) {
                return (
                  <li
                    key={el.id}
                    role="button"
                    tabIndex={0}
                    className={`${styles.item} ${styles.item_posted}`}
                  >
                    {el.titleEdition}
                    <span className={styles.posted}>Добавлен</span>
                  </li>
                );
              }
              if (
                el.titleEdition !==
                addStore.secondPageAddForm.find((item) => item.active)
                  ?.titleEdition
              ) {
                return (
                  <li
                    key={el.id}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => addStore.changeEditionActive(el.id)}
                    className={`${styles.item}`}
                  >
                    {el.titleEdition}
                  </li>
                );
              }
              return "";
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
});
