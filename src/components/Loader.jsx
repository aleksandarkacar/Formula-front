import { RotateLoader } from "react-spinners";

export default function Loader({ isLoading }) {
  return (
    <div className="loader-container">
      <RotateLoader color="#dc2828" loading={isLoading} />
    </div>
  );
}
