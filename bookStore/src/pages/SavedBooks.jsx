import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { FaSadCry, FaSadTear, FaSmile } from "react-icons/fa";
import { BookCard } from "../components/BookCard";
import { PiSmileyMeltingFill } from "react-icons/pi";
import { URL } from "../utils/Api";
const SavedBooks = () => {
  const { user, loading, setLoading, isLoggedIn } = useAuth();
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/user/booklist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isLoggedIn) fetchBooks();
  }, [user]);

  return (
    <div className="bg-slate-50">
      {loading ? (
        <div className="flex justify-center"></div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center pt-20">
          {books.length === 0 ? (
            <div className="px-6 sm:px-10">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-center font-bold text-red-600 flex justify-center underline underline-offset-8">
                <FaSadCry className="mr-3 text-[#0C1844] animate-bounce" />
                No Books Found!
                <FaSadTear className="ml-3 text-[#0C1844] animate-bounce" />
              </h1>
            </div>
          ) : (
            <div className="text-center w-full mt-10">
              <h1 className="text-2xl sm:text-3xl md:text-5xl text-center font-bold text-red-600 flex justify-center underline underline-offset-8">
                <PiSmileyMeltingFill className="mr-3 text-[#0C1844] animate-bounce" />
                Your Saved Books
                <FaSmile className="ml-3 text-[#0C1844] animate-bounce" />
              </h1>
            </div>
          )}
          <div className="grid sm:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 gap-8 px-6 sm:px-10 md:px-16 lg:px-24 py-10">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedBooks;
