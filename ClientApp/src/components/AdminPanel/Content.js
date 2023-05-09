/** @format */

import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HouseItem from "./HouseItem";
import Modal from "./Modal";
import { AdminContext } from "./AdminContext";

const Content = () => {
  const { houses } = useContext(AdminContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHouse, setCurrentHouse] = useState();
  const onUpdate = () => toast("Ev Guncellendi!");
  const onDelete = () => toast("Ev Silindi");

  const onHouseItemClick = (id) => {
    const selectedHouse = houses.filter((house) => house.Id === id);
    setCurrentHouse(selectedHouse);
    setIsModalOpen(true);
  };

  return (
    <div className=" bg-gray-100 border-l border-gray-200 w-full">
      <ToastContainer />
      <div className=" m-5">
        <h1 className=" mx-auto  bg-violet-600 text-white  flex justify-center items-center font-semibold h-[70px] italic text-2xl">
          Kayitli tum evler
        </h1>
      </div>
      <div className="p-5">
        {houses &&
          houses.map((house, index) => (
            <HouseItem
              key={index}
              onCLick={() => {
                onHouseItemClick(house.Id);
              }}
              house={house}
            />
          ))}
      </div>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          house={currentHouse}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default Content;
