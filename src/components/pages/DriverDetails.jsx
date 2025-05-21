import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader"
import { data, useParams } from "react-router";
import { Link } from "react-router";
import { getAlpha2ByNationality } from "../getFlagCode";
import Flag from "react-flagkit";

export default function DriverDetails({countryList}) {
    const [driverDetails, setDriverDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataRaces, setDataRaces] = useState({});
    const driver = useParams();


    useEffect(() => {
        getDataRaces();
    }, []);

    const getDataRaces = async () => {
        const url = "http://ergast.com/api/f1/2013/drivers/" + driver.id + "/results.json"
        const url2 = "http://ergast.com/api/f1/2013/drivers/" + driver.id + "/driverStandings.json"

        const response2 = await axios.get(url);
        const response = await axios.get(url2);

        const dataRaces = response2.data.MRData.RaceTable.Races;
        const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];

        console.log("dataRaces", dataRaces)
        console.log('driverDetails', response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);

        setDataRaces(dataRaces);
        setDriverDetails(data);
        setIsLoading(false);
    }


    if (isLoading) {
        return <Loader />
    }

    return (

        <div className="">
            <div className="driver-card">
                <img src={`/img/drivers/${driver.id}.jpg`} style={{ height: "200px" }} alt="drivers-photo" />
                <div key={driverDetails.Driver.driverId}>
                    <p>{driverDetails.Driver.givenName} {driverDetails.Driver.familyName}</p>
                    {/* <p>Country: <Nat2Flag nat={driverDetails.Driver.nationality} /></p> */}
                    <p>Country: <Flag country={getAlpha2ByNationality(countryList, driverDetails.Driver.nationality)} /></p>

                    <p>Team: {driverDetails.Constructors[0].name}</p>
                    <p>Biography: <Link target="_blank" to={driverDetails.Driver.url}>About Driver</Link></p>
                </div>
            </div>

            <h4>Formula 1 2013 Results</h4>
            <div className="driver-results">
                <table>
                    <tbody className="a">
                    </tbody>
                </table>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Race</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataRaces.map((race) => {
                            return (
                                <tr>
                                    <td>{race.round}</td>
                                    <td><Link to={"/races/" + race.round}>{race.raceName}</Link></td>
                                    <td><Link to={"/races/" + race.Results[0].Constructor.constructorId}></Link>{race.Results[0].Constructor.name}</td>
                                    <td>{race.Results[0].grid}</td>
                                    <td>{race.Results[0].position}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>

        </div >

    )
}