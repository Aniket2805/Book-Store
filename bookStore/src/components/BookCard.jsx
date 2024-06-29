import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";

export const BookCard = ({ book }) => {
  const { user, isLoggedIn } = useAuth();
  return (
    <div
      key={book?._id}
      className="bg-amber-100 p-4 rounded-lg shadow-xl flex flex-col"
    >
      <Link
        to={`/books/details/${book?._id}`}
        className="flex justify-center items-center mb-4"
      >
        <img src={book?.url} className="h-80 object-contain" />
      </Link>
      <div className="flex justify-between lg:px-6">
        <div>
          <h1 className="text-2xl font-bold text-amber-950">{book?.title}</h1>
          <p className="text-amber-900 font-medium">Author:- {book?.author}</p>
          <p className="text-amber-900 font-medium">
            Publish Year:- {book?.publishYear}
          </p>
        </div>
        <div className="flex justify-center items-center">
          {isLoggedIn && !user?.isAdmin && (
            <div>
              <Link
                to={`/books/details/${book?._id}`}
                className="flex justify-center items-center mb-4"
              >
                <BsInfoCircle className="text-green-800 text-2xl" />
              </Link>
              <Link
                to={`/books/book/addtobooklist/${book?._id}`}
                className="flex justify-center items-center"
              >
                <MdAddToPhotos className="text-green-800 text-2xl" />
              </Link>
            </div>
          )}
          {user?.isAdmin && (
            <div>
              <Link
                to={`/books/details/${book?._id}`}
                className="flex justify-center items-center"
              >
                <BsInfoCircle className="text-green-800 text-2xl" />
              </Link>
              <Link
                to={`/books/edit/${book?._id}`}
                className="flex justify-center items-center"
              >
                <AiOutlineEdit className="text-yellow-600 text-2xl" />
              </Link>
              <Link
                to={`/books/delete/${book?._id}`}
                className="flex justify-center items-center"
              >
                <AiOutlineDelete className="text-red-600 text-2xl" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
