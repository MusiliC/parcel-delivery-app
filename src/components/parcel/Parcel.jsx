import React from "react";
import picture from "../../assets/picture.png";
import OneParcel from "./OneParcel";

const Parcel = () => {
  return (
    <section className="py-28 min-h-[90vh]">
      <div className="w-[90%] md:w-4/6 lg:w-5/6 mx-auto  lg:min-h-[80vh]  lg:flex justify-between gap-8 items-center">
        {/* pic */}
        <div className="hidden lg:block  h-[200px]">
          <img src={picture} className="h-full" alt="" />
        </div>
        {/* parcel form */}
        <div>
          <div className="">
            <h2 className="text-2xl text-center  font-semibold mb-4">
              Create Parcel
            </h2>
          </div>
          <form action="" className="">
            <label htmlFor="">Parcel Label</label>
            <input
              type="text"
              className="shadow-sm  border rounded py-2 px-3 mb-2 focus:outline-none w-full"
            />
            <div className="flex space-x-2 md:justify-between">
              <div>
                <div>
                  <label htmlFor="">Sender</label>
                  <input type="text" className="inputStyles" />
                </div>
                <div>
                  <label htmlFor="">Location From</label>
                  <input type="text" className="inputStyles" />
                </div>
                <div>
                  <label htmlFor="">Location to</label>
                  <input type="text" className="inputStyles" />
                </div>
                <div>
                  <label htmlFor="">Date Send</label>
                  <input type="text" className="inputStyles" />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="">Recipient Name:</label>
                  <input type="text" className="inputStyles" />
                </div>
                <div>
                  <label htmlFor="">Recipient Number:</label>
                  <input type="text" className="inputStyles" />
                </div>
                <div>
                  <label htmlFor="">Recipient Email:</label>
                  <input type="text" className="inputStyles" />
                </div>
                <div>
                  <label htmlFor="">Parcel Amount</label>
                  <input type="text" className="inputStyles" />
                </div>
              </div>
            </div>
            <div className="flex justify-center my-4">
              <button className="button">Create Parcel</button>
            </div>
          </form>
        </div>
      </div>

      {/* parcels */}

      <div className="w-5/6 md:w-4/6 lg:w-5/6 mx-auto lg:min-h-[80vh] py-8 ">
        <div>
          <h2 className=" text-lg md:text-2xl  font-semibold mb-8">
            Update, Track and Cancel Parcels:
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:grid md:gap-4 lg:gap-10 grid-cols-12">
          <div className="md:col-span-6 lg:col-span-4">
            <OneParcel />
          </div>
          <div className="md:col-span-6 lg:col-span-4">
            <OneParcel />
          </div>
          <div className="md:col-span-6 lg:col-span-4">
            <OneParcel />
          </div>
          <div className="md:col-span-6 lg:col-span-4">
            <OneParcel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Parcel;
