import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByNationality } from "../getFlagCode";
import { Building2 } from "lucide-react";
import getPositionColor from "../getPositionColor.jsx";
import ShowError from "../ShowError.jsx";

export default function Teams({ selectedYear, countryList }) {
  const [teams, setTeams] = useState({});
  const [loader, setLoader] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setLoader(true);
    getTeams();
  }, [selectedYear]);

  const getTeams = async () => {
    try {
      const url =
        "http://ergast.com/api/f1/" +
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
        <br />
        <br />
        <br />
        <table className="table">
          <tbody>
            {teams.map((team, i) => {
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
