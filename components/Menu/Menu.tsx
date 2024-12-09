import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { Logo } from "../Icons";
import { MenuList } from "./MenuList";

export const Menu = observer(() => {
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
});
