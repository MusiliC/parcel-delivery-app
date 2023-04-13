import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const OneUser = ({ _id, email, username, isAdmin }) => {
  const navigate = useNavigate();

  const handleUpdate = (new_id) => {
    navigate(`/dash/users/${new_id}`);
  };

  // const handleDelete = (new_id) => {
  //   dispatch(deleteParcel(new_id));
  // };



  return (
    <>
      <td className="tdClass">{email}</td>
      <td className="tdClass">{username}</td>
      <td className="tdClass">
        {isAdmin.toString().charAt(0).toUpperCase() +
          isAdmin.toString().slice(1)}
      </td>
      <td className="tdClass">
        <div className="flex items-center gap-x-10">
          <p>
            <PencilIcon
              className="h-4 w-4  hover:cursor-pointer"
              onClick={() => handleUpdate(_id)}
            />
          </p>
          <p>
            <TrashIcon
              className="h-4 w-4 text-red-400 hover:cursor-pointer"
              onClick={() => handleDelete(_id)}
            />
          </p>
        </div>
      </td>
    </>
  );
};

export default OneUser;
