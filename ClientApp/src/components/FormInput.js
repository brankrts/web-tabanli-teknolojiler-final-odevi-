/** @format */

import React from "react";

const FormInput = ({ type, placeholder, onChange, name, defaultValue }) => {
  return (
    <input
      className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm focus:text-black text-gray-400"
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      defaultValue={defaultValue}
      required
    />
  );
};

export default FormInput;
