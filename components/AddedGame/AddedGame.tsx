import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameSteps } from "./AddedGameSteps";
import { AddedGameForm } from "./AddedGameForm";
import { AddedGameInputTitle } from "./AddedGameInputTitle";
import { AddedGameInputId } from "./AddedGameForm/AddedGameFormInputId";
import { AddedGameEdition } from "./AddedGameForm/AddedGameEdition";
import { AddedGameFormButton } from "./AddedGameForm/AddedGameFormButton";
import { AddedGameFormTitleEdition } from "./AddedGameForm/AddedGameFormTitleEdition";
import { MagazineStore } from "../../common/store";
import { StoreContext } from "../MainPage";
import { AddedGameFormStores } from "./AddedGameForm/AddedGameFormStores";
import { AddedGameFormRegion } from "./AddedGameForm/AddedGameFormRegion";
import { AddedGameFormGlobal } from "./AddedGameForm/AddedGameFormGlobal";
import { AddedGameFormMarkup } from "./AddedGameForm/AddedGameFormMarkup";
import { AddedGameFormBriefDescr } from "./AddedGameForm/AddedGameFormBriefDescr";
import { AddedGameFormFullDescr } from "./AddedGameForm/AddedGameFormFullDescr";
import { AddedGameFormPrices } from "./AddedGameForm/AddedGameFormPrices";
import { AddedGameFormButtonBack } from "./AddedGameForm/AddedGameFormButtonBack";
import { AddedGameFormButtonCreate } from "./AddedGameForm/AddedGameFormButtonCreate";
import { TEditionSteamGame } from "../../types/editionSteamGame";
import { TEditionTransformSteamGame } from "../../types/editionTransformSteamGame";
import { TEditionsOptions } from "../../types/edtitionInfo";

