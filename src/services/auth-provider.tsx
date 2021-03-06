import React, { createContext, useState, useContext } from "react";

export interface AuthDataContextProps {
  authData: string | null;
  onLogin: Function;
  onLogout: Function;
  isAuthenticated: Function;
}

const initialProps: AuthDataContextProps = {
  authData: "",
  onLogin: () => {},
  onLogout: () => {},
  isAuthenticated: () => {},
};

export const AuthDataContext = createContext<AuthDataContextProps>(
  initialProps
);

const initialAuthData = null;

const AuthDataProvider = (props: any) => {
  const [authData, setAuthData] = useState<string | null>(initialAuthData);

  if (authData === null) {
    setAuthData(localStorage.getItem("token") ?? "");
  }

  const onLogout = () => {
    setAuthData("");
    localStorage.setItem("token", "");
    window.location.href = "/";
  };

  const onLogin = (newAuthData: string) => {
    setAuthData(newAuthData);
    localStorage.setItem("token", newAuthData);
  };

  const isAuthenticated = () => {
    if (!authData) {
      window.location.href = "/";
    }
  };

  const authDataValue = { authData, onLogin, onLogout, isAuthenticated };

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
