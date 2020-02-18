import React, { createContext, useState, useContext } from "react";

export interface NotificationProps {
  showSuccessNotification: Function;
  showErrorNotification: Function;
  hideNotification: Function;
  content: string;
  type: any;
  visible: boolean;
}

const initialProps: NotificationProps = {
  showSuccessNotification: () => {},
  showErrorNotification: () => {},
  hideNotification: () => {},
  content: "",
  type: "success",
  visible: false,
};

export const NotificationContext = createContext<NotificationProps>(
  initialProps
);

const NotificationProvider = (props: any) => {
  const [content, setContent] = useState<string | null>(initialProps.content);
  const [type, setType] = useState<string | null>(initialProps.type);
  const [visible, setVisible] = useState<boolean>(initialProps.visible);

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

  const hideNotification = () => setVisible(false);

  const notificationData = {
    content,
    type,
    visible,
    showSuccessNotification,
    showErrorNotification,
    hideNotification,
  };

  return <NotificationContext.Provider value={notificationData} {...props} />;
};

export const useNotificationContext = () => useContext(NotificationContext);

export default NotificationProvider;
