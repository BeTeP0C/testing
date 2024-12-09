import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

type TPageProps = {
  children: React.ReactNode;
};

export const Page = observer(({ children }: TPageProps) => {
  return (
    <div className={styles.page}>
      <div className={styles.page_wrapper}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
});
