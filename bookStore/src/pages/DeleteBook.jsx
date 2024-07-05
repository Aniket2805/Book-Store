import axios from "axios";
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { URL } from "../utils/Api";
const DeleteBook = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${URL}/books/${id}`)
      .then((res) => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        navigate("/");
      });
  };
  return (
    <div className="min-h-screen bg-slate-200">
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <div className="px-10 md:px-24 py-10">
            <div className="flex justify-center items-center flex-col clear-start px-8 py-6 rounded-lg border-4 border-dashed border-[#0C1844] bg-[#ffffff] shadow-[#0C1844] shadow-[0px_0px_20px]">
              <h2 className="text-xl md:text-5xl text-center mb-4 font-semibold text-[#C80036] underline">
                Delete Book
              </h2>
              <h3 className="text-xl md:text-4xl text-center">
                Are you sure you want to delete this book?
              </h3>
              <div className="flex flex-col sm:flex-row">
                <button
                  onClick={handleDeleteBook}
                  className="px-6 py-3 text-lg sm:text-2xl bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 mt-4 sm:mt-8 sm:mr-4"
                >
                  Yes, Delete it
                </button>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="px-6 py-3 text-lg sm:text-2xl bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 mt-4 sm:mt-8"
                >
                  No, Go back
                </button>
              </div>
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
