import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { TEditionsOptions } from "../../../../types/edtitionInfo";

export function AddedGameFormTitleEdition(props: {
  editionOptions: TEditionsOptions[] | any[];
  setEditionOptions: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const { editionOptions, setEditionOptions } = props;
  const [showList, setShowList] = useState(false);
  const [editionSelect, setEditionSelect]: [string, React.Dispatch<string>] =
    useState(
      editionOptions.length !== 0
        ? editionOptions.find((el) => el.active)?.title
        : "Нет изданий",
    );

  const changeSelectTitle = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setEditionOptions(
      editionOptions.map((el) => {
        if (el.title === e.currentTarget.textContent) {
          return {
            ...el,
            active: true,
            regions: el.regions.map((region) => {
              return { ...region, active: false };
            }),
          };
        }
        return {
          ...el,
          active: false,
          regions: el.regions.map((region) => {
            return { ...region, active: false };
          }),
        };
      }),
    );

    setShowList(false);
  };

  const handleShowList = () => {
    setShowList(!showList);
  };

  useEffect(() => {
    console.log(editionOptions, "check")

    setEditionSelect(
      editionOptions.length !== 0
        ? editionOptions.find((el) => el.active)?.title
        : "Нет изданий",
    );
  }, [editionOptions]);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Издание</h3>

      <div className={styles.select_block}>
        <span
          role="button"
          tabIndex={0}
          onClick={() => handleShowList()}
          className={styles.edition_select}
        >
          {editionSelect}
        </span>

        <span
          className={`${styles.icon} ${showList ? styles.icon_open : ""}`}
        />

        <ul className={`${styles.list} ${showList ? styles.list_show : ""}`}>
          {editionOptions.length !== 0
            ? editionOptions.map((el: TEditionsOptions) => {
                if (el.posted) {
                  return (
                    <li
                      role="button"
                      tabIndex={0}
                      onClick={(e) => changeSelectTitle(e)}
                      className={`${styles.item} ${styles.item_posted}`}
                    >
                      {el.title}
                      <span className={styles.posted}>Добавлен</span>
                    </li>
                  );
                }
                if (editionSelect !== el.title) {
                  return (
                    <li
                      role="button"
                      tabIndex={0}
                      onClick={(e) => changeSelectTitle(e)}
                      className={`${styles.item}`}
                    >
                      {el.title}
                    </li>
                  );
                }

                return "";
              })
            : ""}
        </ul>
      </div>
    </div>
  );
}
