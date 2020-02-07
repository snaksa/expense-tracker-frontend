import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import {
  Home as HomeIcon,
  Category as CategoryIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon
} from "@material-ui/icons";
import AdminTemplate from "../../templates/admin-template";
import MainPage from "./MainPage";
import CategoriesPage from "./CategoriesPage";
import Sidebar from "../../molecules/sidebar";
import HeaderMenu from "../../organisms/admin-header-menu";
import { Route, Switch } from "react-router-dom";
import { useAuthDataContext } from "../../../services/auth-provider";
import { useNotificationContext } from "services/notification-provider";
import Notification from "../../molecules/notification";

const AdminPage: React.FunctionComponent = (): JSX.Element => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

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
            isVisible={isSidebarVisible}
            options={[
              { label: "Home", to: "/admin", icon: <HomeIcon /> },
              {
                label: "Categories",
                to: "/admin/categories",
                icon: <CategoryIcon />
              },
              { label: "Stats", icon: <BarChartIcon /> },
              { label: "Settings", icon: <SettingsIcon /> }
            ]}
          />
        }
        content={
          <Switch>
            <Route path="/admin/categories" component={CategoriesPage} />
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
