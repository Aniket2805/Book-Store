import React from "react";
import { MdAdminPanelSettings, MdDelete } from "react-icons/md";
import { useAuth } from "../store/auth";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/Api";
const UserCard = ({ currUser, changedUser, setChangedUser }) => {
  const { user, setUser, setLoading } = useAuth();
  const navigate = useNavigate();
  const handleRoleChange = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/admin/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (id === user._id) {
        navigate("/logout");
        toast.warning("Your Role Changed Successfully ! Please Login Again");
      } else {
        toast.info("Role Changed Successfully !");
      }
      setChangedUser(!changedUser);
      setLoading(false);
    } catch (err) {
      setChangedUser(!changedUser);
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (id === user._id) {
        navigate("/logout");
        setUser("");
        toast.warning("Your Account Deleted Successfully ! Please Login Again");
      } else {
        toast.info("User Deleted Successfully !");
      }
      setChangedUser(!changedUser);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setChangedUser(!changedUser);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border-l-4 border-primary-500">
      <div className="p-6">
        {/* User Header */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-lg">
            {currUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4 flex-grow">
            <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
              {currUser.name}
            </h2>
            <p className="text-sm text-gray-500">{currUser.email}</p>
          </div>
        </div>

        {/* Role Badge */}
        <div className="mb-6">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${currUser.isAdmin ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
            {currUser.isAdmin ? (
              <>
                <MdAdminPanelSettings />
                Admin
              </>
            ) : (
              <>
                <FaUser />
                User
              </>
            )}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {currUser.isAdmin ? (
            <button
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm"
              onClick={() => {
                handleRoleChange(currUser._id);
              }}
            >
              <FaUser className="text-lg" />
              Make User
            </button>
          ) : (
            <button
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm"
              onClick={() => {
                handleRoleChange(currUser._id);
              }}
            >
              <MdAdminPanelSettings className="text-lg" />
              Make Admin
            </button>
          )}
          <button
            className="flex-1 bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm"
            onClick={() => {
              handleDelete(currUser._id);
            }}
          >
            <MdDelete className="text-lg" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
