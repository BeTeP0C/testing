import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

export const SettingsForm = observer((props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      {children}
    </form>
  );
});
