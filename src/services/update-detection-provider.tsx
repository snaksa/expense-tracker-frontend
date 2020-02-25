import React, { createContext, useState, useContext } from "react";

export interface UpdateDetectionProps {
  lastCategoryAction: any;
  setCategoryUpdate: Function;
  lastTransactionAction: any;
  setTransactionUpdate: Function;
  lastWalletAction: any;
  setWalletUpdate: Function;
}

const initialProps: UpdateDetectionProps = {
  lastCategoryAction: 0,
  setCategoryUpdate: () => {},
  lastTransactionAction: 0,
  setTransactionUpdate: () => {},
  lastWalletAction: 0,
  setWalletUpdate: () => {}
};

export const UpdateDetectionProviderContext = createContext<
  UpdateDetectionProps
>(initialProps);

const UpdateDetectionProvider = (props: any) => {
  const [lastCategoryAction, setLastCategoryAction] = useState<number>(
    initialProps.lastCategoryAction
  );
  const [lastTransactionAction, setLastTransactionAction] = useState<number>(
    initialProps.lastTransactionAction
  );
  const [lastWalletAction, setLastWalletAction] = useState<number>(
    initialProps.lastWalletAction
  );

  const setCategoryUpdate = () => {
    setLastCategoryAction(Date.now());
  }

  const setTransactionUpdate = () => {
    setLastTransactionAction(Date.now());
  }

  const setWalletUpdate = () => {
    setLastWalletAction(Date.now());
  }

  const data = {
    lastCategoryAction,
    setCategoryUpdate,
    lastTransactionAction,
    setTransactionUpdate,
    lastWalletAction,
    setWalletUpdate
  };

  return (
    <UpdateDetectionProviderContext.Provider value={data} {...props} />
  );
};

export const useUpdateDetectionContext = () =>
  useContext(UpdateDetectionProviderContext);

export default UpdateDetectionProvider;
