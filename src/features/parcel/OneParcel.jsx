import {
  MapIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { deleteParcel } from "./parcelSlice";
import moment from "moment";
import React from "react";

import { useNavigate } from "react-router-dom";

const OneParcel = ({
  isDelivered,
  id,
  sender,
  label,
  recipient,
  location_to,
  location_from,
  date,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = (new_id) => {
    dispatch(deleteParcel(new_id));
  };

  const handleUpdate = (new_id) => {
    navigate(`/dash/parcels/${new_id}`);
  };

  return (
    <div className=" bg-secondary-100 rounded-md py-8 space-y-4  px-5 md:px-8 shadow-sm hover:cursor-pointer hover:bg-gray-100 ">
      <div className="w-full bg-primary-100 rounded-md py-1.5 flex gap-5 justify-center text-sm md:text-base font-semibold">
        Parcel Status:
        {isDelivered === true ? (
          <p className="font-semibold">Yes, Delivered</p>
        ) : (
          <p className="font-semibold">Not Delivered</p>
        )}
      </div>
      <div className="flex justify-between space-x-4 text-sm">
        <div>
          <h2>
            Parcel Label: <span className="font-semibold">{label}</span>
          </h2>
          <p>
            Sender: <span className="font-semibold">{sender}</span>
          </p>
          <p>
            Date Send:{" "}
            <span className="font-semibold">
              {moment(date).format("d/MM/YYYY")}
            </span>
          </p>
        </div>
        <div>
          <p>
            Recipient: <span className="font-semibold">{recipient}</span>
          </p>
          <p>
            Location from:{" "}
            <span className="font-semibold">{location_from}</span>
          </p>
          <p>
            Location to: <span className="font-semibold">{location_to}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between text-sm font-semibold">
        <div className="actionButtons " onClick={() => handleUpdate(id)}>
          <p className="text-sm ">Update </p>
          <p>
            <PencilIcon className="h-4 w-4" />
          </p>
        </div>
        <div className="actionButtons">
          <p className="text-sm">Track </p>
          <p>
            <MapPinIcon className="h-4 w-4" />
          </p>
        </div>
        <div className="actionButtons" onClick={() => handleDelete(id)}>
          <p className="text-sm">Delete </p>
          <p>
            <TrashIcon className="h-4 w-4" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default OneParcel;
