import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAuth } from "../store/auth";
import { BookCard } from "../components/BookCard";
import { URL } from "../utils/Api";
const Home = () => {
  const [books, setBooks] = useState([]);
  const { isLoggedIn, user, getUser, loading, setLoading } = useAuth();
  useEffect(() => {
    setLoading(true);
    if (isLoggedIn) {
      getUser();
    }
    axios
      .get(`${URL}/books`)
      .then((res) => {
        setBooks(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [isLoggedIn]);
  return (
    <div className="bg-slate-200 min-h-[90vh] pt-20">
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 sm:px-16 md:px-18 lg:px-24 py-10">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          {user?.isAdmin && (
            <div className="pb-10 py-4">
              <Link
                to="/books/create"
                className="flex justify-center items-center"
              >
                <button className="bg-blue-950 text-white px-8 py-4 rounded-full mt-4 shadow-lg flex items-center text-2xl">
                  <IoIosAddCircleOutline className="text-3xl mr-2" />
                  Add Book
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
