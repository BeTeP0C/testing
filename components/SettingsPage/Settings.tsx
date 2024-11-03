import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite";
import { MagazineStore } from "../../common/store";
import { createContext } from "vm";

// const magazineStore = new MagazineStore()
export const StoreContext = createContext(null)

export const Settings = observer(() => {
  // const [magazineStore, setMagazineStore] = useState(new MagazineStore())
  // useEffect(() => {
  //   let mounted: boolean = true;
  //   magazineStore.postAuth()
  //   if (mounted) {

  //   }

  //   return () => {mounted = false}
  // }, [magazineStore.authorizate])
  // useEffect (() => {

  // }, [magazineStore.authorizate])

  return (
    <div className={styles.container}>
      <form action="">
        <div>
          <label htmlFor=""></label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor=""></label>
          <input type="text" />
          <span></span>
        </div>
        <div>
          <h3></h3>
          <div></div>
          <div></div>
        </div>
        <button></button>
      </form>
    </div>
  )
})
