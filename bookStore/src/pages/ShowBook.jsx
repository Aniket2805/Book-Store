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
      .get(`https://book-store-api-gamma.vercel.app/books/${id}`)
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
        <div className="min-h-screen bg-slate-200">
          <h1 className="text-center text-5xl font-bold font-mono text-white mb-8 drop-shadow-lg bg-slate-700 py-4 shadow-lg">
            Books Store
          </h1>
          <div className="grid grid-cols-2 items-center mt-8 px-24">
            <div className="flex justify-center items-center">
              <img
                src={book?.url}
                className="h-96 rounded-lg shadow-xl shadow-amber-950 object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-950 mb-2">
                {book?.title}
              </h1>
              <p className="font-medium text-xl mb-1">
                <span className="text-amber-900 ">Author:- </span>
                {book?.author}
              </p>
              <p className="font-medium text-xl mb-1">
                <span className="text-amber-900">Publish Year:- </span>
                {book?.publishYear}
              </p>
              <p className="font-medium text-xl text-slate-600">
                <span className="text-amber-900">Description:- </span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="flex justify-end px-24">
            <BackButton />
          </div>
        </div>
      )}
    </>
  );
};

export default ShowBook;
