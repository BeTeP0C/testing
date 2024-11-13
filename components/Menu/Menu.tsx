import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { Logo } from "../Icons";
import { MenuList } from "./MenuList";
import { StoreContext } from "../MainPage";

export function Menu() {
  const store = useContext(StoreContext);

  return (
    <div className={styles.menu}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <nav className={styles.nav}>
          <MenuList />
        </nav>
      </div>
    </div>
  );
}
