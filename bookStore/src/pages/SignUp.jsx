import React, { useState } from "react";
import { FaUserLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { URL } from "../utils/Api";
const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
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
      const response = await fetch(`${URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({
          name: "",
          email: "",
          password: "",
        });
        storetokenInLS(data.token);
        toast.success("Account created successfully 🚀");
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
        <div className="bg-white rounded-2xl shadow-card overflow-hidden border-t-4 border-primary-500">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <FaUserLock className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-white/80 text-sm mt-2">Join our book community</p>
          </div>

          {/* Form */}
          <form className="p-8 space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-secondary-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={user.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              />
            </div>

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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password <span className="text-secondary-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={user.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
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
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-3 rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 mt-6"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary-600 font-bold hover:text-primary-700">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
