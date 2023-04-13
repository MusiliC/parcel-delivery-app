import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import man from "../../assets/man-7716120_640.png";
import FormInputErrorAlert from "../../components/common/FormInputErrorAlert";

import { useNavigate } from "react-router-dom";

const Auth = () => {


  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(true);
  const [postingData, setPostingData] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // const handleAuth = async (data) => {
  //   if (isSignUp) {
  //     setPostingData(true);
  //     const { success, auth } = await dispatch(signUp(data));
  //     setPostingData(false);
  //     if (success) {
  //       navigate("/");
  //     }
  //   } else {
  //     setPostingData(true);
  //     const { success, auth } = await dispatch(signIn(data));
  //     setPostingData(false);
  //     if (success) {
  //       navigate("/");
  //     }
  //   }
  // };

  return (
    <section className="py-16 md:min-h-[80vh] md:flex lg:flex-row-reverse items-center  justify-center  ">
      <div className="hidden lg:flex justify-center w-1/2 lg:min-h-[80vh] ">
        <img src={man} alt="" className=" w-[80%] object-cover " />
      </div>
      <div className="w-5/6 mx-auto lg:mx-0 md:w-3/6 lg:w-1/3 border md:min-h-[40vh]  bg-yellow-50 lg:min-h-[80vh] p-6 py-10 rounded-md">
        <div>
          <h2 className=" text-4xl text-center  lg:w-4/6 mx-auto font-semibold my-6">
            {/* {isSignUp ? <p>Sign In</p> : <p> Register</p>} */} SendIt App
          </h2>
          <h2 className=" text-sm md:text-base  text-center text-gray-400 font-semibold mx-auto  my-4">
            {isSignUp ? null : (
              <p> Register to send and deliver parcels to your friends</p>
            )}
          </h2>
          <form action="" >
            {isSignUp ? (
              <div>
                <div>
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
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
                  <label htmlFor="">Password</label>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    type="text"
                    className="inputStyles"
                  />
                  {errors?.password && (
                    <FormInputErrorAlert message={errors?.password?.message} />
                  )}
                </div>
              </div>
            ) : (
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
                <div>
                  <label htmlFor="">Password</label>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Field is required",
                      },
                    })}
                    type="text"
                    className="inputStyles"
                  />
                  {errors?.password && (
                    <FormInputErrorAlert message={errors?.password?.message} />
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              {isSignUp ? (
                <button className="button mt-6">
                  {postingData ? "Loading..." : "Sign In"}
                </button>
              ) : (
                <button className="button">
                  {postingData ? "Loading..." : "Register"}
                </button>
              )}
            </div>

            {isSignUp ? (
              <div className="my-5 mt-10">
                <p
                  className="font-semibold  underline hover:cursor-pointer"
                  onClick={() => setIsSignUp(false)}
                >
                  No Account? Create Account.
                </p>
              </div>
            ) : (
              <p
                className="font-semibold mt-4  underline hover:cursor-pointer"
                onClick={() => setIsSignUp(true)}
              >
                Back to sign in
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auth;
