import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TableInfoProductEditButton } from "../TableInfoProductEditButton";
import { EditorStore } from "../../../../../common/stores/editorStore";
import { RootStoreContext } from "../../../../../pages/_app";
import { TFunPaySubItem } from "../../../../../types/global";
import { TableInfoProductEditSave } from "../TableInfoProductEditSave";
import { TableInfoProductEditDelete } from "../TableInfoProductDelete";
import { ErrorsStore } from "../../../../../common/stores/errorsStore";

type TTableInfoProductEditFunctionals = {
  item: TFunPaySubItem;
  briefDescr: string;
  fullDescr: string;
  editRef: React.MutableRefObject<HTMLDivElement>;
  infoRef: React.MutableRefObject<HTMLDivElement>;
};

type TTableInfoProductEditFunctionalsStores = {
  editorStore: EditorStore;
  errorsStore: ErrorsStore;
};

export const TableInfoProductEditFunctionals = observer(
  ({
    item,
    briefDescr,
    fullDescr,
    infoRef,
    editRef,
  }: TTableInfoProductEditFunctionals) => {
    const { editorStore, errorsStore }: TTableInfoProductEditFunctionalsStores =
      useContext(RootStoreContext);

    return (
      <div className={styles.container}>
        {item.countryInfo.isEdit ? (
          <>
            {errorsStore.editFormErrors.formError.active ? (
              <span className={styles.error}>
                {errorsStore.editFormErrors.formError.message}
              </span>
            ) : (
              ""
            )}

            <TableInfoProductEditSave
              handleSave={editorStore.handleSaveNewValues}
              briefDescr={briefDescr}
              fullDescr={fullDescr}
            />
            <TableInfoProductEditDelete infoRef={infoRef} editRef={editRef} />
          </>
        ) : (
          <TableInfoProductEditButton
            handleEdit={editorStore.handleEditorMode}
          />
        )}
      </div>
    );
  },
);
