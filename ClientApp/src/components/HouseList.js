/** @format */

import React, { useContext } from "react";
import { HouseContext } from "./HouseContext";
import House from "./House";
import { Link } from "react-router-dom";
import CircularProgressIndicator from "./CircularProgressIndicator";

const HouseList = () => {
  const { filterHouse, loading } = useContext(HouseContext);
  if (loading) {
    return <CircularProgressIndicator />;
  }
  if (filterHouse?.length < 1) {
    return (
      <div className=" text-center text-3xl text-gray-400 mt-48">
        Sorry, nothing found
      </div>
    );
  }
  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
          {filterHouse &&
            filterHouse.map((house, index) => {
              return (
                <Link to={`/property/${house.Id}`} key={index}>
                  <House house={house} />
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
