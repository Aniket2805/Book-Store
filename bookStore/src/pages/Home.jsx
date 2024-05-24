import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-store-api-lilac.vercel.app/books")
      .then((res) => {
        console.log(res?.data?.data);
        setBooks(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="min-h-screen bg-slate-200">
      <h1 className="text-center text-5xl font-bold font-mono text-white mb-8 drop-shadow-lg bg-slate-700 py-4 shadow-lg">
        Books Store
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-6 sm:px-16 md:px-24">
          {books.map((book) => (
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
                  <h1 className="text-2xl font-bold text-amber-950">
                    {book?.title}
                  </h1>
                  <p className="text-amber-900 font-medium">
                    Author:- {book?.author}
                  </p>
                  <p className="text-amber-900 font-medium">
                    Publish Year:- {book?.publishYear}
                  </p>
                </div>
                <div className="flex flex-col justify-center">
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
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <Link to="/books/create" className="flex justify-center items-center">
          <button className="bg-blue-950 text-white px-4 py-2 rounded-lg mt-4 shadow-lg flex">
            <IoIosAddCircleOutline className="text-2xl mr-2" />
            Add Book
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
