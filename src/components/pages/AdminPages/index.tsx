import React, { useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from 'react-router';
import Box from "@material-ui/core/Box";
import {
  Home as HomeIcon,
  Receipt as ReceiptIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  MonetizationOn as BudgetsIcon,
} from "@material-ui/icons";
import { useCurrentUserQuery } from 'api';
import useTranslations from "translations";
import { useAuthDataContext } from "services/auth-provider";
import { useNotificationContext } from "services/notification-provider";
import Notification from "components/core/notification";
import Sidebar from "components/core/sidebar";
import HeaderMenu from "components/containers/admin-header-menu";
import AdminTemplate from "components/templates/admin-template";
import MainPage from "./MainPage";
import SettingsPage from "./SettingsPage";
import TransactionsPage from "./TransactionsPage";
import StatsPage from "./StatsPage";
import SplashScreen from "../SplashScreen/splash-screen";
import BudgetsPage from "./BudgetsPage";

const AdminPage: React.FunctionComponent = (): JSX.Element => {
  const { t } = useTranslations();

  const { isAuthenticated } = useAuthDataContext();
  isAuthenticated();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = useCallback(() => setIsSidebarVisible(!isSidebarVisible), [isSidebarVisible])
  const hideSidebar = useCallback(() => setIsSidebarVisible(false), []);

  const { content, type, visible, hideNotification } = useNotificationContext();

  const { data, loading } = useCurrentUserQuery();
  const history = useHistory();

  if (loading) {
    return <SplashScreen />
  }

  if (!data) {
    history.push('/');
  }

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
              {
                label: t("Dashboard"),
                to: "/admin",
                icon: <HomeIcon />
              },
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
                label: t("Budgets"),
                to: "/admin/budgets",
                icon: <BudgetsIcon />,
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
            <Route path="/admin/budgets" component={BudgetsPage} />
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
