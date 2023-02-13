import React, { useState } from "react";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <section className="py-32 md:min-h-[90vh] ">
      <div className="w-5/6 mx-auto md:w-3/6 lg:w-2/6 border p-6 rounded-md">
        <div>
          <h2 className=" text-xl text-center lg:w-4/6 mx-auto font-semibold mb-2">
            {isSignUp ? <p>Sign In</p> : <p> Create Account</p>}
          </h2>
          <form action="">
            {isSignUp ? (
              <div>
                <div>
                  <label htmlFor="">Email</label>
                  <input type="text" className="inputStyles" />
                </div>
                <div>
                  <label htmlFor="">Password</label>
                  <input type="text" className="inputStyles" />
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <label htmlFor="">Username</label>
                  <input type="text" className="inputStyles" />
                </div>
                <div>
                  <label htmlFor="">Email</label>
                  <input type="text" className="inputStyles" />
                </div>
                <div>
                  <label htmlFor="">Phone Number</label>
                  <input type="text" className="inputStyles" />
                </div>
                <div>
                  <label htmlFor="">Password</label>
                  <input type="text" className="inputStyles" />
                </div>
              </div>
            )}

            <div className="flex justify-center">
              {isSignUp ? (
                <button className="button">Sign In</button>
              ) : (
                <button className="button">Register</button>
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
