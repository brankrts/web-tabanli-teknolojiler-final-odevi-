/** @format */

import React, { useContext } from "react";
import { AdminContext } from "./AdminContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Reservations = () => {
  const { reservations, setReservations } = useContext(AdminContext);
  const onRead = () => toast("Rezervasyon okundu olarak isaretlendi");
  const handleDelete = (id) => {
    axios
      .delete(`https://localhost:7161/Reservation/DeleteReservation/${id}`)
      .then(() => {
        const updatedReservations = reservations.filter(
          (reservation) => reservation.Id !== id
        );
        setReservations(updatedReservations);
        onRead();
      });
  };
  const handlePdfReport = () => {
    axios({
      url: "https://localhost:7161/Pdf/DownloadPdf",
      method: "GET",
      responseType: "blob", // yanıt türünü "blob" olarak ayarlayın
    }).then((response) => {
      // İndirilen dosyayı File nesnesine dönüştürün
      const file = new File([response.data], "rezervasyonlar.pdf", {
        type: "application/pdf",
      });

      // Dosyayı indirmek için bir URL oluşturun
      const url = window.URL.createObjectURL(file);

      // URL'yi kullanarak dosyayı indirin
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "rezervasyonlar.pdf");
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div className="border border-violet-300 min-h-[700px] flex flex-col justify-between">
      <div className=" w-full bg-violet-600  text-white h-[50px] flex items-center justify-center">
        <h1 className=" font-semibold italic">Rezervasyonlar</h1>
      </div>
      {reservations &&
        reservations.map((reservation) => {
          return (
            <div
              key={reservation.Id}
              className=" w-full flex flex-col p-6 border shadow-xl bg-white hover:scale-105 transition"
            >
              <h4 className=" font-semibold border text-sm italic bg-violet-400 rounded-lg m-1 text-white p-2 min-h-[40px]">
                {reservation.Name}
              </h4>
              <h4 className=" font-semibold border text-sm  italic bg-violet-400 rounded-lg m-1 text-white p-2 min-h-[40px]">
                {reservation.Email}
              </h4>
              <h4 className=" font-semibold border text-sm  italic bg-violet-400 rounded-lg m-1 text-white p-2 min-h-[40px]">
                {reservation.PhoneNumber}
              </h4>
              <h4 className="font-semibold border  text-sm italic bg-violet-400 rounded-lg m-1 text-white p-2 min-h-[40px]">
                {reservation.Description}
              </h4>
              <button
                onClick={() => {
                  handleDelete(reservation.Id);
                }}
                className=" bg-violet-700 text-white rounded-md mx-5 italic mt-4 hover:bg-violet-900 transition"
              >
                Okundu
              </button>
            </div>
          );
        })}

      <button
        onClick={handlePdfReport}
        className=" bg-violet-700 text-white rounded-md  mt-4 hover:bg-violet-900 transition w-full mb-5"
      >
        Pdf Olustur
      </button>
      <ToastContainer />
    </div>
  );
};

export default Reservations;
