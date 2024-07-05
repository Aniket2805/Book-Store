import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
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
      className="bg-[#FFF5E1] p-4 rounded-2xl flex flex-col transition-all duration-300 shadow-[#0C1844] hover:shadow-[#0C1844] border-2 border-solid border-[#0C1844] shadow-[0px_0px_10px] hover:shadow-[0px_0px_20px]"
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
      <div className="px-4 text-[#0C1844] font-semibold">
        <div>
          <h2 className="text-xl font-bold text-[#C80036]">{book?.title}</h2>
          <p className="text-md">Author:- {book?.author}</p>
          <p className="text-md">Publish Year:- {book?.publishYear}</p>
        </div>
        <div className="mt-2">
          {isLoggedIn && !user?.isAdmin && (
            <div className="flex justify-between items-center">
              <Link to={`/books/details/${book?._id}`}>
                <button className="bg-green-500 shadow-green-500 shadow-[0px_0px_6px] transition-all hover:shadow-green-500 hover:shadow-[0px_0px_12px] text-white px-4 py-2 rounded-lg">
                  <BsInfoCircle />
                </button>
              </Link>
              {isBookAdded ? (
                <button
                  onClick={() => {
                    removefromBooklist(book?._id);
                    setIsBookAdded(!isBookAdded);
                  }}
                  className="bg-red-500 shadow-red-500 shadow-[0px_0px_6px] transition-all hover:shadow-red-500 hover:shadow-[0px_0px_12px] text-white px-4 py-2 rounded-lg"
                >
                  <FaDeleteLeft />
                </button>
              ) : (
                <button
                  onClick={() => {
                    addToBookList(book?._id);
                    setIsBookAdded(!isBookAdded);
                  }}
                  className="bg-blue-950 shadow-blue-950 shadow-[0px_0px_6px] transition-all hover:shadow-blue-950 hover:shadow-[0px_0px_12px] text-white px-4 py-2 rounded-lg"
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
                <button className="bg-blue-950 shadow-blue-950 shadow-[0px_0px_6px] transition-all hover:shadow-blue-950 hover:shadow-[0px_0px_12px] text-white px-4 py-2 rounded-lg">
                  <AiOutlineEdit />
                </button>
              </Link>
              <Link
                to={`/books/delete/${book?._id}`}
                className="flex justify-center items-center"
              >
                <button className="bg-red-500 shadow-red-500 shadow-[0px_0px_6px] transition-all hover:shadow-red-500 hover:shadow-[0px_0px_12px] text-white px-4 py-2 rounded-lg">
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
