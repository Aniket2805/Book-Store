import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
const ShowBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        console.log(res?.data?.data);
        setBook(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="px-24 py-12 min-h-screen">
          <h1 className="text-center text-5xl font-bold font-mono text-amber-950">
            Books Store
          </h1>
          <div className="flex flex-col items-center mt-8">
            <img
              src={book?.url}
              className="h-96 rounded-lg shadow-xl shadow-amber-950 object-contain"
            />
            <h1 className="text-3xl font-bold text-blue-950 mt-8">
              {book?.title}
            </h1>
            <p className="text-amber-900 font-medium">
              Author:- {book?.author}
            </p>
            <p className="text-amber-900 font-medium">
              Publish Year:- {book?.publishYear}
            </p>
          </div>
          <div className="flex justify-end">
            <BackButton />
          </div>
        </div>
      )}
    </>
  );
};

export default ShowBook;
