import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import useMediaQuery from "../hooks/useMediaQuery";
import { Link } from "react-router-dom";


const Navigation = ({ isTopOfPage, auth }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const dispatch = useDispatch();

  const isAboveMedium = useMediaQuery("(min-width: 1060px)");
  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

  // const handleLogOut = () => {
  //   dispatch(signOut());
  //   navigate("/sign");
  // };

  const links = [
    {
      name: "Home",
      nav: "/",
    },

    {
      name: "Parcels",
      nav: "/dash/parcels",
    },
    {
      name: "Contact Us",
      nav: "/dash/contact",
    },
  ];

  return (
    <nav className="w-full">
      {/*  className={`${navbarBg} flexBetween fixed top-0 z-30 w-full py-6` } */}
      <div className={`${navbarBackground} w-full   fixed top-0 z-30 py-6`}>
        <div className="w-5/6  mx-auto flex items-center justify-between">
          {/* logo */}
          <div>
            <p className="text-primary-500 font-semibold text-lg">SendIt App</p>
          </div>

          {isAboveMedium ? (
            <>
              {/* links */}
              <div className="flex gap-8">
                {links &&
                  links.map((link) => (
                    <p key={link.name}>
                      <Link to={link.nav}>{link.name}</Link>
                    </p>
                  ))}
              </div>
              {/* button */}
              <div className="flex items-center gap-8">
                {auth ? (
                  <p className="font-semibold text-lg">{auth.username}</p>
                ) : (
                  <Link to={"/sign"}>
                    <button
                      className={
                        !isTopOfPage
                          ? "text-white py-2 px-6 rounded-md bg-primary-500 border-transparent"
                          : "bg-transparent hover:bg-primary-500  hover:text-white py-2 px-6 border border-primary-300 hover:border-transparent rounded"
                      }
                    >
                      Sign In
                    </button>
                  </Link>
                )}
                {/* <button className=""> */}
                {auth ? (
                  <button
                    // onClick={handleLogOut}
                    className={
                      !isTopOfPage
                        ? "text-white py-2 px-6 rounded-md bg-primary-500 border-transparent"
                        : "bg-transparent hover:bg-primary-500  hover:text-white py-2 px-6 border border-primary-300 hover:border-transparent rounded"
                    }
                  >
                    log out
                  </button>
                ) : null}
              </div>
            </>
          ) : (
            <button
              className="rounded-full bg-primary-500 p-2"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Bars3Icon className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      </div>

      {!isAboveMedium && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full  w-[300px] bg-secondary-300 drop-shadow-xl">
          {/* close icon */}

          <div className="flex justify-end p-12">
            <button
              className="rounded-full bg-secondary-500 p-2"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <XMarkIcon className="h-6 w-6  font-bold" />
            </button>
          </div>

          <div className="flex flex-col ml-[33%] text-xl font-semibold gap-8">
            {auth ? (
              <p>{auth.username}</p>
            ) : (
              <Link
                to={"/sign"}
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <button>Sign In</button>
              </Link>
            )}

            {links &&
              links.map((link) => (
                <p key={link.name}>
                  <Link
                    to={link.nav}
                    onClick={() => setIsMenuToggled(!isMenuToggled)}
                  >
                    {link.name}
                  </Link>
                </p>
              ))}

            {auth ? (
              <Link to={"/sign"}>
                <button
                  className="text-white py-2 px-6 rounded-md bg-primary-500 border-transparent"
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  Log Out
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
