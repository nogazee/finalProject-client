import { jwtDecode } from "jwt-decode";
import React, {
  useState,
  useEffect,
  useCallback,
  type PropsWithChildren,
} from "react";
import type IUser from "../types/userType";

let logoutTimer: ReturnType<typeof setTimeout>;

interface IAuthContext {
  token: string | undefined | null;
  userRole: "USER" | "ADMIN" | undefined;
  isLoggedIn: boolean;
  login: (token: string, expirationTime: string) => void;
  logout: () => void;

  setRefetch: () => void;
  refetch: boolean;
}

const AuthContext = React.createContext<IAuthContext>({
  token: "",
  userRole: undefined,
  isLoggedIn: false,
  login: (token, expirationTime) => {},
  logout: () => {},

  setRefetch: () => {},
  refetch: false,
});

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  let remainingTime;

  if (storedExpirationDate) {
    remainingTime = calculateRemainingTime(storedExpirationDate);
    if (remainingTime <= 60000) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      return null;
    }
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [refetch, setRefetch] = useState(false);

  const tokenData = retrieveStoredToken();
  let initialRole: "USER" | "ADMIN" = "USER";
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
    if (initialToken) {
      const decoded: { token: string; user: IUser } = jwtDecode(initialToken);
      initialRole = decoded.user.role === "ADMIN" ? "ADMIN" : "USER";
    }
  }

  const [token, setToken] = useState(initialToken);
  const [userRole, setUserRole] = useState<"USER" | "ADMIN">(initialRole);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token: string, expirationTime: string) => {
    setToken(token);
    const decoded: { token: string; user: IUser } = jwtDecode(token);
    setUserRole(decoded.user.role === "ADMIN" ? "ADMIN" : "USER");

    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    userRole: userRole,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,

    setRefetch: () =>
      setRefetch((prevState) => {
        return !prevState;
      }),
    refetch: refetch,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
