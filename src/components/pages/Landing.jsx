import React from "react";
import styles from '../../../../Formula-front/src/styles/components/landingPage.scss'
// import Loader from "../Loader";

export default function Landing() {
  return (
    <div>
        <video autoPlay muted loop width="100%" height="100%" controls>
          <source src={'/video/landing-page-video.mp4'}/>
        </video>
    </div>
  );
}
