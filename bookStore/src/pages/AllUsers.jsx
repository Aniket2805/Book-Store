import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useAuth } from "../store/auth";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import UserCard from "../components/UserCard";
import { URL } from "../utils/Api";
const AllUsers = () => {
  const { loading, user, setLoading } = useAuth();
  const [changedUser, setChangedUser] = useState(false);
  const [users, setUsers] = useState([]);
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
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, [user, changedUser]);

  return (
    <div className="min-h-screen bg-slate-50 px-8 md:px-16 lg:px-28">
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center pt-24">
          <h1 className="text-3xl md:text-5xl font-bold text-[#01204E] mb-3 sm:mb-4 underline flex justify-center">
            <FaUsers className="mr-3 animate-bounce text-[#C80036]" />
            Users List
            <MdAdminPanelSettings className="ml-3 animate-bounce text-[#C80036]" />
          </h1>
          <div className="grid min-[1000px]:grid-cols-2 min-[1300px]:grid-cols-3 mt-8 gap-8">
            {users &&
              users.map((user) => (
                <UserCard
                  key={user._id}
                  changedUser={changedUser}
                  setChangedUser={setChangedUser}
                  currUser={user}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
