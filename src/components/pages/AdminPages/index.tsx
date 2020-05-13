import React, { useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import Box from "@material-ui/core/Box";
import {
  Home as HomeIcon,
  Receipt as ReceiptIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons";
import useTranslations from "translations";
import { useAuthDataContext } from "services/auth-provider";
import { useNotificationContext } from "services/notification-provider";
import Notification from "components/molecules/notification";
import Sidebar from "components/molecules/sidebar";
import HeaderMenu from "components/organisms/admin-header-menu";
import AdminTemplate from "components/templates/admin-template";
import MainPage from "./MainPage";
import SettingsPage from "./SettingsPage";
import TransactionsPage from "./TransactionsPage";
import StatsPage from "./StatsPage";

const AdminPage: React.FunctionComponent = (): JSX.Element => {
  const { t } = useTranslations();

  const { isAuthenticated } = useAuthDataContext();
  isAuthenticated();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = useCallback(() => setIsSidebarVisible(!isSidebarVisible), [isSidebarVisible])
  const hideSidebar = useCallback(() => setIsSidebarVisible(false), []);

  const { content, type, visible, hideNotification } = useNotificationContext();

  return (
    <Box>
      <AdminTemplate
        header={
          <HeaderMenu
            setSidebarVisibility={toggleSidebar}
          />
        }
        sidebar={
          <Sidebar
            onOptionClick={hideSidebar}
            isVisible={isSidebarVisible}
            options={[
              { label: t("Dashboard"), to: "/admin", icon: <HomeIcon /> },
              {
                label: t("Records"),
                to: "/admin/records",
                icon: <ReceiptIcon />,
              },
              {
                label: t("Stats"),
                to: "/admin/stats",
                icon: <BarChartIcon />,
              },
              {
                label: t("Settings"),
                to: "/admin/settings",
                icon: <SettingsIcon />,
              },
            ]}
          />
        }
        content={
          <Switch>
            <Route path="/admin/records" component={TransactionsPage} />
            <Route path="/admin/settings" component={SettingsPage} />
            <Route path="/admin/stats" component={StatsPage} />
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
