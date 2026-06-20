import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { URL } from "../utils/Api";
import { AiOutlineEdit } from "react-icons/ai";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEditBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${URL}/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          author: author,
          publishYear: parseInt(publishYear),
          url: url,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setError("");
        toast.success("Book updated successfully 🚀");
        navigate("/");
      } else {
        setError(data.message);
        data.extraDetails && toast.error(data.extraDetails);
      }
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/books/${id}`)
      .then((res) => {
        const { title, author, publishYear, url } = res?.data?.data;
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear);
        setUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pt-24 pb-16">
      {loading ? (
        <div className="flex justify-center items-center min-h-96">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-6 sm:px-10 md:px-16">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden border-t-4 border-blue-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <AiOutlineEdit className="text-3xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Edit Book</h2>
              <p className="text-white/80 text-sm mt-2">Update the book details</p>
            </div>

            {/* Form */}
            <form className="p-8 space-y-5" onSubmit={handleEditBook}>
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Book Title <span className="text-secondary-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter book title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author <span className="text-secondary-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>

              {/* Publish Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Publish Year <span className="text-secondary-500">*</span>
                </label>
                <input
                  type="number"
                  min="1900"
                  max="2099"
                  step="1"
                  placeholder="e.g., 2023"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL <span className="text-secondary-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter book cover image URL"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-secondary-50 border-l-4 border-secondary-500 p-4 rounded">
                  <p className="text-secondary-700 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 mt-6"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <BackButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;
