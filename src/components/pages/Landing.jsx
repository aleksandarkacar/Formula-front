import React from "react";
import styles from "../../../../Formula-front/src/styles/components/landingPage.scss";
// import Loader from "../Loader";

export default function Landing() {
  return (
    <div>
      <video
        autoPlay
        muted
        loop
        className="landing-video"
      >
        <source src={"/video/landing-page-video.mp4"} />
      </video>
    </div>
  );
}
