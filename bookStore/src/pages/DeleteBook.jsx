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
      .delete(`http://localhost:3000/books/${id}`)
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
    <div className="px-24 py-12 min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <div className="">
          <h1 className="text-center text-5xl font-bold font-mono text-amber-950">
            Delete Book
          </h1>
          <div className="flex justify-center items-center flex-col clear-start mt-8 px-8 py-6 rounded-lg border-4">
            <h3 className="text-4xl">
              Are you sure you want to delete this book?
            </h3>
            <button
              onClick={handleDeleteBook}
              className="px-6 py-3 text-2xl bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 my-8"
            >
              Yes, Delete it
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <BackButton />
      </div>
    </div>
  );
};

export default DeleteBook;
