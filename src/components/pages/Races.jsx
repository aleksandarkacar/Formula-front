import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByCountryName, getAlpha2ByNationality } from "../getFlagCode";

export default function Races({ countryList }) {
  const [races, setRaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRaces();
  }, []);

  const getRaces = async () => {
    const url = "http://ergast.com/api/f1/2013/results/1.json";
    const response = await axios.get(url);
    // console.log(response.data.MRData.RaceTable.Races);

    setRaces(response.data.MRData.RaceTable.Races);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="table-wrapper">
      <br />
      <h1>Race Calendar - 2013.</h1>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Round</th>
            <th>Grand Prix</th>
            <th>Circuit</th>
            <th>Date</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race, i) => {
            return (
              <tr key={race.round}>
                <td>{race.round}</td>
                <td className="just-left">
                  <Flag
                    className="flagg"
                    country={getAlpha2ByCountryName(
                      countryList,
                      race.Circuit.Location.country
                    )}
                  />
                  <Link to={"/races/" + race.round}>{race.raceName}</Link>
                </td>
                <td>{race.Circuit.circuitName}</td>
                <td>{race.date}</td>
                <td className="just-left">
                  <Flag
                    className="flagg"
                    country={getAlpha2ByNationality(
                      countryList,
                      race.Results[0].Driver.nationality
                    )}
                  />{" "}
                  <Link to={"/" + race.Results[0].Driver.driverId}>
                    {race.Results[0].Driver.familyName}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
