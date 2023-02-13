import React from "react";

const ServiceCard = ({ icon, name, description }) => {
  return (
    <div className="border border-primary-300 rounded-md min-h-[300px] p-4 flex flex-col justify-around hover:cursor-pointer">
      {/* main card */}
      <div className=" text-center">
        {/* icon */}
        <button className="rounded-full bg-secondary-500 p-2 mb-2">
          {icon}
        </button>
        {/* name */}
        <div className="text-lg font-semibold">{name}</div>
      </div>
      {/* description */}
      <div className="w-5/6 mx-auto">{description}</div>
    </div>
  );
};

export default ServiceCard;
