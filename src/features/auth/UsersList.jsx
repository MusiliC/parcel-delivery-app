import React, { useEffect } from "react";
import { fetchUsers, selectAllUsers } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import OneUser from "./OneUser";

const UsersList = () => {
  const dispatch = useDispatch();

  const { users, status } = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <section className="py-28 min-h-[90vh]">
      <div className="w-[90%] md:w-4/6 lg:w-5/6 mx-auto  lg:min-h-[80vh]  ">
        <div className="">
          <h2 className="text-2xl text-center  font-semibold mb-4">Users</h2>
        </div>
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">username</th>
              <th className="py-3 px-6">isAdmin</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user.email}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <OneUser {...user} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersList;
