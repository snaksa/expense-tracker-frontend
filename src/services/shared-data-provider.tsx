import React, { createContext, useState, useContext } from "react";

export interface SharedDataProps {
  usedTranasctionParams: any;
  setTransactionUsedParams: Function;
}

const initialProps: SharedDataProps = {
  setTransactionUsedParams: () => {},
  usedTranasctionParams: new Set()
};

export const SharedDataContext = createContext<SharedDataProps>(
  initialProps
);

const SharedDataProvider = (props: any) => {
  const [usedTranasctionParams, setUsedTranasctionParams] = useState<boolean>(initialProps.usedTranasctionParams);

  const setTransactionUsedParams = (params: any) => {
    setUsedTranasctionParams(params);
  };

  const sharedData = {
    setTransactionUsedParams,
    usedTranasctionParams
  };

  return <SharedDataContext.Provider value={sharedData} {...props} />;
};

export const useSharedDataContext = () => useContext(SharedDataContext);

export default SharedDataProvider;
