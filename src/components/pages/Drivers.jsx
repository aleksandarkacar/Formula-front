import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByNationality } from "../getFlagCode";
import { Trophy } from "lucide-react";
import getPositionColor from "../getPositionColor.jsx";
import ShowError from "../ShowError.jsx";

export default function Drivers({
  selectedYear,
  countryList,
  setSelectedYear,
  searchInput,
}) {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear() - 1;
  const allYears = Array.from({ length: 25 }, (_, i) => currentYear - i);
  const [err, setErr] = useState(false);

  // Logic on this page for the filter
  const filteredData = drivers.filter((item) => {
    if (searchInput == "") {
      console.log("item", item);
      return item;
    } else {
      return (
        item.Driver.familyName
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        item.Driver.givenName
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        item.Constructors[0].name
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    }
  });

  useEffect(() => {
    setIsLoading(true);
    getDrivers();
  }, [selectedYear]);

  useEffect(() => {}, [filteredData]);

  const getDrivers = async () => {
    try {
      const url = `http://ergast.com/api/f1/${selectedYear}/driverStandings.json`;
      console.log(url);
      const response = await axios.get(url);
      setDrivers(
        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
      );
    } catch (error) {
      console.log("error", error);
      setErr(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (err) {
    return <ShowError err={err} />;
  }

  return (
    <div className="table-wrapper">
      <br />
      <div className="wrapped-title-seasons">
        <div>
          <div className="title">
            <h1>
              <Trophy className="color-primary title-icon" />
              Drivers Championship Standings {selectedYear}
            </h1>
          </div>
          <div>
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
          {filteredData.map((driver, i) => {
            let flag = getAlpha2ByNationality(
              countryList,
              driver.Driver.nationality
            );
            return (
              <tr key={driver.Driver.driverId}>
                <td>
                  <div
                    className="position-default"
                    style={getPositionColor(driver.position)}
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
