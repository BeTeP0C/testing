import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";
import { ErrorsStore } from "../../../../../common/stores/errorsStore";

type TAddedGameInputTitle = {
  addStore: AddStore;
  errorsStore: ErrorsStore;
};

export const AddedGameInputTitle = observer(() => {
  const { addStore, errorsStore }: TAddedGameInputTitle =
    useContext(RootStoreContext);
  const [value, setValue] = useState(addStore.firstPageAddForm.titleName);

  const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="title">
        Название товара
        {errorsStore.firstPageAddFormErrors.titleNameError.active ? (
          <span className={styles.error}>
            {errorsStore.firstPageAddFormErrors.titleNameError.message}
          </span>
        ) : (
          ""
        )}
      </label>
      <input
        onInput={(e) => changeValue(e)}
        onBlur={(e) => addStore.handleSaveTitleProduct(e.currentTarget.value)}
        className={styles.input}
        type="text"
        name="title"
        defaultValue={value}
        placeholder="Введите название товара"
      />
    </div>
  );
});
