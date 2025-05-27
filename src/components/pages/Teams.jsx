import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByNationality } from "../getFlagCode";
import { Building2 } from "lucide-react";

export default function Teams({ countryList }) {
  const [teams, setTeams] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = async () => {
    const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
    // 'http://ergast.com/api/f1/2013/constructors/' + id + '/constructorStandings.json'

    const response = await axios.get(url);
    // console.log(response.data);

    setTeams(
      response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
    );
    // console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)

    setLoader(false);
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div>
      <div className="table-wrapper">
        <br />
        <div className="title">
          <h1>
            <Building2 className="title-icon color-primary" />
            Constructors Championship Standings - 2013.
          </h1>
        </div>
        <br />
        <br />
        <br />
        <table className="table">
          <tbody>
            {teams.map((team) => {
              return (
                <tr key={team.positionText}>
                  <td>
                    <div className="first">{team.positionText}</div>
                  </td>
                  <td className="just-left">
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
