import { MapPinIcon } from '@heroicons/react/24/solid';
import React from 'react'

const OneParcel = () => {
  return (
    <div className=" bg-gray-100 rounded-md py-10 space-y-4  px-4 ">
      <div className="flex justify-between text-sm">
        <div>
          <h2 >Parcel Label</h2>
          <p>Sender</p>
          <p>Date Send</p>
        </div>
        <div>
          <p>Recipient</p>
          <p>Location from</p>
          <p>Location to:</p>
        </div>
      </div>
      <div className='flex justify-between text-sm'>
        <div>Update</div>
        <div className=''>Track</div>
        <div>Delete</div>
      </div>
    </div>
  );
}

export default OneParcel