import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

export const TableInfoProductEditButton = observer(
  (props: { handleEdit: () => void }) => {
    const { handleEdit } = props;

    return (
      <button
        onClick={(e) => handleEdit()}
        type="button"
        className={styles.button_edit}
      >
        Редактировать
      </button>
    );
  },
);
