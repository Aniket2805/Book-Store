import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../utils/Api";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setisLoggedIn] = useState(token ? true : false);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const response = await axios.get(`${URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const addToBookList = async (bookId) => {
    try {
      const response = axios.post(
        `${URL}/user/booklist`,
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.promise(response, {
        pending: "Adding to booklist 📚",
        success: "Added to booklist 📚",
        error: response.message || "Failed to add to booklist 📚",
      });
      const finalResponse = await response;
      if (finalResponse.data) {
        setUser(finalResponse.data.user);
      }
    } catch (error) {}
  };
  const removefromBooklist = async (bookId) => {
    try {
      const response = axios.delete(`${URL}/user/booklist/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.promise(response, {
        pending: "Removing from booklist 📚",
        success: "Removed from booklist 📚",
        error: response.message || "Failed to remove from booklist 📚",
      });
      const finalResponse = await response;
      if (finalResponse.data) {
        setUser(finalResponse.data.user);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
  }, [isLoggedIn, token]);

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
        addToBookList,
        removefromBooklist,
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
