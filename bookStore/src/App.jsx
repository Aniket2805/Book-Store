import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import SavedBooks from "./pages/SavedBooks";
import { useAuth } from "./store/auth";
import AllUsers from "./pages/AllUsers";
const App = () => {
  const { isLoggedIn, user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {user.isAdmin && (
        <>
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
          <Route path="/admin/userslist" element={<AllUsers />} />
        </>
      )}
      <Route path="/books/details/:id" element={<ShowBook />} />
      {isLoggedIn ? (
        <>
          <Route path="/user/savedbooks" element={<SavedBooks />} />
          <Route path="/logout" element={<Logout />} />
        </>
      ) : (
        <>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </>
      )}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
