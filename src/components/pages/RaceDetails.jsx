import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByCountryName, getAlpha2ByNationality } from "../getFlagCode";
import {
  FlagTriangleRight,
  Timer,
  FileSpreadsheet,
  CalendarDays,
  MapPin,
  TableOfContents,
} from "lucide-react";
import getPositionColor from "../getPositionColor.jsx";

export default function RaceDetails({ selectedYear, countryList }) {
  const [qualifs, setQualifs] = useState([]);
  const [raceResults, setRaceResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [raceFlag, setRaceFlag] = useState("");
  const params = useParams();
  // console.log(params.id);

  useEffect(() => {
    setIsLoading(true);
    getQualifs();
  }, [selectedYear]);

  const getQualifs = async () => {
    const url =
      "http://ergast.com/api/f1/" +
      selectedYear +
      "/" +
      params.id +
      "/qualifying.json";
    const url2 =
      "http://ergast.com/api/f1/" +
      selectedYear +
      "/" +
      params.id +
      "/results.json";

    const response = await axios.get(url);
    const response2 = await axios.get(url2);

    setQualifs(response.data.MRData.RaceTable.Races[0].QualifyingResults);

    setRaceResults(response2.data.MRData.RaceTable.Races[0]);

    setRaceFlag(
      getAlpha2ByCountryName(
        countryList,
        response2.data.MRData.RaceTable.Races[0].Circuit.Location.country
      )
    );

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="page-wrapper">
      <div className="card-wrapper">
        <div className="card">
          <h1 className="title">
            <FlagTriangleRight className="idCard color-primary" />
            Race Calendar
          </h1>
          <div className="subtitle">{raceResults.raceName}</div>
          <div className="card-content">
            {raceFlag ? (
              <Flag className="flagg" country={(countryList, raceFlag)} />
            ) : (
              <img
                src="/img/flags.jpg"
                style={{ width: "100px", marginBottom: "15px" }}
                alt="Flag placeholder"
              />
            )}

            <div className="menu-wrapper">
              <div className="menu-row">
                <div className="subMenu">
                  <div className="menu-title subtitle">
                    <div>Location</div>
                    <div className="color-primary smallIcon">
                      <MapPin className="icon" />
                    </div>
                  </div>
                  <div className="mini-text-below menu-title">
                    {raceResults.Circuit.Location.country}
                  </div>
                </div>
                <div className="subMenu">
                  <div className="menu-title subtitle">
                    <h3>Date </h3>
                    <div className="color-primary smallIcon">
                      <CalendarDays className="icon" />
                    </div>
                  </div>
                  <div className="mini-text-below menu-title">
                    {raceResults.date}
                  </div>
                </div>
              </div>
            </div>
            <div className="menu-wrapper">
              <div className="subMenu">
                <h3 className="menu-title">
                  <Link target="_blank" to={raceResults.url}>
                    Full Report
                  </Link>
                  <div className="color-primary">
                    <FileSpreadsheet className="icon" />
                  </div>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <br />
          <div className="title">
            <h1>
              <Timer className="color-primary title-icon" />
              Qualifying results
            </h1>
          </div>
          <br />
          <br />
          <table className="table">
            <thead className="table-head">
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Best time</th>
              </tr>
            </thead>
            <tbody>
              {qualifs.map((qualif, i) => {
                let qflag = getAlpha2ByNationality(
                  countryList,
                  qualif.Driver.nationality
                );
                let fastestTime = "";
                if (qualif.Q3) {
                  fastestTime = qualif.Q3;
                } else if (qualif.Q2) {
                  fastestTime = qualif.Q2;
                } else {
                  fastestTime = qualif.Q1;
                }
                return (
                  <tr key={qualif.position}>
                    <td>
                      <div
                        className="position-default"
                        style={getPositionColor(i + 1)}
                      >
                        {qualif.position}
                      </div>
                    </td>
                    <td className="just-left">
                      {qflag ? (
                        <Flag className="flagg" country={qflag} />
                      ) : (
                        <img
                          src="/img/flags.jpg"
                          style={{ width: "24px", marginRight: "10px" }}
                          alt="Flag placeholder"
                        />
                      )}
                      <Link to={"/" + qualif.Driver.driverId}>
                        {qualif.Driver.familyName}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/teams/" + qualif.Constructor.constructorId}>
                        {qualif.Constructor.name}
                      </Link>
                    </td>
                    <td className="just-center">{fastestTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-wrapper">
          <br />
          <div className="title">
            <h1>
              <TableOfContents className="color-primary title-icon" />
              Race results
            </h1>
          </div>
          <br />
          <br />
          <table className="table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Result</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody className="table-head">
              {raceResults.Results.map((raceResult, i) => {
                let flag = getAlpha2ByNationality(
                  countryList,
                  raceResult.Driver.nationality
                );
                return (
                  <tr key={raceResult.position}>
                    <td>
                      <div
                        className="position-default"
                        style={getPositionColor(i + 1)}
                      >
                        {raceResult.position}
                      </div>
                    </td>
                    <td className="just-left">
                      <div className="flag-name">
                        {flag ? (
                          <Flag className="flagg" country={flag} />
                        ) : (
                          <img
                            src="/img/flags.jpg"
                            style={{ width: "24px", marginRight: "10px" }}
                            alt="Flag placeholder"
                          />
                        )}
                        {/* <Flag className="flagg" country={flag} /> */}
                        <Link to={"/" + raceResult.Driver.driverId}>
                          {raceResult.Driver.familyName}
                        </Link>
                      </div>
                    </td>
                    <td>
                      <Link
                        className="just-left"
                        to={"/teams/" + raceResult.Constructor.constructorId}
                      >
                        {raceResult.Constructor.name}
                      </Link>
                    </td>
                    <td className="just-left">
                      {raceResult.Time
                        ? raceResult.Time.time
                        : raceResult.status}
                    </td>
                    <td>{raceResult.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
