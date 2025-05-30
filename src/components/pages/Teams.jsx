import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByNationality } from "../getFlagCode";
import { Building2 } from "lucide-react";
import getPositionColor from "../getPositionColor.jsx";
import { Trophy } from "lucide-react";
import ShowError from "../ShowError.jsx";

export default function Teams({
  searchInput,
  setSelectedYear,
  selectedYear,
  countryList,
}) {
  const [teams, setTeams] = useState([]);
  const [loader, setLoader] = useState(true);
  const currentYear = new Date().getFullYear() - 1;
  const allYears = Array.from({ length: 25 }, (_, i) => currentYear - i);
  const [err, setErr] = useState(false);

  const filteredData = teams.filter((item) => {
    if (searchInput == "") {
      return item;
    } else {
      return item.Constructor.name
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    }
  });

  useEffect(() => {
    setLoader(true);
    getTeams();
  }, [selectedYear]);

  const getTeams = async () => {
    try {
      const url =
        "https://ergast.com/api/f1/" +
        selectedYear +
        "/constructorStandings.json";

      const response = await axios.get(url);

      setTeams(
        response.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings
      );
    } catch (error) {
      setErr(error);
    } finally {
    }

    setLoader(false);
  };

  if (loader) {
    return <Loader />;
  }

  if (err) {
    return <ShowError err={err} />;
  }

  return (
    <div>
      <div className="table-wrapper">
        <br />
        <div className="wrapped-title-seasons">
          <div className="title">
            <div>
              <h1>
                <Building2 className="title-icon color-primary" />
                Constructors Championship Standings - {selectedYear}
              </h1>

              <div className="subtitle">
                <h3>Champion standing for the year</h3>
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
        <br />
        <table className="table">
          <tbody>
            {filteredData.map((team, i) => {
              return (
                <tr key={team.positionText}>
                  <td>
                    <div
                      className="position-default"
                      style={getPositionColor(i + 1)}
                    >
                      {team.positionText}
                    </div>
                  </td>
                  <td className="just-left">
                    <div className="flag-name">
                      <Flag
                        className="flagg"
                        country={getAlpha2ByNationality(
                          countryList,
                          team.Constructor.nationality
                        )}
                      />
                      <Link to={team.Constructor.constructorId}>
                        {team.Constructor.name}
                      </Link>
                    </div>
                  </td>
                  <td>
                    <Link target="_blank" to={team.Constructor.url}>
                      Details
                    </Link>
                  </td>
                  <td>{team.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
