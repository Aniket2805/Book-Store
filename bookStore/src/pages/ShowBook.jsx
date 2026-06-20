import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { URL } from "../utils/Api";
import { useAuth } from "../store/auth";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ShowBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { user, isLoggedIn, addToBookList, removefromBooklist } = useAuth();
  const [isBookAdded, setIsBookAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/books/${id}`)
      .then((res) => {
        setBook(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn && user?.books?.length > 0) {
      const isAdded = user.books.some((bookId) => bookId === book?._id);
      setIsBookAdded(isAdded);
    }
  }, [user, isLoggedIn, book]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pt-24 pb-16">
      {loading ? (
        <div className="flex justify-center items-center min-h-96">
          <Spinner />
        </div>
      ) : (
        <div>
          {/* Book Details Container */}
          <div className="mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
            <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-2 gap-12 p-8 md:p-16">
                {/* Book Image */}
                <div className="flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 blur-3xl opacity-20 rounded-2xl animate-pulse"></div>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-all duration-500"></div>
                    <img
                      src={book?.url}
                      alt={book?.title}
                      className="relative h-96 object-contain rounded-xl shadow-lg transform transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Book Details */}
                <div className="flex flex-col justify-center space-y-6 animate-fadeIn">
                  {/* Title */}
                  <div className="border-l-4 border-primary-500 pl-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                      {book?.title}
                    </h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                  </div>

                  {/* Author and Year */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100 hover:border-primary-300 transition-all duration-300">
                      <div className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center text-white text-xl font-bold">
                        ✍️
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                          Author
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          {book?.author}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-secondary-50 to-pink-50 rounded-xl border border-secondary-100 hover:border-secondary-300 transition-all duration-300">
                      <div className="w-12 h-12 rounded-lg bg-secondary-500 flex items-center justify-center text-white text-xl font-bold">
                        📅
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-secondary-600 uppercase tracking-wide">
                          Published Year
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          {book?.publishYear}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      About This Book
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Immerse yourself in an extraordinary literary experience. This
                      captivating book offers a unique blend of storytelling that will
                      engage your imagination and expand your horizons. Whether you're
                      seeking adventure, knowledge, or emotional connection, this work
                      promises an unforgettable journey through its pages.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {isLoggedIn && !user?.isAdmin && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      {isBookAdded ? (
                        <button
                          onClick={() => {
                            removefromBooklist(book?._id);
                            setIsBookAdded(false);
                          }}
                          className="flex-1 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
                        >
                          <FaHeart className="text-xl" />
                          Remove from Wishlist
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            addToBookList(book?._id);
                            setIsBookAdded(true);
                          }}
                          className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
                        >
                          <FaRegHeart className="text-xl" />
                          Add to Wishlist
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Features Bar */}
              <div className="grid grid-cols-3 divide-x divide-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                <div className="p-6 text-center">
                  <p className="text-gray-600 text-sm font-medium mb-1">Rating</p>
                  <p className="text-2xl font-bold text-primary-600">⭐ 4.8/5</p>
                </div>
                <div className="p-6 text-center">
                  <p className="text-gray-600 text-sm font-medium mb-1">Readers</p>
                  <p className="text-2xl font-bold text-secondary-600">50K+</p>
                </div>
                <div className="p-6 text-center">
                  <p className="text-gray-600 text-sm font-medium mb-1">In Library</p>
                  <p className="text-2xl font-bold text-blue-600">2.3M+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mt-8">
            <BackButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
