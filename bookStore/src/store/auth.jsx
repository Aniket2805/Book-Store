import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setisLoggedIn] = useState(token ? true : false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState();
  const storetokenInLS = (token) => {
    setisLoggedIn(true);
    return localStorage.setItem("token", token);
  };
  const LogoutUser = () => {
    setToken(null);
    setisLoggedIn(false);
    setUser("");
    return localStorage.removeItem("token");
  };
  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://bookstoreapi2024.vercel.app/auth/user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storetokenInLS,
        LogoutUser,
        isLoggedIn,
        setisLoggedIn,
        user,
        loading,
        setUser,
        setLoading,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
