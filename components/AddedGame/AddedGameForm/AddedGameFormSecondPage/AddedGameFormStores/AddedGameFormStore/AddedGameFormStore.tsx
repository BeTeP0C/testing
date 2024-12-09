import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

type TAddedGameFormStore = {
  title: string;
  active: boolean;
};

export const AddedGameFormStore = observer(({ title, active }: TAddedGameFormStore) => {
  return (
    <li className={styles.item}>
      <input
        className={styles.input}
        name="funpay"
        type="checkbox"
        id="funpay"
        checked={active}
      />
      <label className={styles.store} htmlFor="funpay">
        {title}
      </label>
    </li>
  );
});
