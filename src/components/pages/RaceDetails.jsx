import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByCountryName, getAlpha2ByNationality } from "../getFlagCode";
import { MapPin } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { FileSpreadsheet } from "lucide-react";

export default function RaceDetails({ countryList }) {
  const [qualifs, setQualifs] = useState({});
  const [raceResults, setRaceResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  // console.log(params.id);

  useEffect(() => {
    getQualifs();
  }, []);

  // const getGPDetails = async () => {
  //     const url = ""
  // }

  const getQualifs = async () => {
    const url =
      "http://ergast.com/api/f1/2013/" + params.id + "/qualifying.json";
    const url2 = "http://ergast.com/api/f1/2013/" + params.id + "/results.json";

    const response = await axios.get(url);
    const response2 = await axios.get(url2);

    // console.log("Qualifs", response.data.MRData.RaceTable.Races[0].QualifyingResults);
    setQualifs(response.data.MRData.RaceTable.Races[0].QualifyingResults);

    // console.log("getRaceResults", response2.data.MRData.RaceTable.Races[0]);
    setRaceResults(response2.data.MRData.RaceTable.Races[0]);

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="page-wrapper">
      <div className="card-wrapper">
        <div className="card">
          <h3 className="title">Race Calendar</h3>
          <div className="subtitle">{raceResults.raceName}</div>
          <div className="card-content">
            <Flag
              size={"100px"}
              country={getAlpha2ByCountryName(
                countryList,
                raceResults.Circuit.Location.country
              )}
              className="logo"
              alt="country-flag"
            />
            <div className="menu-wrapper">
              <div className="menu-row">
                <div className="subMenu">
                  <div className="menu-title">
                    <h3>Location:</h3>
                    <div className="color-primary">
                      <MapPin className="icon" />
                    </div>
                  </div>
                  <div className="mini-text-below">
                    {raceResults.Circuit.Location.country}
                  </div>
                </div>
                <div className="subMenu">
                  <div className="menu-title">
                    <h3>Date:</h3>
                    <div className="color-primary">
                      <CalendarDays className="icon" />
                    </div>
                  </div>
                  <div className="mini-text-below">{raceResults.date}</div>
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
          <h1>Qualifying results</h1>

          <table className="tabelus">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Best time</th>
              </tr>
            </thead>
            <tbody>
              {qualifs.map((qualif, i) => {
                let fastestTime = "";
                if (qualif.Q3) {
                  fastestTime = qualif.Q3;
                } else if (qualif.Q2) {
                  fastestTime = qualif.Q2;
                } else {
                  fastestTime = qualif.Q1;
                }
                return (
                  <tr key={i}>
                    <td>{qualif.position}</td>
                    <td>
                      <Flag
                        country={getAlpha2ByNationality(
                          countryList,
                          qualif.Driver.nationality
                        )}
                      />
                      <Link to={"/" + qualif.Driver.driverId}>
                        {qualif.Driver.familyName}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/teams/" + qualif.Constructor.constructorId}>
                        {qualif.Constructor.name}
                      </Link>
                    </td>
                    <td>{fastestTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-wrapper">
          <h1>Race results</h1>

          <table className="tabelus">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Result</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody>
              {raceResults.Results.map((raceResult, i) => {
                return (
                  <tr key={i}>
                    <td>{raceResult.position}</td>
                    <td>
                      <Flag
                        country={getAlpha2ByNationality(
                          countryList,
                          raceResult.Driver.nationality
                        )}
                      />
                      <Link to={"/" + raceResult.Driver.driverId}>
                        {raceResult.Driver.familyName}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={"/teams/" + raceResult.Constructor.constructorId}
                      >
                        {raceResult.Constructor.name}
                      </Link>
                    </td>
                    <td>
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
