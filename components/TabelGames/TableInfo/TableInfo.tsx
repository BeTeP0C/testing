import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";
import { TableInfoPackages } from "./TableInfoPackages";
import { TableInfoFunpayList } from "./TableInfoFunpayList";
import { TProduct } from "../../../types/global";
import { TableStore } from "../../../common/stores/tableStore";
import { RootStoreContext } from "../../../pages/_app";
import { TableInfoStores } from "./TableInfoStores";

export const EditContext = createContext<number | null>(null);

export const TableInfo = observer((props: { product: TProduct }) => {
  const { product } = props;
  const storeRef = useRef(null);
  const { tableStore } = useContext(RootStoreContext);
  const editRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const [animation, setAnimation] = useState<boolean>(
    product.funPayItems.some((item) => item.active),
  );

  return (
    <div className={styles.content}>
      <TableInfoPackages
        funpayItems={product.funPayItems}
        item={storeRef}
        infoRef={infoRef}
        setAnimation={setAnimation}
      />

      <div className={styles.drop}>
        <CSSTransition
          in={product.funPayItems.some((item) => item.active)}
          timeout={500}
          classNames="drop-animation"
          unmountOnExit
        >
          <EditContext.Provider value={editRef.current?.offsetHeight}>
            <TableInfoStores
              infoRef={infoRef}
              product={product}
              animation={animation}
              editRef={editRef}
            />
          </EditContext.Provider>
        </CSSTransition>
      </div>
    </div>
  );
});
