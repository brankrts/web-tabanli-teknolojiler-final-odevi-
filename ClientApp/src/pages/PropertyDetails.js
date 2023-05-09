/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import ProfilePicture from "../assets/img/profilePicture.png";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import axios from "axios";
import CircularProgressIndicator from "../components/CircularProgressIndicator";

const PropertyDetails = () => {
  const [house, setHouse] = useState();
  const [formData, setFormData] = useState({
    Name: "Bilinmiyor",
    Email: "example@gmail.com",
    Description: "Eviniz ile ilgilenmekteyim.",
  });
  const [phone, setPhone] = useState();
  const onReservationAdded = (message) => toast(message);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = new FormData();
    postData.append("HouseName", house.Name);
    postData.append("Email", formData.Email);
    postData.append("PhoneNumber", phone);
    postData.append("Description", formData.Description);
    postData.append("Name", formData.Name);

    axios
      .post("https://localhost:7161/Reservation/AddReservation", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response.data))
      .then(() => {
        onReservationAdded("Reservation Isleminiz Gerceklestirildi.");
      })
      .catch((error) => {
        onReservationAdded("Reservasyon Isleminiz Gerceklestirilemedi.");
      });
  };

  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://localhost:7161/House/GetByID/${id}`).then((response) => {
      setHouse(response.data);
    });
  }, [id]);

  return (
    <section>
      <div className=" container mx-auto min-h-[800px] mb-14">
        {house !== undefined ? (
          <>
            <ToastContainer />
            <div className=" flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className=" text-2xl font-semibold">{house.Name}</h2>
                <h3 className=" text-lg mb-4">{house.Address}</h3>
              </div>
              <div className=" mb-4 lg:mb-0 flex gap-x-2 text-sm">
                <div className=" bg-green-500 text-white px-3 rounded-full">
                  {house.Type}
                </div>
                <div className=" bg-violet-500 text-white px-3 rounded-full">
                  {house.Country}
                </div>
              </div>
              <div className=" text-3xl font-semibold text-violet-600 mb-4 lg:mb-0">
                {house.Price}TL
              </div>
            </div>
            <div className=" flex flex-col items-start gap-8 lg:flex-row">
              <div className=" max-w-[768px]">
                <div className=" mb-8">
                  <img src={house.Image} alt="" />
                </div>
                <div className=" flex gap-x-6 text-violet-700 mb-6 ">
                  <div className="flex gap-x-2 items-center ">
                    <BiBed className=" text-2xl" />
                    <div>{house.Bedrooms}</div>
                  </div>
                  <div className="flex gap-x-2 items-center ">
                    <BiBath className=" text-2xl" />
                    <div>{house.Bathrooms}</div>
                  </div>
                  <div className="flex gap-x-2 items-center ">
                    <BiArea className=" text-2xl" />
                    <div>{house.Surface}</div>
                  </div>
                </div>
                <div>{house.Description}</div>
              </div>
              <div className=" flex-1 bg-white w-full mb-8 border border-gray-300 rounded-lg px-6 py-8 ">
                <div className=" flex items-center gap-x-4 mb-8">
                  <div className=" w-20 h-20 p-1 border border-gray-300 rounded-full">
                    <img src={ProfilePicture} alt="" />
                  </div>
                  <div className=" font-bold text-lg ">
                    <div>Baran Karatas</div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                  <input
                    className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm focus:text-black text-gray-400"
                    type="text"
                    placeholder="Isim ve Soyisim"
                    name="Name"
                    onChange={handleChange}
                  />
                  <input
                    className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm focus:text-black text-gray-400"
                    type="email"
                    placeholder="Email"
                    required
                    name="Email"
                    onChange={handleChange}
                  />
                  <PhoneInput
                    onChange={setPhone}
                    className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm focus:text-black text-gray-400"
                  />
                  <textarea
                    className=" border border-gray-300 focus:border-violet-700 outline-none resize-none rounded w-full p-4 h-36 text-sm text-gray-400 focus:text-black"
                    placeholder="Aciklama"
                    defaultValue="Eviniz ile ilgilenmekteyim."
                    required
                    onChange={handleChange}
                    name="Description"
                  ></textarea>

                  <input
                    type="submit"
                    value="Rezervasyon istegi gonder"
                    className=" bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition cursor-pointer "
                  />
                </form>
              </div>
            </div>
          </>
        ) : (
          <CircularProgressIndicator />
        )}
      </div>
    </section>
  );
};

export default PropertyDetails;
