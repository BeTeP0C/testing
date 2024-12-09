import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { MenuItem } from "../MenuItem";
import { menu } from "../../../common/menu";

export const MenuList = observer(() => {
  return (
    <ul className={styles.list}>
      {menu.map((el) => {
        return (
          <MenuItem
            key={el.id}
            Icon={el.Icon}
            page={el.page}
            active={el.active}
            type={el.type}
          />
        );
      })}
    </ul>
  );
});
