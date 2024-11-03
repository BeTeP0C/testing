import React from "react";
import styles from "./styles.module.scss"
import { MenuItem } from "../MenuItem";
import { menu } from "../../../common/menu";
// import { IconProps } from "../../../types/icons";

export function MenuList () {
  return (
    <ul className={styles.list}>
      {menu.map((el) => {
        return (
          <MenuItem key={el.id} Icon={el.Icon} href={el.href} active={el.active}/>
        )
      })}
    </ul>
  )
}
