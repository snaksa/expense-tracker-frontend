import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import {
  Home as HomeIcon,
  Receipt as ReceiptIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon
} from "@material-ui/icons";
import AdminTemplate from "../../templates/admin-template";
import MainPage from "./MainPage";
import SettingsPage from "./SettingsPage";
import Sidebar from "../../molecules/sidebar";
import HeaderMenu from "../../organisms/admin-header-menu";
import { Route, Switch } from "react-router-dom";
import { useAuthDataContext } from "../../../services/auth-provider";
import { useNotificationContext } from "services/notification-provider";
import Notification from "../../molecules/notification";
import TransactionsPage from "./TransactionsPage";
import useTranslations from 'translations';

const AdminPage: React.FunctionComponent = (): JSX.Element => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const {t} = useTranslations();

  const { isAuthenticated } = useAuthDataContext();
  isAuthenticated();

  const { content, type, visible, hideNotification } = useNotificationContext();

  return (
    <Box>
      <AdminTemplate
        header={
          <HeaderMenu
            setSidebarVisibility={() => setIsSidebarVisible(!isSidebarVisible)}
          />
        }
        sidebar={
          <Sidebar
            onOptionClick={() => setIsSidebarVisible(false)}
            isVisible={isSidebarVisible}
            options={[
              { label: t("Dashboard"), to: "/admin", icon: <HomeIcon /> },
              {
                label: "Records",
                to: "/admin/records",
                icon: <ReceiptIcon />
              },
              { label: "Stats", icon: <BarChartIcon /> },
              {
                label: "Settings",
                to: "/admin/settings",
                icon: <SettingsIcon />
              },
            ]}
          />
        }
        content={
          <Switch>
            <Route path="/admin/records" component={TransactionsPage} />
            <Route path="/admin/settings" component={SettingsPage} />
            <Route path="/admin" component={MainPage} />
          </Switch>
        }
      />
      <Notification
        content={content}
        type={type}
        onClose={hideNotification}
        open={visible}
      />
    </Box>
  );
};

export default AdminPage;
