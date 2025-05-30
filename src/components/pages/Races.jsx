import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByCountryName, getAlpha2ByNationality } from "../getFlagCode";
import { CalendarDays } from "lucide-react";
import ShowError from "../ShowError";
import { Trophy } from "lucide-react";

export default function Races({
  searchInput,
  setSelectedYear,
  selectedYear,
  countryList,
}) {
  const [races, setRaces] = useState([]);
  const currentYear = new Date().getFullYear() - 1;
  const allYears = Array.from({ length: 25 }, (_, i) => currentYear - i);

  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);

  // Logic on this page for the filter
  const filteredData = races.filter((item) => {
    if (searchInput == "") {
      console.log("item", item);
      return item;
    } else {
      return (
        item.raceName.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.Circuit.circuitName
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        item.Results[0].Driver.familyName
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    }
  });

  useEffect(() => {
    setIsLoading(true);
    getRaces();
  }, [selectedYear]);

  const getRaces = async () => {
    try {
      const url =
        "http://ergast.com/api/f1/" + selectedYear + "/results/1.json";
      const response = await axios.get(url);

      setRaces(response.data.MRData.RaceTable.Races);
    } catch (error) {
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
        <div className="title">
          <div>
            <h1>
              <CalendarDays className="color-primary title-icon" />
              Race Calendar - {selectedYear}
            </h1>
            <div className="subtitle">
              <h3>All information for the curent year</h3>
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
        <thead>
          <tr className="no-hover">
            <th style={{ width: "10%" }}>Round</th>
            <th style={{ width: "30%" }}>Grand Prix</th>
            <th style={{ width: "30%" }}>Circuit</th>
            <th style={{ width: "10%" }}>Date</th>
            <th style={{ width: "20%" }}>Winner</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((race, i) => {
            return (
              <tr key={race.round}>
                <td>
                  <div>{race.round}</div>
                </td>
                <td className="just-left">
                  <div className="flag-name">
                    <Flag
                      className="flagg"
                      country={getAlpha2ByCountryName(
                        countryList,
                        race.Circuit.Location.country
                      )}
                    />
                    <Link to={"/races/" + race.round}>{race.raceName}</Link>
                  </div>
                </td>
                <td>{race.Circuit.circuitName}</td>
                <td>{race.date}</td>
                <td className="just-left">
                  <div className="flag-name">
                    <Flag
                      className="flagg"
                      country={getAlpha2ByNationality(
                        countryList,
                        race.Results[0].Driver.nationality
                      )}
                    />{" "}
                    <Link to={"/drivers/" + race.Results[0].Driver.driverId}>
                      {race.Results[0].Driver.familyName}
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
