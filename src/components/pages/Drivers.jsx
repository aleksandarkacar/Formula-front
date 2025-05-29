import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByNationality } from "../getFlagCode";
import { Trophy } from "lucide-react";
import getPositionColor from "../getPositionColor.jsx";

export default function Drivers({
  selectedYear,
  countryList,
  setSelectedYear,
}) {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear() - 1;
  const allYears = Array.from({ length: 25 }, (_, i) => currentYear - i);

  useEffect(() => {
    setIsLoading(true);
    getDrivers();
  }, [selectedYear]);

  const getDrivers = async () => {
    const url = `http://ergast.com/api/f1/${selectedYear}/driverStandings.json`;
    console.log(url);
    const response = await axios.get(url);
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
      <div className="wrapped-title-seasons">
        <div className="menu-wrapper">
          <div className="title">
            <h1>
              <Trophy className="color-primary title-icon" />
              Drivers Championship Standings {selectedYear}
            </h1>
          </div>
          <div className="">
            <div className="subtitle">
              <h3>Full breakdown of drivers, points and current positions</h3>
            </div>
          </div>
        </div>
        <div className="seasons">
          <Trophy />
          <select
            onChange={(e) => setSelectedYear(e.target.value)}
            value={selectedYear}
          >
            {allYears.map((year) => {
              return (
                <option key={year} value={year}>
                  Seasons {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <br />
      <br />
      <table className="table">
        <tbody className="table-head">
          {drivers.map((driver, i) => {
            let flag = getAlpha2ByNationality(
              countryList,
              driver.Driver.nationality
            );
            return (
              <tr key={driver.Driver.driverId}>
                <td>
                  <div
                    className="position-default"
                    style={getPositionColor(i + 1)}
                  >
                    {driver.position}
                  </div>
                </td>

                <td>
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
