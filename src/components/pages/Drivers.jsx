import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByNationality } from "../getFlagCode";
import { Trophy } from "lucide-react";

export default function Drivers({ countryList }) {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const url = "http://ergast.com/api/f1/2013/driverStandings.json";
    const response = await axios.get(url);
    // const data =
    //   response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    // console.log(data)
    setDrivers(
      response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    );
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="table-wrapper">
      <br />
      <div className="title">
        <h1>
          <Trophy className="color-primary title-icon" />
          Drivers Championship Standings 2013.
        </h1>
      </div>
      <br />
      <br />
      <table className="table">
        <tbody className="table-head">
          {drivers.map((driver) => {
            return (
              <tr key={driver.Driver.driverId}>
                <td>
                  <div className="first">{driver.position}</div>
                </td>
                {/* <td>{driver.Driver.nationality}</td> */}

                <td>
                  <div className="flag-name">
                    <Flag
                      className="flagg"
                      country={getAlpha2ByNationality(
                        countryList,
                        driver.Driver.nationality
                      )}
                    />
                    <Link to={driver.Driver.driverId}>
                      {driver.Driver.givenName} {driver.Driver.familyName}
                    </Link>
                  </div>
                </td>
                <td>
                  <Link
                    to={"/teams/" + driver.Constructors[0].constructorId}
                    className="just-left"
                  >
                    {driver.Constructors[0].name}
                  </Link>
                </td>
                <td>{driver.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
