import React, { useState, useEffect } from "react";
import picture from "../../assets/picture.png";
import OneParcel from "./OneParcel";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchParcels, newParcel } from "./parcelSlice";
import { selectAllParcels } from "./parcelSlice";
import FormInputErrorAlert from "../../components/common/FormInputErrorAlert";

import { useNavigate } from "react-router-dom";

const Parcel = ({ auth }) => {
  const [postingData, setPostingData] = useState(false);

  const { parcels, isLoading, error } = useSelector(selectAllParcels);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleInput = async (data) => {


    setPostingData(true);
    await dispatch(newParcel(data));
    setPostingData(false);
    reset();
  };

  useEffect(() => {
    dispatch(fetchParcels());
  }, []);

  // useEffect(() => {}, [auth]);
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
          <form action="" className="" onSubmit={handleSubmit(handleInput)}>
            <label htmlFor="">Parcel Label</label>
            <input
              type="text"
              {...register("parcel_label", {
                required: {
                  value: true,
                  message: "Field is required",
                },
              })}
              className="shadow-sm  border rounded py-2 px-3 mb-2 focus:outline-none w-full"
            />
            {errors?.parcel_label && (
              <FormInputErrorAlert message={errors?.parcel_label?.message} />
            )}
            <div className="flex space-x-2 md:justify-between">
              <div>
                <div>
                  <label htmlFor="">Sender</label>
                  <input
                    type="text"
                    {...register(
                      "sender",
                      { value: auth?.username },
                      {
                        required: {
                          value: true,
                          message: "Field is required",
                        },
                      }
                    )}
                    className="inputStyles"
                  />
                  {errors?.sender && (
                    <FormInputErrorAlert message={errors?.sender?.message} />
                  )}
                </div>
                <div>
                  <label htmlFor="">Location From</label>
                  <input
                    type="text"
                    {...register("location_from", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                  {errors?.location_from && (
                    <FormInputErrorAlert
                      message={errors?.location_from?.message}
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="">Location to</label>
                  <input
                    type="text"
                    {...register("location_to", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                  {errors?.location_to && (
                    <FormInputErrorAlert
                      message={errors?.location_to?.message}
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="">Date Send</label>
                  <input
                    type="date"
                    {...register("date_send", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                  {errors?.date_send && (
                    <FormInputErrorAlert message={errors?.date_send?.message} />
                  )}
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="">Recipient Name:</label>
                  <input
                    type="text"
                    {...register("recipient_name", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                  {errors?.recipient_name && (
                    <FormInputErrorAlert
                      message={errors?.recipient_name?.message}
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="">Recipient Number:</label>
                  <input
                    type="text"
                    {...register("recipient_number", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                  {errors?.recipient_number && (
                    <FormInputErrorAlert
                      message={errors?.recipient_number?.message}
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="">Recipient Email:</label>
                  <input
                    type="text"
                    {...register("recipient_email", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                  {errors?.recipient_email && (
                    <FormInputErrorAlert
                      message={errors?.recipient_email?.message}
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="">Parcel Amount</label>
                  <input
                    type="text"
                    {...register("parcel_amount", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                  {errors?.parcel_amount && (
                    <FormInputErrorAlert
                      message={errors?.parcel_amount?.message}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center my-4">
              <button disabled={postingData} className="button">
                {postingData ? "Loading..." : "Submit Parcel"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* parcels */}

      <div className="w-5/6 md:w-4/6 lg:w-5/6 mx-auto lg:min-h-[80vh] py-8 ">
        <div>
          <h2 className=" text-lg md:text-2xl text-center font-semibold mb-8">
            Update, Track and Cancel Parcels:
          </h2>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row flex-wrap lg:justify-around justify-center lg:gap-10 ">
          {parcels.length > 0 && !isLoading ? (
            parcels &&
            parcels?.map((parcel) => (
              <div className=" " key={parcel._id}>
                <OneParcel
                  isDelivered={parcel.isDelivered}
                  id={parcel._id}
                  sender={parcel.sender?.username}
                  label={parcel.parcel_label}
                  recipient={parcel.recipient_name}
                  location_to={parcel.location_to}
                  location_from={parcel.location_from}
                  date={parcel.date_send}
                />
              </div>
            ))
          ) : parcels.length === 0 && !isLoading ? (
            <p className="errMessage">No parcels for current user!</p>
          ) : isLoading && error ? (
            <p className="errMessage">{error}...</p>
          ) : (
            <p className="loading">Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Parcel;
