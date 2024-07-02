import React, { useState } from "react";
import { FaUserLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { URL } from "../utils/Api";
const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
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
      if (response.ok) {
        const data = await response.json();
        storetokenInLS(data.token);
        setUser({
          email: "",
          password: "",
        });
        toast.success("Logged in successfully 🚀");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8 bg-slate-50">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-[#FFF5E1] p-10 rounded-2xl shadow-[#0C1844] border-4 border-dashed border-[#0C1844] shadow-[0px_0px_20px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <FaUserLock className="mx-auto h-12 w-auto text-[#0C1844]" />
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-[#0C1844]">
              Welcome back!
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
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                  className="block w-full p-2 border-2 border-[#C80036] border-dotted outline-none rounded-lg"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
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
                  value={user.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  required
                  className="block w-full p-2 border-2 border-[#C80036] border-dotted outline-none rounded-lg"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg p-2 border-2 border-[#C80036] border-dotted outline-none px-2 bg-[#0C1844] text-white hover:bg-[#C80036] hover:text-white transition duration-200 ease-in-out"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
