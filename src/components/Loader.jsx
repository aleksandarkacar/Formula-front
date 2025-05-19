import { RotateLoader } from "react-spinners";

export default function Loader({ isLoading }) {
  return (
    <div className="loader-container">
      <RotateLoader color={"#cc4397"} loading={isLoading} />
    </div>
  );
}