export const AddedGame = observer(() => {
  const store: MagazineStore = useContext(StoreContext);
  const [packagesSelect, setPackagesSelect] = useState([]);
  const [packagesChoice, setPackagesChoice] = useState([]);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const [isNextStep, setIsNextStep] = useState(false);
  const [title, setTitle] = useState("");
  const [appId, setAppId] = useState(null);
  const [price, setPrice] = useState(null);
  const [editionsOptions, setEditionOptions] = useState([]);
  const [isGlobal, setIsGlobal] = useState(false);
  const [steamGame, setSteamGame] = useState({
    name: "",
    packages: [],
    steamId: null,
  });

  const [isError, setIsError] = useState({
    errorMessage: "",
    active: false,
  });

  const [firstPageErrors, setFirstPageErrors] = useState([
    {
      errorMessage: "Поле обязательно для заполнения",
      visible: title === "",
      activate: false,
    },
    {
      errorMessage: "Поле обязательно для заполнения",
      visible: !appId,
      activate: false,
    },
    {
      errorMessage: "Выберите хотя бы одно издание",
      visible: packagesSelect.length === 0,
      activate: false,
    },
  ]);

  const [secondPageErrors, setSecondPageErrors] = useState([
    {
      errorMessage: "Выберите регион",
      visible: false,
      activate: false,
    },
    {
      errorMessage: "Поле обязательно для заполнения",
      visible: false,
      activate: false,
    },
    {
      errorMessage: "Поле обязательно для заполнения",
      visible: false,
      activate: false,
    },
    {
      errorMessage: "Поле обязательно для заполнения",
      visible: false,
      activate: false,
    },
  ]);

  useEffect(() => {
    const newErrors = firstPageErrors.map((el, index) => {
      if (index === 0) {
        return { ...el, visible: title === "" };
      }
      if (index === 1) {
        return { ...el, visible: !appId };
      }
      if (index === 2) {
        return { ...el, visible: packagesSelect.length === 0 };
      }

      return null;
    });

    setFirstPageErrors(newErrors);
  }, [title, appId, packagesSelect]);

  useEffect(() => {
    const item: TEditionsOptions = editionsOptions.find((e) => e.active);

    if (item) {
      const newError = secondPageErrors.map((el, index) => {
        if (index === 0) {
          return {
            ...el,
            activate: !item.regions.some((e) => e.active),
          };
        }

        if (index === 1) {
          return {
            ...el,
            activate: !item.markup,
          };
        }

        if (item.regions.some((e) => e.active)) {
          const itemInfo = item.regions.find((e) => e.active);
          if (index === 2) {
            if (itemInfo.briefDescr === "") {
              return {
                errorMessage: "Поле обязательно для заполнения",
                visible: isGlobal ? false : el?.visible,
                activate: !isGlobal,
              };
            }
            if (itemInfo.briefDescr.length < 15) {
              return {
                errorMessage: "Напишите еще",
                visible: isGlobal ? false : el?.visible,
                activate: !isGlobal,
              };
            }
            return {
              ...el,
              activate: false,
            };
          }

          if (index === 3) {
            if (itemInfo.fullDescr === "") {
              return {
                errorMessage: "Поле обязательно для заполнения",
                visible: isGlobal ? false : el?.visible,
                activate: !isGlobal,
              };
            }
            if (itemInfo.fullDescr.length < 15) {
              return {
                errorMessage: "Напишите еще",
                visible: isGlobal ? false : el?.visible,
                activate: !isGlobal,
              };
            }
            return {
              ...el,
              activate: false,
            };
          }
        }

        return null;
      });
      setSecondPageErrors(newError);
    }
  }, [editionsOptions, isGlobal]);

  const filterUniqueByField = (arr: any[], field: string) => {
    const uniqueIds = new Set();
    return arr?.filter((item) => {
      const itemId = item[field];
      if (!uniqueIds.has(itemId)) {
        uniqueIds.add(itemId);
        return true;
      }
      return false;
    });
  };

  const transformSteamGame = (
    game: TEditionSteamGame,
  ): TEditionTransformSteamGame => {
    const countries: string[] = game.purchaseOptions.map((el) => {
      return el.country;
    });

    const uniqueCountries = countries.filter(
      (el, index) => countries.indexOf(el) === index,
    );

    return {
      name: game.name,
      steamId: game.id,
      packages: filterUniqueByField(
        game.purchaseOptions.map((el) => {
          return {
            title: el.name,
            id: el.id,
            countries: uniqueCountries,
            price: Math.floor(el.finalPrice / 1000),
          };
        }),
        "id",
      ),
    };
  };

  const addPack = (id: string) => {
    setPackagesSelect([
      ...packagesSelect,
      packagesChoice.find((el) => el.id === id),
    ]);
    setPackagesChoice(packagesChoice.filter((el) => el.id !== id));
  };

  const deletePack = (id: string) => {
    setPackagesChoice([
      ...packagesChoice,
      packagesSelect.find((el) => el.id === id),
    ]);
    setPackagesSelect(packagesSelect.filter((el) => el.id !== id));
  };

  useEffect(() => {
    if (isNextStep) {
      firstRef.current.style.transform = `translateX(-${firstRef.current.offsetWidth + 200}px)`;
      secondRef.current.style.transform = `translateX(0px)`;
    } else {
      firstRef.current.style.transform = `translateX(0px)`;
      secondRef.current.style.transform = `translateX(${secondRef.current.offsetWidth + 200}px)`;
    }
  }, [isNextStep]);

  useEffect(() => {
    setPackagesSelect([]);
    setPackagesChoice(steamGame.packages);
  }, [steamGame]);

  useEffect(() => {
    (async () => {
      if (appId) {
        const game = await store.getSteamGame(appId);
        store.isSearchGame ? setSteamGame(transformSteamGame(game)) : false;
      }
    })();
  }, [appId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Добавление товара</h2>

      <AddedGameSteps isNext={isNextStep} />

      <AddedGameForm>
        <div className={styles.form}>
          <div
            ref={firstRef}
            className={`${styles.first_block} ${!isNextStep ? styles.first_block_active : ""}`}
          >
            <AddedGameInputTitle
              title={title}
              titleError={firstPageErrors[0]}
              setTitle={setTitle}
            />
            <AddedGameInputId
              setAppId={setAppId}
              title={steamGame.name}
              idError={firstPageErrors[1]}
            />
            <AddedGameEdition
              editionError={firstPageErrors[2]}
              packagesChoice={packagesChoice}
              packagesSelect={packagesSelect}
              funcs={{ deletePack, addPack }}
            />
            <AddedGameFormButton
              setErrors={setFirstPageErrors}
              errors={firstPageErrors}
              setIsNextStep={setIsNextStep}
              setEditionOptions={setEditionOptions}
              packagesSelect={packagesSelect}
            />
          </div>

          <div
            ref={secondRef}
            className={`${styles.second_block} ${isNextStep ? styles.second_block_active : ""}`}
          >
            <AddedGameFormTitleEdition
              editionOptions={editionsOptions}
              setEditionOptions={setEditionOptions}
              errors={secondPageErrors}
              setErrors={setSecondPageErrors}
              setIsError={setIsError}
            />
            <AddedGameFormStores editionsOptions={editionsOptions} />
            <AddedGameFormRegion
              error={secondPageErrors[0]}
              editionsOptions={editionsOptions}
              setEditionOptions={setEditionOptions}
            />
            {editionsOptions
              .find((el) => el.active)
              ?.regions.map((el) => {
                return (
                  <>
                    {el.active ? (
                      <>
                        <AddedGameFormGlobal setIsGlobal={setIsGlobal} />
                        <AddedGameFormMarkup
                          editionsOptions={editionsOptions}
                          setEditionOptions={setEditionOptions}
                          error={secondPageErrors[1]}
                        />
                        <AddedGameFormBriefDescr
                          isGlobal={isGlobal}
                          editionsOptions={editionsOptions}
                          setEditionOptions={setEditionOptions}
                          error={secondPageErrors[2]}
                        />
                        <AddedGameFormFullDescr
                          isGlobal={isGlobal}
                          editionsOptions={editionsOptions}
                          setEditionOptions={setEditionOptions}
                          error={secondPageErrors[3]}
                        />
                        <AddedGameFormPrices editionOptions={editionsOptions} />
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}

            <div className={styles.func}>
              {isError.active ? (
                <span className={styles.error}>{isError.errorMessage}</span>
              ) : (
                ""
              )}
              <div className={styles.buttons}>
                <AddedGameFormButtonBack setIsNextStep={setIsNextStep} />
                <AddedGameFormButtonCreate
                  setEditionOptions={setEditionOptions}
                  appId={Number(appId)}
                  packageId={Number(
                    editionsOptions.find((el) => el.active)
                      ? editionsOptions.find((el) => el.active).id
                      : packagesSelect[0]?.id,
                  )}
                  title={title}
                  isGlobal={isGlobal}
                  titleGame={steamGame.name}
                  editionsOptions={editionsOptions}
                  setEditionSelect={setEditionOptions}
                  errors={secondPageErrors}
                  setErrors={setSecondPageErrors}
                  setIsError={setIsError}
                />
              </div>
            </div>
          </div>
        </div>
      </AddedGameForm>
    </div>
  );
});
