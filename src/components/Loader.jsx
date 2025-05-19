import React from "react";
import { RotateLoader } from "react-spinners";

export default function Loader({ isLoading }) {
  return (
    <div className="loader-container">
      <RotateLoader color={"#cc4397"} size={150} loading={isLoading} />
    </div>
  );
}