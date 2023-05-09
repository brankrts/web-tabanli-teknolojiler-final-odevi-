/** @format */

import React, { useContext, useState } from "react";

import FormInput from "../FormInput";
import axios from "axios";
import { AdminContext } from "./AdminContext";

const Modal = ({ setIsModalOpen, house, onUpdate, onDelete }) => {
  const { setHouses, houses } = useContext(AdminContext);

  const [currentFormData, setCurrentFormData] = useState({
    Name: house[0].Name,
    Type: house[0].Type,
    Country: house[0].Country,
    Address: house[0].Address,
    Bedrooms: house[0].Bedrooms,
    Bathrooms: house[0].Bathrooms,
    Surface: house[0].Surface,
    Price: house[0].Price,
    Description: house[0].Description,
    Image: null,
  });
  const handleChange = (event) => {
    setCurrentFormData({
      ...currentFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setCurrentFormData({
      ...currentFormData,
      [event.target.name]: event.target.files[0],
    });
  };
  const handleDelete = () => {
    const id = house[0].Id;
    axios
      .delete(`https://localhost:7161/House/DeleteHouse/${id}`)
      .then(() => {
        const newHouses = houses.filter((h) => h.Id !== id);
        setHouses(newHouses);
        onDelete();
        setIsModalOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      Name,
      Country,
      Price,
      Bathrooms,
      Bedrooms,
      Surface,
      Address,
      Image,
      Type,
      Description,
    } = currentFormData;

    const formData = new FormData();
    formData.append("Id", house[0].Id);
    formData.append("Name", Name);
    formData.append("Country", Country);
    formData.append("Price", Price);
    formData.append("Bathrooms", Bathrooms);
    formData.append("Bedrooms", Bedrooms);
    formData.append("Surface", Surface);
    formData.append("Address", Address);
    formData.append("Type", Type);
    formData.append("Description", Description);
    formData.append("Image", Image);

    axios
      .post("https://localhost:7161/House/UpdateHouse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response.data));
    onUpdate();
    setIsModalOpen(false);
  };
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur transition w-full">
      <div className="relative w-full my-6 mx-auto max-w-3xl pt-40">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">Ev Bilgileri</h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setIsModalOpen(false)}
            >
              <span className=" h-8 w-8 text-xl flex items-center justify-center bg-violet-700 text-white py-0 rounded-full ">
                x
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <form
              className="flex flex-col gap-y-4"
              method="post"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <FormInput
                type="text"
                placeholder="Evin ismi"
                name="Name"
                onChange={handleChange}
                value={house.Name}
                defaultValue={house[0].Name}
              />
              <FormInput
                type="text"
                placeholder="Ev tipi"
                name="Type"
                onChange={handleChange}
                defaultValue={house[0].Type}
              />
              <FormInput
                type="text"
                placeholder="Sehir"
                name="Country"
                onChange={handleChange}
                defaultValue={house[0].Country}
              />
              <FormInput
                type="text"
                placeholder="Adres"
                name="Address"
                onChange={handleChange}
                defaultValue={house[0].Address}
              />
              <FormInput
                type="number"
                placeholder="Yatak odasi sayisi"
                name="Bedrooms"
                onChange={handleChange}
                defaultValue={house[0].Bedrooms}
              />
              <FormInput
                type="number"
                placeholder="Banyo sayisi"
                name="Bathrooms"
                onChange={handleChange}
                defaultValue={house[0].Bathrooms}
              />
              <FormInput
                type="text"
                placeholder="Kapladigi Alan"
                name="Surface"
                onChange={handleChange}
                defaultValue={house[0].Surface}
              />
              <FormInput
                type="number"
                placeholder="Fiyati"
                name="Price"
                onChange={handleChange}
                defaultValue={house[0].Price}
              />
              <FormInput
                type="file"
                placeholder="Urun resmi"
                name="Image"
                onChange={handleFileChange}
              />
              <textarea
                className=" border border-gray-300 focus:border-violet-700 outline-none resize-none rounded w-full p-4 h-36 text-sm text-gray-400 focus:text-black"
                placeholder="Urun ile alakali aciklama ekleyiniz."
                name="Description"
                onChange={handleChange}
                defaultValue={house[0].Description}
              ></textarea>
              <input
                type="submit"
                value="Guncelle"
                className=" bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-lg w-full transition cursor-pointer "
              />
            </form>
            <div className="flex p-10 gap-x-4 ">
              <button
                onClick={handleDelete}
                className=" bg-violet-700 hover:bg-violet-800 text-red-600 font-bold rounded text-lg p-4  w-full transition "
              >
                Evi Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
