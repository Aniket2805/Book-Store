import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { FaBookmark } from "react-icons/fa";
import { BookCard } from "../components/BookCard";
import { URL } from "../utils/Api";
import Spinner from "../components/Spinner";
import { MdBookmarkAdd } from "react-icons/md";

const SavedBooks = () => {
  const { user, isLoggedIn } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/user/booklist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchBooks();
    }
  }, [user, isLoggedIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pt-24 pb-16">
      {loading ? (
        <div className="flex justify-center items-center min-h-96">
          <Spinner />
        </div>
      ) : (
        <div className="mx-auto px-4 sm:px-10 md:px-16 lg:px-24">
          {books.length === 0 ? (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mb-6">
                <MdBookmarkAdd className="text-4xl text-primary-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                No Saved Books Yet
              </h1>
              <p className="text-xl text-gray-600">
                Start adding books to your collection to see them here!
              </p>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <FaBookmark className="text-3xl text-primary-600" />
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    My Library
                  </h1>
                </div>
                <p className="text-gray-600 text-lg">
                  You have {books.length} saved {books.length === 1 ? "book" : "books"}
                </p>
              </div>

              {/* Books Grid */}
              <div className="grid sm:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedBooks;
