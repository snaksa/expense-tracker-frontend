import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import AdminTemplate from "../../templates/admin-template";
import MainPage from "./MainPage";
import Sidebar from "../../molecules/sidebar";
import HeaderMenu from "../../organisms/admin-header-menu";
import { Route, Switch } from "react-router-dom";
import { useAuthDataContext } from "../../../services/auth-provider";
import { useNotificationContext } from "services/notification-provider";
import Notification from '../../molecules/notification';

const AdminPage: React.FunctionComponent = (): JSX.Element => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const { isAuthenticated } = useAuthDataContext();
  isAuthenticated();

  const { content, type, visible, hideNotification } = useNotificationContext();

  return (
    <Box>
      <Switch>
        <Route path="/admin">
          <AdminTemplate
            header={
              <HeaderMenu
                setSidebarVisibility={() =>
                  setIsSidebarVisible(!isSidebarVisible)
                }
              />
            }
            sidebar={
              <Sidebar
                isVisible={isSidebarVisible}
                options={[
                  { label: "Home" },
                  { label: "Categories" },
                  { label: "Stats" },
                  { label: "Settings" }
                ]}
              />
            }
            content={<MainPage />}
          />
        </Route>
      </Switch>
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
