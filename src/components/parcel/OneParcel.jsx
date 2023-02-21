import {
  MapIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import React from "react";
import { deleteParcel } from "../../redux/actions/parcelActions";
import { useNavigate } from "react-router-dom";

const OneParcel = ({
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
    navigate(`/parcels/${new_id}`);
  };

  return (
    <div className=" bg-secondary-100 rounded-md py-8 space-y-4  px-5 md:px-8 shadow-sm hover:cursor-pointer hover:bg-gray-100 ">
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
