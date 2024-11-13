import React from "react";
import styles from "./styles.module.scss";

type TMainProps = {
  children: React.ReactNode;
};

export function Main({ children }: TMainProps) {
  return <main className={styles.main}>{children}</main>;
}
