import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { URL } from "../utils/Api";
const ShowBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/books/${id}`)
      .then((res) => {
        setBook(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="bg-slate-50 min-h-[90vh]">
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="bg-slate-50 min-h-screen flex flex-col justify-center py-10">
          <div className="grid md:grid-cols-2 items-center px-10 sm:px-24">
            <div className="flex justify-center items-center mt-8">
              <img
                src={book?.url}
                className="h-[440px] rounded-2xl border-[16px] border-dashed border-[#0C1844] shadow-[#0C1844] shadow-[0px_0px_20px] transition-all duration-300 hover:-rotate-6"
              />
            </div>
            <div className="mt-8">
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
    </div>
  );
};

export default ShowBook;
