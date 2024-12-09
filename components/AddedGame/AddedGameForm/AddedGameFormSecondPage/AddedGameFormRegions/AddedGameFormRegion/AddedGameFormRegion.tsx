import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { Russia } from "../../../../../Icons/CoutryFlags/Russia";
import { Kazahstan } from "../../../../../Icons/CoutryFlags/Kazahstan";
import { Ukraine } from "../../../../../Icons/CoutryFlags/Ukraine";
import { Belarus } from "../../../../../Icons/CoutryFlags/Belarus";
import { USA } from "../../../../../Icons/CoutryFlags/USA";
import { AddStore } from "../../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../../pages/_app";

type TAddedGameFormRegion = {
  title: string;
  active: boolean;
};

export const AddedGameFormRegion = observer(
  ({ title, active }: TAddedGameFormRegion) => {
    const { addStore } = useContext(RootStoreContext);

    return (
      <li className={styles.item}>
        <input
          onChange={(e) => addStore.changeRegionActive(title)}
          type="radio"
          className={styles.input}
          name="region"
          id={`region-${title}`}
          value={title}
          checked={active}
        />

        <label className={styles.region} htmlFor={`region-${title}`}>
          {(() => {
            switch (title) {
              case "ru":
                return <Russia />;
              case "kz":
                return <Kazahstan />;
              case "ua":
                return <Ukraine />;
              case "by":
                return <Belarus />;
              case "us":
                return <USA />;
              default:
                return "";
            }
          })()}
          {title}
        </label>
      </li>
    );
  },
);
