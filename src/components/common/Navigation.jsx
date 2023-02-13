import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useMediaQuery from "../hooks/useMediaQuery";
import { Link } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Navigation = ({ isTopOfPage }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const isAboveMedium = useMediaQuery("(min-width: 1060px)");
  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

  const links = [
    {
      name: "Home",
      nav: "/",
    },

    {
      name: "Parcels",
      nav: "/parcels",
    },
    {
      name: "Contact Us",
      nav: "/contact",
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
              <div className="flex gap-8">
                <button>user</button>
                {/* <button className=""> */}
                <Link to={"/sign"}>
                  <button
                    className={
                      !isTopOfPage
                        ? "text-white py-2 px-6 rounded-md bg-primary-500 border-transparent"
                        : "bg-transparent hover:bg-primary-500  hover:text-white py-2 px-6 border border-primary-300 hover:border-transparent rounded"
                    }
                  >
                    log out
                  </button>
                </Link>
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
            <p>User</p>
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

            <Link to={"/sign"}>
              <button
                className="text-white py-2 px-6 rounded-md bg-primary-500 border-transparent"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                Log Out
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
