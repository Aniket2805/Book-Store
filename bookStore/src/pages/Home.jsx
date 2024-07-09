import React, { useEffect, useState } from "react";
import axios from "axios";
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
        console.log(err);
        setLoading(false);
      });
  }, [isLoggedIn]);
  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      {loading ? (
        <div className="flex justify-center"></div>
      ) : (
        <div>
          <div className="grid sm:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 gap-8 px-6 sm:px-10 md:px-16 lg:px-24 py-10">
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
                <button className="bg-blue-950 shadow-blue-950 transition-all shadow-[0px_0px_10px] hover:shadow-blue-950 hover:shadow-[0px_0px_20px] text-white px-8 py-4 rounded-full mt-4 flex items-center text-2xl">
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
