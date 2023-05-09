/** @format */

import React from "react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";

const House = ({ house }) => {
  const { Image, Type, Country, Address, Bedrooms, Bathrooms, Surface, Price } =
    house;
  return (
    <div className=" bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition ">
      <img
        className="mb-8 rounded-tl-[80px] max-h-[200px] w-full"
        src={Image}
        alt=""
      />
      <div className=" mb-4 flex gap-x-2 text-sm">
        <div className=" bg-green-500 rounded-full text-white px-3">{Type}</div>
        <div className=" bg-violet-500 rounded-full text-white px-3">
          {Country}
        </div>
      </div>
      <div className=" text-lg font-semibold max-w-[260px] ">{Address}</div>
      <div className=" flex gap-x-4 my-4">
        <div className=" flex items-center text-gray-600 gap-1">
          <div className=" text-[20px]">
            <BiBed />
          </div>
          <div>{Bedrooms}</div>
        </div>
        <div className=" flex items-center text-gray-600 gap-1">
          <div className=" text-[20px]">
            <BiBath />
          </div>
          <div>{Bathrooms}</div>
        </div>
        <div className=" flex items-center text-gray-600 gap-1">
          <div className=" text-[20px]">
            <BiArea />
          </div>
          <div>{Surface}</div>
        </div>
      </div>
      <div className=" text-lg font-semibold text-violet-600 mb-4">
        {Price} TL
      </div>
    </div>
  );
};

export default House;
