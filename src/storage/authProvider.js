import React, { createContext, useEffect, useState } from "react";
import Axios from "../axios";
import Loader from "../component/common/loader";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, isSetLoading] = useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    Axios.get("auth", {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        const { token, user } = res.data;
        setUser({ token, user });
        isSetLoading(false);
      })
      .catch((err) => {
        isSetLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
