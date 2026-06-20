import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAuth } from "../store/auth";
import { BookCard } from "../components/BookCard";
import { URL } from "../utils/Api";
import Spinner from "../components/Spinner";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { isLoggedIn, user, getUser } = useAuth();

  useEffect(() => {
    setPageLoading(true);
    
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          await getUser();
        }
        
        const response = await axios.get(`${URL}/books`);
        setBooks(response?.data?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pt-20">
      {/* Header Section */}
      <div className="px-4 sm:px-10 md:px-16 lg:px-24 py-12">
        <div className="mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            Welcome to BookStore
          </h1>
          <p className="text-gray-600 text-lg">
            Discover thousands of books across all genres. Find your next favorite read today!
          </p>
        </div>
      </div>

      {pageLoading ? (
        <div className="flex justify-center items-center min-h-96">
          <Spinner />
        </div>
      ) : (
        <div>
          {/* Books Grid */}
          <div className="px-4 sm:px-10 md:px-16 lg:px-24 py-8">
            {books.length > 0 ? (
              <div
                id="books"
                className="grid sm:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 gap-6"
              >
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">No books available at the moment</p>
              </div>
            )}
          </div>

          {/* Add Book Button for Admin */}
          {user?.isAdmin && (
            <div className="flex justify-center pt-12">
              <Link to="/books/create">
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-glow-lg hover:shadow-glow-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 text-lg">
                  <IoIosAddCircleOutline className="text-3xl" />
                  <span>Add New Book</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
