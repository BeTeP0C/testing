import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

type TContentProps = {
  children: React.ReactNode;
};

export const Content = observer(({ children }: TContentProps) => {
  return <div className={styles.content}>{children}</div>;
});
