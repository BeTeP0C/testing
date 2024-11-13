import React from "react";
import styles from "./styles.module.scss";

type TContentProps = {
  children: React.ReactNode;
};

export function Content({ children }: TContentProps) {
  return <div className={styles.content}>{children}</div>;
}
