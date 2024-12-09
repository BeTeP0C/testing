import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { EditorStore } from "../../../../../common/stores/editorStore";
import { RootStoreContext } from "../../../../../pages/_app";

type TTableInfoProductEditSave = {
  handleSave: (briefDescr: string, fullDescr: string) => void;
  briefDescr: string;
  fullDescr: string;
};

export const TableInfoProductEditSave = observer(
  ({ handleSave, briefDescr, fullDescr }: TTableInfoProductEditSave) => {
    const { editorStore } = useContext(RootStoreContext);

    return (
      <button
        type="button"
        onClick={(e) => handleSave(briefDescr, fullDescr)}
        className={styles.save}
      >
        {editorStore.isSaveState === "dead"
          ? "Сохранить"
          : editorStore.isSaveState === "loading"
            ? "Сохраняем..."
            : ""}
      </button>
    );
  },
);
