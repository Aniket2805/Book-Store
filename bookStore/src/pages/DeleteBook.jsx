import axios from "axios";
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
const DeleteBook = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://book-store-api-lilac.vercel.app/books/${id}`)
      .then((res) => {
        console.log(res?.data?.data);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("Something went wrong!" + err?.response?.data?.message);
        navigate("/");
      });
  };
  return (
    <div className="min-h-screen bg-slate-200">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-center text-2xl sm:text-5xl font-bold font-mono text-white mb-8 drop-shadow-lg bg-slate-700 py-4 shadow-lg">
            Delete Book
          </h1>
          <div className="px-10 md:px-24">
            <div className="flex justify-center items-center flex-col clear-start mt-8 px-8 py-6 rounded-lg border-4 border-red-600 bg-white">
              <h3 className="text-xl md:text-4xl text-center">
                Are you sure you want to delete this book?
              </h3>
              <button
                onClick={handleDeleteBook}
                className="px-6 py-3 text-lg sm:text-2xl bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 mt-4 sm:mt-8"
              >
                Yes, Delete it
              </button>
            </div>
            <div className="flex justify-end">
              <BackButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
