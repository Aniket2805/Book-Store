import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
export const BookCard = ({ book }) => {
  const {
    user,
    isLoggedIn,
    addToBookList,
    userBookList,
    removefromBooklist,
    setLoading,
  } = useAuth();
  const [isBookAdded, setIsBookAdded] = useState(false);
  const checkBook = () => {
    setLoading(true);
    userBookList.find((item) => {
      if (item === book?._id) {
        setIsBookAdded(true);
      }
    });
    setLoading(false);
  };
  useEffect(() => {
    checkBook();
  }, [user, isLoggedIn, addToBookList, removefromBooklist]);
  return (
    <div
      key={book?._id}
      className="bg-white p-4 rounded-2xl flex flex-col transition-all duration-300 hover:shadow-cyan-900 hover:shadow-[2px_10px_40px]"
    >
      <Link
        to={`/books/details/${book?._id}`}
        className="flex justify-center items-center mb-4 rounded-2xl"
      >
        <div className="overflow-hidden rounded-2xl">
          <img
            src={book?.url}
            alt={book?.title}
            className="h-80 object-contain transition-all duration-300 hover:scale-125"
          />
        </div>
      </Link>
      <div className="px-4">
        <div>
          <h2 className="text-xl font-bold text-blue-950">{book?.title}</h2>
          <p className="text-md text-gray-500">Author:- {book?.author}</p>
          <p className="text-md text-gray-500">
            Publish Year:- {book?.publishYear}
          </p>
        </div>
        <div className="mt-2">
          {isLoggedIn && !user?.isAdmin && (
            <div className="flex justify-between items-center">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                <BsInfoCircle />
              </button>
              {isBookAdded ? (
                <button
                  onClick={() => {
                    removefromBooklist(book?._id);
                    setIsBookAdded(!isBookAdded);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  <FaDeleteLeft />
                </button>
              ) : (
                <button
                  onClick={() => {
                    addToBookList(book?._id);
                    setIsBookAdded(!isBookAdded);
                  }}
                  className="bg-blue-950 text-white px-4 py-2 rounded-lg"
                >
                  <MdAddToPhotos />
                </button>
              )}
            </div>
          )}
          {user?.isAdmin && (
            <div className="flex justify-between items-center">
              <Link
                to={`/books/edit/${book?._id}`}
                className="flex justify-center items-center"
              >
                <button className="bg-blue-950 text-white px-4 py-2 rounded-lg">
                  <AiOutlineEdit />
                </button>
              </Link>
              <Link
                to={`/books/delete/${book?._id}`}
                className="flex justify-center items-center"
              >
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  <AiOutlineDelete />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
