import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../utils/Api";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setisLoggedIn] = useState(token ? true : false);
  const [userBookList, setUserBookList] = useState([]);
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
      setLoading(true);
      const response = await axios.get(`${URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
      setUserBookList(response.data.books);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const addToBookList = async (bookId) => {
    try {
      const response = axios.post(
        `${URL}/user/booklist`,
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.promise(response, {
        pending: "Adding to booklist 📚",
        success: "Added to booklist 📚",
        error: "Failed to add to booklist 📚",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removefromBooklist = async (bookId) => {
    try {
      const response = axios.delete(`${URL}/user/booklist/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.promise(response, {
        pending: "Removing from booklist 📚",
        success: "Removed from booklist 📚",
        error: "Failed to remove from booklist 📚",
      });
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
        addToBookList,
        userBookList,
        setUserBookList,
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
