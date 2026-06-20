import React, { useState } from "react";
import { FaUserLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { URL } from "../utils/Api";
const SignIn = () => {
  const [user, setUser] = useState({
    email: "user@gmail.com",
    password: "Aniket@2468",
  });
  const [error, setError] = useState("");
  const { storetokenInLS } = useAuth();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        setError("");
        storetokenInLS(data.token);
        setUser({
          email: "",
          password: "",
        });
        toast.success("Logged in successfully 🚀");
        navigate("/");
      } else {
        setError(data.message);
        data.extraDetails && toast.error(data.extraDetails);
      }
    } catch (error) {}
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center pt-20 px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden border-t-4 border-secondary-500">
          {/* Header */}
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <FaUserLock className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-white/80 text-sm mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <form className="p-8 space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-secondary-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password <span className="text-secondary-500">*</span>
                </label>
                <a href="#" className="text-sm text-secondary-600 hover:text-secondary-700 font-medium">
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-300"
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
              className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold py-3 rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 mt-6"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-secondary-600 font-bold hover:text-secondary-700">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
