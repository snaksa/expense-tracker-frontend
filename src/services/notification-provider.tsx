import React, { createContext, useState, useContext } from "react";

export interface NotificationProps {
  showSuccessNotification: Function;
  showErrorNotification: Function;
  hideNotification: Function;
  content: string;
  type: any;
  visible: boolean;
  usedTranasctionParams: any;
  getTransactionUsedParams: Function;
  setTransactionUsedParams: Function;
}

const initialProps: NotificationProps = {
  showSuccessNotification: () => {},
  showErrorNotification: () => {},
  hideNotification: () => {},
  getTransactionUsedParams: () => {},
  setTransactionUsedParams: () => {},
  content: "",
  type: "success",
  visible: false,
  usedTranasctionParams: new Set()
};

export const NotificationContext = createContext<NotificationProps>(
  initialProps
);

const NotificationProvider = (props: any) => {
  const [content, setContent] = useState<string | null>(initialProps.content);
  const [type, setType] = useState<string | null>(initialProps.type);
  const [visible, setVisible] = useState<boolean>(initialProps.visible);
  const [usedTranasctionParams, setUsedTranasctionParams] = useState<boolean>(initialProps.usedTranasctionParams);

  const showSuccessNotification = (notificationContent: string) => {
    setContent(notificationContent);
    setType("success");
    setVisible(true);
  };

  const showErrorNotification = (notificationContent: string) => {
    setContent(notificationContent);
    setType("error");
    setVisible(true);
  };

  const setTransactionUsedParams = (params: any) => {
    setUsedTranasctionParams(params);
  };


  const getTransactionUsedParams = () => {
    return usedTranasctionParams;
  };

  const hideNotification = () => setVisible(false);

  const notificationData = {
    content,
    type,
    visible,
    showSuccessNotification,
    showErrorNotification,
    hideNotification,
    setTransactionUsedParams,
    getTransactionUsedParams
  };

  return <NotificationContext.Provider value={notificationData} {...props} />;
};

export const useNotificationContext = () => useContext(NotificationContext);

export default NotificationProvider;
