/** @format */

import React, { useState } from "react";
import FormInput from "../FormInput";
import axios from "axios";

const AdminAddPanel = () => {
  const [currentFormData, setCurrentFormData] = useState({
    Name: "",
    Type: "",
    Country: "",
    Address: "",
    Bedrooms: 0,
    Bathrooms: 0,
    Surface: 0,
    Price: 0,
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
    console.log(formData.get("Image"));
    axios
      .post("https://localhost:7161/House/AddHouse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response.data));
  };
  return (
    <div className=" min-h-[900px]">
      <div className="container mx-auto">
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
          />
          <FormInput
            type="text"
            placeholder="Ev tipi"
            name="Type"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            placeholder="Sehir"
            name="Country"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            placeholder="Adres"
            name="Address"
            onChange={handleChange}
          />
          <FormInput
            type="number"
            placeholder="Yatak odasi sayisi"
            name="Bedrooms"
            onChange={handleChange}
          />
          <FormInput
            type="number"
            placeholder="Banyo sayisi"
            name="Bathrooms"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            placeholder="Kapladigi Alan"
            name="Surface"
            onChange={handleChange}
          />
          <FormInput
            type="number"
            placeholder="Fiyati"
            name="Price"
            onChange={handleChange}
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
          ></textarea>
          <button className=" bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition ">
            Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddPanel;
