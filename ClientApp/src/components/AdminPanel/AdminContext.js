/** @format */

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [houses, setHouses] = useState();
  const [reservations, setReservations] = useState();

  useEffect(() => {
    axios
      .get("https://localhost:7161/House/GetHouses")
      .then((response) => setHouses(response.data));
    axios
      .get("https://localhost:7161/Reservation/GetReservations")
      .then((response) => {
        setReservations(response.data);
      });
  }, []);
  return (
    <AdminContext.Provider
      value={{ houses, setHouses, reservations, setReservations }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
