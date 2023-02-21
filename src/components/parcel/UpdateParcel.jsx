import React, { useState, useEffect } from "react";
import FormInputErrorAlert from "../common/FormInputErrorAlert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneParcel,
  getParcels,
  updateParcel,
} from "../../redux/actions/parcelActions";
import { useNavigate, useParams } from "react-router-dom";

const UpdateParcel = () => {
  const [postingData, setPostingData] = useState(false);

  const { id } = useParams();

  const [parcel, setParcel] = useState({
    parcel_label: "",
    location_from: "",
    location_to: "",
    parcel_amount: "",
    recipient_email: "",
    recipient_number: "",
    recipient_name: "",
    date_send: "",
  });

  const dispatch = useDispatch();
  const oneParcel = useSelector((state) => state.parcelReducer.parcel);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleInput = async (data) => {
    setPostingData(true);
    const obj = {
      ...data,
      sender: id,
    };
    dispatch(updateParcel(id, obj));
    setPostingData(false);
    navigate("/parcels");
  };

  useEffect(() => {
    dispatch(getParcels());
    dispatch(getOneParcel(id));
  }, [id]);

  useEffect(() => {
    if (oneParcel) {
      setParcel({ ...oneParcel });
    }
    setValue("parcel_label", parcel?.parcel_label);
    setValue("location_from", parcel?.location_from);
    setValue("location_to", parcel?.location_to);
    setValue("recipient_name", parcel?.recipient_name);
    setValue("recipient_number", parcel?.recipient_number);
    setValue("recipient_email", parcel?.recipient_email);
    setValue("parcel_amount", parcel?.parcel_amount);
  }, [oneParcel]);

  return (
    <section className="py-20 min-h-[90vh]">
      <div className="w-[90%] md:w-4/6 lg:w-5/6 mx-auto  lg:min-h-[80vh]  lg:flex justify-center gap-8 items-center">
        {/* parcel form */}
        <div>
          <div className="">
            <h2 className="text-2xl text-center  font-semibold mb-6">
              Update Parcel
            </h2>
          </div>
          <form action="" className="" onSubmit={handleSubmit(handleInput)}>
          

            <div className="flex space-x-2 md:justify-between">
              <div>
                <div>
                  <label htmlFor="">Parcel Label</label>
                  <input
                    type="text"
                    {...register("parcel_label", {
                      required: {
                        value: false,
                      },
                    })}
                    className="inputStyles"
                  />
                </div>
                <div>
                  <label htmlFor="">Location From</label>
                  <input
                    type="text"
                    {...register("location_from", {
                      required: {
                        value: false,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                </div>
                <div>
                  <label htmlFor="">Location to</label>
                  <input
                    type="text"
                    {...register("location_to", {
                      required: {
                        value: false,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
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
                        value: false,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                </div>
                <div>
                  <label htmlFor="">Recipient Number:</label>
                  <input
                    type="text"
                    {...register("recipient_number", {
                      required: {
                        value: false,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                </div>
                <div>
                  <label htmlFor="">Recipient Email:</label>
                  <input
                    type="text"
                    {...register("recipient_email", {
                      required: {
                        value: false,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                </div>
                <div>
                  <label htmlFor="">Parcel Amount</label>
                  <input
                    type="text"
                    {...register("parcel_amount", {
                      required: {
                        value: false,
                        message: "Field is required",
                      },
                    })}
                    className="inputStyles"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center my-4">
              <button disabled={postingData} className="button">
                {postingData ? "updating..." : "Update Parcel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateParcel;
