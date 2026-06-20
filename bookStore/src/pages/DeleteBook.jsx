import axios from "axios";
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { URL } from "../utils/Api";
import { MdDelete } from "react-icons/md";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center py-12 px-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full max-w-md">
          {/* Confirmation Card */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden border-t-4 border-secondary-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 px-8 py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <MdDelete className="text-3xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Delete Book?</h2>
              <p className="text-white/80 text-sm mt-2">This action cannot be undone</p>
            </div>

            {/* Message */}
            <div className="p-8 text-center">
              <p className="text-gray-600 text-lg font-medium mb-8">
                Are you sure you want to permanently delete this book? This will remove it from all users' libraries.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteBook}
                  className="flex-1 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold py-3 rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-center">
            <BackButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
