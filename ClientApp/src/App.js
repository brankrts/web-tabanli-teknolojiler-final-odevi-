/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import AdminPanel from "./pages/AdminPanel";
import AdminAddPanel from "./components/AdminPanel/AdminAddPanel";

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto bg-white ">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/admin-panel/add-house" element={<AdminAddPanel />} />
        <Route path="/admin-panel/all-houses" element={<AdminPanel />} />
        <Route path="/admin-panel/reservations" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
