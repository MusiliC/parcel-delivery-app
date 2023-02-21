import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormInputErrorAlert from "../common/FormInputErrorAlert";
import { signIn, signUp } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  // const auth = useSelector((state) => state.authReducer);
  // console.log(auth);

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

  const handleAuth = async (data) => {
    if (isSignUp) {
      setPostingData(true);
      const { success, auth } = await dispatch(signUp(data));
      setPostingData(false);
      if (success) {
        navigate("/");
      }
    } else {
      setPostingData(true);
      const { success, auth } = await dispatch(signIn(data));
      setPostingData(false);
      if (success) {
        navigate("/");
      }
    }
  };

  return (
    <section className="py-32 md:min-h-[90vh] ">
      <div className="w-5/6 mx-auto md:w-3/6 lg:w-2/6 border p-6 rounded-md">
        <div>
          <h2 className=" text-xl text-center lg:w-4/6 mx-auto font-semibold mb-2">
            {isSignUp ? <p>Sign In</p> : <p> Create Account</p>}
          </h2>
          <form action="" onSubmit={handleSubmit(handleAuth)}>
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
                <button className="button">
                  {postingData ? "Loading..." : "Sign In"}
                </button>
              ) : (
                <button className="button">
                  {postingData ? "Loading..." : "Register"}
                </button>
              )}
            </div>

            {isSignUp ? (
              <div className="my-5">
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
