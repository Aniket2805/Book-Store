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
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 py-12 lg:px-8 bg-slate-50">
        <div className="mt-10 sm:mx-auto w-full max-w-md bg-[#FFF5E1] p-6 sm:p-10 rounded-2xl shadow-[#0C1844] border-4 border-dashed border-[#0C1844] shadow-[0px_0px_20px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <FaUserLock className="mx-auto h-12 w-auto text-[#0C1844]" />
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-[#0C1844]">
              Create your account !
            </h2>
          </div>
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Full Name<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={user.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full p-2 border-2 border-[#C80036] border-dotted outline-none rounded-lg"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full p-2 border-2 border-[#C80036] border-dotted outline-none rounded-lg"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password<span className="text-red-500">*</span>
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={user.password}
                  onChange={handleInputChange}
                  required
                  className="block w-full p-2 border-2 border-[#C80036] border-dotted outline-none rounded-lg"
                />
              </div>
            </div>
            {error && (
              <div className="flex justify-center">
                {" "}
                <p className="text-red-500 text-xs italic">
                  ****{error}****
                </p>{" "}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg p-2 border-2 border-[#C80036] border-dotted outline-none px-2 bg-[#0C1844] text-white hover:bg-[#C80036] hover:text-white transition duration-400 ease-linear"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
