import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchUsers, selectAllUsers, selectUserById } from "./authSlice";

const UpdateUser = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { id } = useParams();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    number: "",
    isAdmin: Boolean,
  });

  const user = useSelector((state) => selectUserById(state, id));

  useEffect(() => {
    if (user && user) {
      setUserData({ ...user });
    }

    setValue("username", userData?.username);
    setValue("email", userData?.email);
    setValue("number", userData?.number);
    setValue("isAdmin", userData?.isAdmin);
  }, [user, id]);

  function handleCheckboxChange(event) {
    setValue("isAdmin", event.target.checked);
  }

  

  const [postingData, setPostingData] = useState(false);
  const navigate = useNavigate();

  const handleInput = (data) => {
    console.log(data);
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <section className="py-16 md:min-h-[80vh] md:flex lg:flex-row-reverse items-center  justify-center  ">
      <div className="w-5/6 mx-auto lg:mx-0 md:w-3/6 lg:w-1/3 min-h-[60vh]  md:min-h-[40vh]    p-6 py-10 rounded-md">
        <div className="">
          <h2 className="text-2xl text-center  font-semibold mb-4">
            Update User
          </h2>
        </div>
        <form action="" onSubmit={handleSubmit(handleInput)}>
          <div>
            <div>
              <label htmlFor="">Username</label>
              <input
                type="text"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Field is required",
                  },
                })}
                className="inputStyles"
              />
              {errors?.username && (
                <FormInputErrorAlert message={errors?.username?.message} />
              )}
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                type="text"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Field is required",
                  },
                })}
                className="inputStyles"
              />
              {errors?.email && (
                <FormInputErrorAlert message={errors?.email?.message} />
              )}
            </div>
            <div>
              <label htmlFor="">Phone Number</label>
              <input
                type="text"
                {...register("number", {
                  required: {
                    value: true,
                    message: "Field is required",
                  },
                })}
                className="inputStyles"
              />
              {errors?.number && (
                <FormInputErrorAlert message={errors?.number?.message} />
              )}
            </div>
            <div className="flex items-center justify-between my-3 shadow-sm py-2 px-3 rounded border">
              <label htmlFor="">isAdmin:</label>
              <input
                {...register("isAdmin", {
                  required: {
                    value: true,
                    message: "Field is required",
                  },
                  onChange: { handleCheckboxChange },
                })}
                type="checkbox"
                className="w-6 h-6 rounded-lg"
              />
              {errors?.password && (
                <FormInputErrorAlert message={errors?.password?.message} />
              )}
            </div>
          </div>

          <div className="flex justify-between ">
            <button className="smallBtn">
              {postingData ? "Loading..." : "Update"}
            </button>
            <button
              className="outlineBtn"
              onClick={() => {
                navigate("/dash/users");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateUser;
