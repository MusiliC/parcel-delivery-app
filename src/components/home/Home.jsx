import React from "react";
import pic1 from "../../assets/food-delivery-5217579_640.png";
import { BellIcon, EnvelopeIcon, TruckIcon } from "@heroicons/react/24/solid";

import ServiceCard from "./ServiceCard";

const Home = () => {
  return (
    <section className="py-28">
      {/* landing page */}
      <div className="w-5/6 md:w-4/6 lg:w-5/6 mx-auto lg:min-h-[80vh]  lg:flex gap-8 items-center">
        {/* headings */}
        <div>
          <h2 className=" text-4xl  md:text-5xl font-bold mb-6">
            Your Favorite Parcel
            <div className="my-2">
              <span className="text-primary-500">Delivery </span> Partner
            </div>
          </h2>
          <p className="mb-6 text-lg">
            We are focused in delivering best services
          </p>
          <button className="button">Do Delivery</button>
        </div>
        {/* image */}
        <div className="mb-20 lg:mb-0 lg:h-[80vh]">
          <img src={pic1} className="lg:h-[85%] lg:object-cover" alt="" />
        </div>
      </div>

      {/* services */}

      <div className="w-5/6 md:w-4/6 lg:w-5/6 mx-auto pb-10">
        <div>
          <h2 className=" text-2xl  font-semibold mb-8">Our Services:</h2>
        </div>
        <div className="flex flex-col gap-4 md:grid md:gap-10 grid-cols-12">
          <div className="md:col-span-6 lg:col-span-4">
            <ServiceCard
              icon={<TruckIcon className="h-8 w-8" />}
              name="Parcel Delivery"
              description="We offer safe and quick delivery of parcel to the destination. We are transparent to our clients"
            />
          </div>
          <div className="md:col-span-6 lg:col-span-4">
            <ServiceCard
              icon={<EnvelopeIcon className="h-8 w-8" />}
              name="Parcel Tracking"
              description="Client can track parcel on its way to destination as the system is integrated with google maps"
            />
          </div>
          <div className="md:col-span-6 lg:col-span-4">
            <ServiceCard
              icon={<BellIcon className="h-8 w-8" />}
              name="Real time Update"
              description="Client can will be able to get updates when parcel delivered through notification"
            />
          </div>
        </div>
      </div>

      {/* contact us */}

   
    </section>
  );
};

export default Home;
