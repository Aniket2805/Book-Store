import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useAuth } from "../store/auth";
import { FaUsers } from "react-icons/fa";
import UserCard from "../components/UserCard";
import { URL } from "../utils/Api";
import { MdAdminPanelSettings } from "react-icons/md";

const AllUsers = () => {
  const { user } = useAuth();
  const [changedUser, setChangedUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [user, changedUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pt-24 pb-16">
      {loading ? (
        <div className="flex justify-center items-center min-h-96">
          <Spinner />
        </div>
      ) : (
        <div className="mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <FaUsers className="text-3xl text-primary-600" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Users Management
              </h1>
              <MdAdminPanelSettings className="text-3xl text-secondary-600" />
            </div>
            <p className="text-gray-600 text-lg">
              Manage {users.length} {users.length === 1 ? "user" : "users"} in the system
            </p>
          </div>

          {/* Users Grid */}
          {users.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((currUser) => (
                <UserCard
                  key={currUser._id}
                  changedUser={changedUser}
                  setChangedUser={setChangedUser}
                  currUser={currUser}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No users found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
