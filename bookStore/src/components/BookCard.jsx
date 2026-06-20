import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
export const BookCard = ({ book }) => {
  const { user, isLoggedIn, addToBookList, removefromBooklist, setLoading } =
    useAuth();
  const [isBookAdded, setIsBookAdded] = useState(false);
  const checkBook = () => {
    setLoading(true);
    user?.books?.length > 0 &&
      user?.books?.find((item) => {
        if (item === book?._id) {
          setIsBookAdded(true);
        }
      });
    setLoading(false);
  };
  useEffect(() => {
    if (isLoggedIn) {
      checkBook();
    }
  }, [user, isLoggedIn]);
  return (
    <div
      key={book?._id}
      className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col group border border-gray-100 hover:border-primary-400 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Image Container */}
      <Link
        to={`/books/details/${book?._id}`}
        className="relative overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 h-72 flex items-center justify-center group"
      >
        <img
          src={book?.url}
          alt={book?.title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-125"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
          <span className="text-white text-sm font-bold bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <BsInfoCircle className="text-lg" />
            View Details
          </span>
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50">
        {/* Title and Author */}
        <div className="mb-4 flex-grow">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors duration-300">
            {book?.title}
          </h2>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-semibold text-gray-700 mr-2 bg-primary-100 px-2 py-0.5 rounded text-xs">Author</span>
              <span className="text-gray-700">{book?.author}</span>
            </p>
            <p className="text-xs text-gray-600 flex items-center">
              <span className="font-semibold text-gray-700 mr-2 bg-secondary-100 px-2 py-0.5 rounded text-xs">Year</span>
              <span className="text-gray-700">{book?.publishYear}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          {isLoggedIn && !user?.isAdmin && (
            <div className="flex gap-2">
              <Link to={`/books/details/${book?._id}`} className="flex-1">
                <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm transform hover:scale-105 shadow-md">
                  <BsInfoCircle className="text-lg" />
                  Details
                </button>
              </Link>
              {isBookAdded ? (
                <button
                  onClick={() => {
                    removefromBooklist(book?._id);
                    setIsBookAdded(!isBookAdded);
                  }}
                  className="flex-1 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm transform hover:scale-105 shadow-md"
                >
                  <FaHeart className="text-lg" />
                  Saved
                </button>
              ) : (
                <button
                  onClick={() => {
                    addToBookList(book?._id);
                    setIsBookAdded(!isBookAdded);
                  }}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm transform hover:scale-105 shadow-md"
                >
                  <FaRegHeart className="text-lg" />
                  Wishlist
                </button>
              )}
            </div>
          )}
          {!isLoggedIn && (
            <Link to={`/books/details/${book?._id}`} className="block w-full">
              <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm transform hover:scale-105 shadow-md">
                <BsInfoCircle className="text-lg" />
                View Details
              </button>
            </Link>
          )}
          {user?.isAdmin && (
            <div className="flex gap-2">
              <Link
                to={`/books/edit/${book?._id}`}
                className="flex-1"
              >
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm transform hover:scale-105 shadow-md">
                  <AiOutlineEdit className="text-lg" />
                  Edit
                </button>
              </Link>
              <Link
                to={`/books/delete/${book?._id}`}
                className="flex-1"
              >
                <button className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm transform hover:scale-105 shadow-md">
                  <AiOutlineDelete className="text-lg" />
                  Delete
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
