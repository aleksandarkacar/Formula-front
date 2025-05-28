import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../Loader";
import axios from "axios";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByCountryName, getAlpha2ByNationality } from "../getFlagCode";
import { TrendingUp } from "lucide-react";
import "../../styles/components/detailsCard.scss";
import {
  Building2,
  Calendar1,
  Earth,
  ExternalLink,
  Trophy,
} from "lucide-react";
import getPositionColor from "../getPositionColor.jsx";

export default function TeamDetails({ selectedYear, countryList }) {
  const params = useParams();

  const [teamDetails, setTeamDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState([]);

  useEffect(() => {
    setLoader(true);
    getResult();
  }, [selectedYear]);

  const getResult = async () => {
    const url =
      "http://ergast.com/api/f1/" +
      selectedYear +
      "/constructors/" +
      params.id +
      "/constructorStandings.json";
    const url2 =
      "http://ergast.com/api/f1/" +
      selectedYear +
      "/constructors/" +
      params.id +
      " /results.json";

    const response = await axios.get(url);
    const response2 = await axios.get(url2);

    // console.log("getTeamDetails", response.data);
    // console.log("getResults", response2.data.MRData.RaceTable.Races);

    setTeamDetails(
      response.data.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings[0]
    );
    setResult(response2.data.MRData.RaceTable.Races);
    setLoader(false);
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="page-wrapper">
      <div className="card-wrapper">
        <div className="card">
          <h1 className="title">
            <Building2 className="idCard largeIcon color-primary" /> Team
            Profile
          </h1>
          <h2 className="subtitle">Team information and statistics</h2>
          <div>
            <img
              className="logo"
              src={`/img/teams/${params.id}.png`}
              // alt={teamDetails.Constructor.code}
              onError={(e) => {
                e.target.src = "/img/teams/logo2.png";
                e.onerror = null;
              }}
            />
            <div className="name">{teamDetails.Constructor.name}</div>
          </div>
          <div className="menu-wrapper">
            <div>
              <div>
                <div className="menu-row">
                  <div className="subMenu">
                    <div className="menu-title">
                      <div>Nationality</div>
                      <div className="color-primary">
                        <Earth className="icon" />
                      </div>
                    </div>
                    <div className="menu-title">
                      <div>{teamDetails.Constructor.nationality}</div>
                      <Flag
                        className="flag"
                        country={getAlpha2ByNationality(
                          countryList,
                          teamDetails.Constructor.nationality
                        )}
                        size={18}
                      />
                    </div>
                  </div>
                  <div className="subMenu">
                    <div className="menu-title">
                      <div>Position</div>
                      <div className="color-primary">
                        <TrendingUp className="icon" />
                      </div>
                      {/* size={17} */}
                    </div>
                    <div>{teamDetails.position}</div>
                  </div>
                </div>
                <div className="menu-row">
                  <div className="subMenu">
                    <div className="menu-title">
                      <div>Points</div>
                      <div className="color-primary">
                        <Trophy className="icon" />
                      </div>
                    </div>
                    <div>{teamDetails.points}</div>
                  </div>
                  <Link
                    className="menu-title"
                    to={teamDetails.Constructor.url}
                    target="_blank"
                  >
                    <div className="subMenu">
                      <div>History</div>{" "}
                      <div>
                        <ExternalLink className="icon" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="title">
          <h1>
            <Calendar1 className="color-primary title-icon" />
            Race Results
          </h1>
        </div>
        <div className="subtitle">
          <h3>
            {teamDetails.Constructor.name}'s race results for the current
            seasson
          </h3>
        </div>

        <table className="table">
          <thead></thead>

          <tbody>
            <tr>
              <th>Round </th>
              <th>Grand Prix</th>
              {result[0].Results.map((res) => {
                return (
                  <th key={res.Driver.driverId}>{res.Driver.familyName}</th>
                );
              })}

              <th>Points</th>
            </tr>
            {result.map((res, i) => {
              let points = 0;
              // console.log("res", res);

              return (
                <tr key={res.round}>
                  <td>
                    <div
                      className="position-default"
                      style={getPositionColor(i + 1)}
                    >
                      {res.round}
                    </div>
                  </td>
                  {/* {console.log("Lets see res", res)} */}
                  <td className="flag-name">
                    <Link to={"/races/" + res.round}>
                      <Flag
                        className="flagg"
                        country={getAlpha2ByCountryName(
                          countryList,
                          res.Circuit.Location.country
                        )}
                      />
                      {res.raceName}
                    </Link>
                  </td>

                  {res.Results.map((data) => {
                    // console.log("data", data)
                    points += Number(data.points);
                    return (
                      <td
                        style={getPositionColor(data.position)}
                        key={data.position}
                      >
                        {data.position}
                      </td>
                    );
                  })}

                  <td>{points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
