import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import { useParams } from "react-router";
import { Link } from "react-router";
import { getAlpha2ByCountryName, getAlpha2ByNationality } from "../getFlagCode";
import Flag from "react-flagkit";
import "../../styles/components/detailsCard.scss";
import { Medal, IdCard, BookOpenText, UsersRound } from "lucide-react";
import getPositionColor from "../getPositionColor";
import ShowError from "../ShowError.jsx";

export default function DriverDetails({
  searchInput,
  selectedYear,
  countryList,
}) {
  const [driverDetails, setDriverDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dataRaces, setDataRaces] = useState([]);
  const [driverFlag, setDriverFlag] = useState("");
  const [err, setErr] = useState(false);
  const driver = useParams();

  const filteredData = dataRaces.filter((item) => {
    if (searchInput == "") {
      return item;
    } else {
      return item.Circuit.Location.country
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    }
  });

  useEffect(() => {
    setIsLoading(true);
    getDataRaces();
  }, [selectedYear]);

  const getDataRaces = async () => {
    try {
      const url =
        "https://ergast.com/api/f1/" +
        selectedYear +
        "/drivers/" +
        driver.id +
        "/results.json";
      const url2 =
        "https://ergast.com/api/f1/" +
        selectedYear +
        "/drivers/" +
        driver.id +
        "/driverStandings.json";

      const response2 = await axios.get(url);
      const response = await axios.get(url2);

      setDataRaces(response2.data.MRData.RaceTable.Races);
      setDriverDetails(
        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
      );
      setDriverFlag(
        getAlpha2ByNationality(
          countryList,
          response.data.MRData.StandingsTable.StandingsLists[0]
            .DriverStandings[0].Driver.nationality
        )
      );
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
    <div className="page-wrapper">
      <div className="card-wrapper">
        <div className="card">
          <div className="title">
            <h1 className="title">
              <IdCard className="idCard color-primary" />
              Driver Profile
            </h1>
          </div>
          <h2 className="subtitle">Driver information and statistics</h2>
          <div className="card-content">
            <img
              className="photo"
              src={`../img/drivers/${driver.id}.jpg`}
              onError={(e) => {
                e.target.src = "../img/drivers/avatar.png";
                e.onerror = null;
              }}
            />
            <p>
              {driverDetails.Driver.givenName} {driverDetails.Driver.familyName}
            </p>{" "}
            <p>
              {driverFlag ? (
                <Flag country={driverFlag} />
              ) : (
                <img
                  src="/img/flags.jpg"
                  style={{ width: "24px", marginRight: "10px" }}
                  alt="Flag placeholder"
                />
              )}
            </p>
            <div className="menu-wrapper">
              <div className="subMenu">
                <div className="menu-title subtitle">
                  <div>Team</div>
                  <div className="color-primary">
                    <div className="smallIcon">
                      <UsersRound className="icon" />
                    </div>
                  </div>
                </div>

                <div className="menu-title">
                  <Link
                    to={"/teams/" + driverDetails.Constructors[0].constructorId}
                  >
                    {driverDetails.Constructors[0].name}
                  </Link>
                </div>
              </div>
              <div className="subMenu">
                <div className="menu-title subtitle">
                  <div>Biography</div>
                  <div className="color-primary smallIcon">
                    <BookOpenText className="icon" />
                  </div>
                </div>
                <div className="menu-title">
                  <Link target="_blank" to={driverDetails.Driver.url}>
                    <div className="mini-text-below">About Driver</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <br />
        <div className="title">
          <div>
            <h1>
              <Medal className="color-primary title-icon " />
              Formula 1 {selectedYear} Results
            </h1>
            <div className="subtitle">
              <h3>
                {" "}
                {driverDetails.Driver.familyName}'s race results and team
              </h3>
            </div>
          </div>
        </div>
        <div>
          <br />
          <table className="table">
            <thead>
              <tr className="top-row no-hover">
                <th>Round</th>
                <th>Grand Prix</th>
                <th>Team</th>
                <th>Grid</th>
                <th>Race</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((race, i) => {
                return (
                  <tr key={race.round}>
                    <td className="just-center">
                      <div>{race.round}</div>
                    </td>

                    <td>
                      <Link to={"/races/" + race.round}>
                        <div className="flag-name">
                          <div>
                            <Flag
                              className="flagg"
                              country={getAlpha2ByCountryName(
                                countryList,
                                race.Circuit.Location.country
                              )}
                            />
                          </div>

                          <div>{race.raceName}</div>
                        </div>
                      </Link>
                    </td>
                    <td>{race.Results[0].Constructor.name}</td>
                    <td>{race.Results[0].grid}</td>
                    <td>
                      <div
                        className="position-default"
                        style={getPositionColor(race.Results[0].position)}
                      >
                        {race.Results[0].position}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <br />
    </div>
  );
}
