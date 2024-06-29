import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const handleSaveBook = () => {
    setLoading(true);
    axios
      .post("https://bookstoreapi2024.vercel.app/books", {
        title,
        author,
        publishYear,
        url,
      })
      .then((res) => {
        console.log(res?.data?.data);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong!" + err?.response?.data?.message);
        setLoading(false);
      });
  };
  return (
    <div className="min-h-[90vh] bg-slate-200">
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="min-h-[90vh] flex flex-col justify-center">
          <div className="flex justify-center mt-8">
            <div className="bg-amber-100 px-6 py-4 rounded-2xl shadow-xl flex flex-col min-w-[310px] sm:min-w-[500px]">
              <h2 className="text-3xl font-bold text-amber-900 text-center mb-3">
                Add a new book
              </h2>
              <input
                type="text"
                placeholder="Title"
                className="p-2 border border-amber-900 rounded-lg my-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Author"
                className="p-2 border border-amber-900 rounded-lg my-2"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                placeholder="Publish Year"
                className="p-2 border border-amber-900 rounded-lg my-2"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="p-2 border border-amber-900 rounded-lg my-2"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                className="bg-amber-900 text-white p-2 rounded-lg my-2"
                onClick={handleSaveBook}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
          <div className="flex justify-end px-24">
            <BackButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBook;
