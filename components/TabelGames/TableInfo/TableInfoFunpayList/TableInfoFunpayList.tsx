import React, { useContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";
import { TFunPayItem } from "../../../../types/tgames";
import { TableInfoFunpayItem } from "../TableInfoFunpayItem";
import { MagazineStore } from "../../../../common/store";
import { StoreContext } from "../../../MainPage";

export const TableInfoFunpayList = observer(
  (props: {
    funpayItem: TFunPayItem;
    setOpenInfoStore: React.Dispatch<React.SetStateAction<boolean>>;
    openInfoStore: boolean;
    container: React.MutableRefObject<any>;
    infoRef: React.MutableRefObject<any>;
  }) => {
    const { funpayItem, setOpenInfoStore, openInfoStore, container, infoRef } =
      props;
    const contentRef = useRef(null);
    const briefRef = useRef(null);
    const fullRef = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isError, setIsError] = useState(false);
    const [amountSymbolText, setAmountSymbolText] = useState(0);
    const [amountSymbolInput, setAmountSymbolInput] = useState(0);
    const [isShowQuationBlock, setIsShowQuationBlock] = useState(false);
    const store: MagazineStore = useContext(StoreContext);

    const changeEditForm = () => {
      setIsEdit(!isEdit);
    };

    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (amountSymbolText <= 500) {
        setAmountSymbolText(e.currentTarget.value.length);
      }
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (amountSymbolInput <= 100) {
        setAmountSymbolInput(e.currentTarget.value.length);
      }
    };

    const handleUpdateProduct = async () => {
      const status = await store.handleUpdateFunpay(
        funpayItem,
        briefRef.current.value,
        fullRef.current.value,
      );
      if (status === 204) {
        setIsEdit(false);
        setIsError(false);
      } else {
        setIsError(true);
      }
    };

    const showQuationBlock = () => {
      setIsShowQuationBlock(true);
    };

    const closeQuationBlock = () => {
      setIsShowQuationBlock(false);
    };

    const handleDeleteProduct = async () => {
      const status = await store.handleDeleteProd(
        funpayItem,
        infoRef.current.offsetHeight + 39.39,
        container.current.offsetHeight,
      );
      if (status === 204) {
        setIsEdit(false);
        setIsError(false);
      } else {
        setIsError(true);
      }
    };

    useEffect(() => {
      setAmountSymbolText(
        funpayItem.items.find((el) => el.active)?.longDescriptionRu.length,
      );
      setAmountSymbolInput(
        funpayItem.items.find((el) => el.active)?.shortDescriptionRu.length,
      );
    }, [funpayItem]);

    return (
      <div className={styles.container}>
        <h4 className={`${styles.title}`}>
          <button
            type="button"
            className={`${styles.button} ${store.isOpenGameInfo.openStore ? styles.button_open : ""}`}
            onClick={() =>
              store.handleOpenInfoStore(
                contentRef.current ? contentRef.current.offsetHeight : 0,
              )
            }
          >
            FunPay
          </button>
        </h4>

        <CSSTransition
          in={store.isOpenGameInfo.openStore}
          timeout={500}
          classNames="drop-animation"
          unmountOnExit
        >
          <div ref={contentRef}>
            <ul className={`${styles.list}`}>
              {funpayItem.items.map((el) => {
                return (
                  <>
                    <TableInfoFunpayItem
                      key={el.offerId}
                      funpayItem={el}
                      title={funpayItem.internalName}
                      item={infoRef}
                    />
                  </>
                );
              })}
            </ul>
            {funpayItem.items.map((el) => {
              return (
                <>
                  {el.active ? (
                    <CSSTransition
                      in={store.isOpenGameInfo.funpayCountryActive}
                      timeout={500}
                      classNames="drop-animation"
                      unmountOnExit
                    >
                      <div ref={infoRef} className={styles.info}>
                        <div className={styles.brief_descr}>
                          <label
                            htmlFor="edit_brief_descr"
                            className={styles.label}
                          >
                            Краткое описание
                          </label>
                          <div className={styles.input_container}>
                            <input
                              onChange={handleChangeInput}
                              ref={briefRef}
                              className={styles.input}
                              type="text"
                              maxLength={100}
                              defaultValue={el.shortDescriptionRu}
                              disabled={!isEdit}
                              id="edit_brief_descr"
                            />
                            <span className={styles.counter}>
                              {amountSymbolInput}/100
                            </span>
                          </div>
                        </div>

                        <div className={styles.full_descr}>
                          <label
                            htmlFor="edit_full_descr"
                            className={styles.label}
                          >
                            Полное описание
                          </label>
                          <div className={styles.text_container}>
                            <textarea
                              ref={fullRef}
                              id="edit_full_descr"
                              onChange={handleChangeText}
                              className={styles.text}
                              maxLength={500}
                              defaultValue={el.longDescriptionRu}
                              disabled={!isEdit}
                            />
                            <span
                              className={`${styles.counter} ${styles.counter_text}`}
                            >
                              {amountSymbolText}/500
                            </span>
                          </div>
                        </div>

                        {!isEdit ? (
                          <button
                            onClick={(e) => changeEditForm()}
                            type="button"
                            className={styles.button_edit}
                          >
                            Редактировать
                          </button>
                        ) : (
                          <>
                            {isError ? (
                              <span className={styles.error}>
                                Попробуйте позже
                              </span>
                            ) : (
                              ""
                            )}

                            <div
                              className={`${styles.buttons} ${isShowQuationBlock ? styles.buttons_showBlock : ""}`}
                            >
                              {!isShowQuationBlock ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={(e) => handleUpdateProduct()}
                                    className={styles.save}
                                  >
                                    Сохранить
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => showQuationBlock()}
                                    className={styles.delete}
                                  >
                                    Удалить
                                  </button>
                                </>
                              ) : (
                                <>
                                  <span className={styles.quation}>
                                    Вы точно хотите удалить?
                                  </span>

                                  <div>
                                    <button
                                      type="button"
                                      onClick={(e) => handleDeleteProduct()}
                                      className={styles.yes}
                                    >
                                      Да
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => closeQuationBlock()}
                                      className={styles.close}
                                    >
                                      Отменить
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </CSSTransition>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
        </CSSTransition>
      </div>
    );
  },
);
