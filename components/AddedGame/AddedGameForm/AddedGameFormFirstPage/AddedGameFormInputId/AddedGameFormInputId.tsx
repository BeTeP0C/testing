import React, { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";
import { ErrorsStore } from "../../../../../common/stores/errorsStore";

type TAddedGameEditionItem = {
  addStore: AddStore;
  errorsStore: ErrorsStore;
};

export const AddedGameFormInputId = observer(() => {
  const { addStore, errorsStore }: TAddedGameEditionItem =
    useContext(RootStoreContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef(null);

  const changeAppId = () => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      addStore.handleSearchSteamGame(
        Number(inputRef.current.value) === 0
          ? null
          : Number(inputRef.current.value),
      );
      clearTimeout(timeoutRef.current);
    }, 500);
  };

  const checkNumberInInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value.replace(/^\s+|\s+$|\D/g, "");
    inputRef.current.value = newValue;
  };

  const checkInputForPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const newValue = inputRef.current.value + text.replace(/^\s+|\s+$|\D/g, "");

    inputRef.current.value = newValue;
    if (newValue !== "" && newValue !== " ") {
      changeAppId();
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="id">
        App ID
        {errorsStore.firstPageAddFormErrors.appIdError.active ? (
          <span className={styles.error}>
            {errorsStore.firstPageAddFormErrors.appIdError.message}
          </span>
        ) : (
          ""
        )}
      </label>
      <input
        ref={inputRef}
        onChange={(e) => changeAppId()}
        onInput={(e) => checkNumberInInput(e)}
        onPaste={(e) => checkInputForPaste(e)}
        className={styles.input}
        type="text"
        name="id"
        placeholder="Введите appId"
        defaultValue={
          addStore.firstPageAddForm.appId === null
            ? ""
            : addStore.firstPageAddForm.appId
        }
      />
    </div>
  );
});
