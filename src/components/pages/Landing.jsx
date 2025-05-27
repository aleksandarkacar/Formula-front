import React from "react";
import styles from "../../../../Formula-front/src/styles/components/landingPage.scss";
// import Loader from "../Loader";

export default function Landing() {
  return (
    <div>
        <iframe 
        className="landing-video"   
        autoPlay
        muted
        loop
        src="https://cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DTOeVJcrcB_o&key=925108d922be940af814f71907a7df4b"></iframe>
    </div>
  );
}
