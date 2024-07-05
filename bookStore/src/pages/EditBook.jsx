import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { URL } from "../utils/Api";
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
      .get(`http://localhost:3000/books/${id}`)
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
    <div className="min-h-screen bg-slate-50">
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <div className="bg-[#FFF5E1] p-6 sm:p-10 rounded-2xl shadow-[#0C1844] border-4 border-dashed border-[#0C1844] shadow-[0px_0px_20px] flex flex-col min-w-[310px] sm:min-w-[500px]">
              <h2 className="text-3xl font-bold text-[#C80036] text-center mb-3">
                Edit book
              </h2>
              <input
                type="text"
                placeholder="Title"
                className="p-2 border-2 border-[#C80036] border-dotted outline-none rounded-lg my-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Author"
                className="p-2 border-2 border-[#C80036] border-dotted outline-none rounded-lg my-2"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                placeholder="Publish Year"
                className="p-2 border-2 border-[#C80036] border-dotted outline-none rounded-lg my-2"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="p-2 border-2 border-[#C80036] border-dotted outline-none rounded-lg my-2"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              {error && (
                <div className="flex justify-center">
                  <p className="text-red-500 text-xs italic">****{error}****</p>
                </div>
              )}
              <button
                className="bg-[#0C1844] text-white p-2 rounded-lg my-2"
                onClick={handleEditBook}
              >
                {loading ? "Saving..." : "Save Changes"}
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

export default EditBook;
