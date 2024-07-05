import React from "react";
import { MdAdminPanelSettings, MdDelete } from "react-icons/md";
import { useAuth } from "../store/auth";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const UserCard = ({ currUser, changedUser, setChangedUser }) => {
  const { user, setUser, setLoading } = useAuth();
  const navigate = useNavigate();
  const handleRoleChange = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/admin/users/${id}`, {
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
      const response = await fetch(`http://localhost:3000/admin/users/${id}`, {
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
    <div className="bg-[#FFF5E1] text-[#373A40] min-[450px]:text-lg font-medium p-3 min-[450px]:p-5 md:p-10 rounded-2xl border-4 min-[450px]:border-8 border-dashed border-[#0C1844] shadow-[#0C1844] shadow-[0px_0px_20px]">
      <div>
        <h1 className="text-xl min-[450px]:text-3xl font-bold text-[#C80036]">
          {currUser.name}
        </h1>
        <h1>Emain:- {currUser.email}</h1>
        <h1>Role:- {currUser.isAdmin ? "Admin" : "User"}</h1>
        <div className="flex justify-end mt-4">
          {currUser.isAdmin ? (
            <button
              className="bg-green-700 text-white px-2 min-[450px]:px-4 py-1 min-[450px]:py-2 rounded-lg mr-3 transition-all shadow-[0px_0px_10px] hover:shadow-green-700 flex items-center border-2 border-yellow-500 border-dashed"
              onClick={() => {
                handleRoleChange(currUser._id);
              }}
            >
              <FaUser className="mr-1 min-[450px]:text-base" />
              Make User
            </button>
          ) : (
            <button
              className="bg-green-700 text-white px-2 min-[450px]:px-4 py-1 min-[450px]:py-2 rounded-lg mr-3 transition-all shadow-[0px_0px_10px] hover:shadow-green-700 flex items-center border-2 border-yellow-500 border-dashed"
              onClick={() => {
                handleRoleChange(currUser._id);
              }}
            >
              <MdAdminPanelSettings className="mr-1" />
              Make Admin
            </button>
          )}
          <button
            className="bg-red-600 text-white px-2 min-[450px]:px-4 py-1 min-[450px]:py-2 border-2 border-yellow-500 border-dashed rounded-lg transition-all shadow-[0px_0px_10px] hover:shadow-red-600 flex items-center"
            onClick={() => {
              handleDelete(currUser._id);
            }}
          >
            <MdDelete className="mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
