import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import AdminTemplate from "../../templates/admin-template";
import MainPage from './MainPage';
import Sidebar from "../../molecules/sidebar";
import HeaderMenu from "../../organisms/admin-header-menu";
import { Route, Switch } from "react-router-dom";
import { useAuthDataContext } from "../../../services/auth-provider";

const AdminPage: React.FunctionComponent = (): JSX.Element => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const { isAuthenticated } = useAuthDataContext();
  isAuthenticated();

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
    </Box>
  );
};

export default AdminPage;
