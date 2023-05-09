/** @format */

import React, { createContext, useEffect, useState } from "react";

import axios from "axios";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState();
  const [filterHouse, setFilterHouse] = useState([]);
  const [country, setCountry] = useState("Konum (Hepsi)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Ev Tipi (Hepsi)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Fiyat Araligi (Hepsi)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://localhost:7161/House/GetHouses").then((response) => {
      setLoading(true);
      setHouses(response.data);
      const allCountries = response.data.map((house) => {
        return house.Country;
      });
      const uniqueCountries = ["Konum (Hepsi)", ...new Set(allCountries)];
      setCountries(uniqueCountries);
      const allProperties = response.data.map((house) => {
        return house.Type;
      });
      const uniqueProperties = ["Ev Tipi (Hepsi)", ...new Set(allProperties)];
      setProperties(uniqueProperties);
      setFilterHouse(response.data);
      setLoading(false);
    });
  }, []);

  const handleClick = () => {
    setFilterHouse(filteredHouses());
  };
  const isDefault = (string) => {
    return string.split(" ").includes("(Hepsi)");
  };
  const parsePrice = (price) => {
    const newPrice = price.split("-");
    const minPrice = parseInt(newPrice[0].trim());
    const maxPrice = parseInt(newPrice[1].trim());

    return { minPrice, maxPrice };
  };

  const filteredHouses = () => {
    const filteredHouses = houses.filter((house) => {
      const { minPrice, maxPrice } = isDefault(price)
        ? { minPrice: 0, maxPrice: Number.MAX_SAFE_INTEGER }
        : parsePrice(price);

      if (isDefault(country) && isDefault(property)) {
        if (
          parseInt(house.Price) >= minPrice &&
          parseInt(house.Price) <= maxPrice
        ) {
          return house;
        }
      }
      if (!isDefault(country) && isDefault(property)) {
        if (
          house.Country === country &&
          parseInt(house.Price) >= minPrice &&
          parseInt(house.Price) <= maxPrice
        ) {
          return house;
        }
      }
      if (isDefault(country) && !isDefault(property)) {
        if (
          house.Type === property &&
          parseInt(house.Price) >= minPrice &&
          parseInt(house.Price) <= maxPrice
        ) {
          return house;
        }
      }

      if (!isDefault(country) && !isDefault(property)) {
        if (
          parseInt(house.price) >= minPrice &&
          parseInt(house.price) <= maxPrice &&
          house.type === property &&
          house.country === country
        ) {
          return house;
        }
      }
      return null;
    });
    return filteredHouses;
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
        filterHouse,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
