import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="w-full bg-primary-100">
      <div className="w-5/6  h-[250px] md:h-[150px] mx-auto flex flex-col  md:flex-row justify-around md:justify-between items-center">
        <div>
          <p className='font-semibold'>SendIt App Project from scratch</p>
        </div>
        <div className='flex flex-col space-y-2 font-semibold'>
          <Link to={"/"}>Home</Link>
          <Link to={"/parcels"}>Parcels</Link>
          <Link to={"/contact"}>Contact Us</Link>
        </div>
        <div>
          <p className='font-bold text-primary-500'>@Musili 2023</p>
        </div>
      </div>
    </section>
  );
}

export default Footer