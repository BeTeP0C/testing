import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

type TMainProps = {
  children: React.ReactNode;
};

export const Main = observer(({ children }: TMainProps) => {
  return <main className={styles.main}>{children}</main>;
});
