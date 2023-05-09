/** @format */

import React from "react";

const HouseItem = ({ onCLick, house }) => {
  return (
    <div
      onClick={onCLick}
      className=" bg-white border-l-4 min-h-[100px] shadow-lg flex border-violet-400 rounded-md my-5 cursor-pointer hover:scale-105 transition"
    >
      <div className="p-10 max-w-[200px] flex items-center ">
        <img className=" max-h-[200px] w-auto" src={house.Image} alt="" />
      </div>
      <div className=" w-full flex flex-col justify-between p-10 border-l">
        <div className=" flex flex-col w-full">
          <h3 className=" font-semibold border  italic bg-violet-400 rounded-lg m-1 text-white p-2">
            {house.Name}
          </h3>
          <h3 className=" font-semibold border  italic bg-violet-400 rounded-lg m-1 text-white p-2">
            {house.Type}
          </h3>
          <h3 className=" font-semibold border  italic bg-violet-400 rounded-lg m-1 text-white p-2">
            {house.Country}
          </h3>
        </div>
        <h2 className="font-semibold border text-end italic bg-violet-400 rounded-lg m-1 text-white p-2">
          {house.Price} TL
        </h2>
      </div>
    </div>
  );
};

export default HouseItem;
