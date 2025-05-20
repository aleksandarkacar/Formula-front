import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader"
import { data, useParams } from "react-router";
import { Link } from "react-router";

export default function DriverDetails() {
    const [driverDetails, setDriverDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [result, setResult] = useState({});
    const [dataRaces, setDataRaces] = useState({});
    const driver = useParams();
    console.log(driver.id);


    useEffect(() => {
        getDriverDetails();
        getResults();
        getDataRaces();
    }, []);

    const getResults = async () => {
        const url = 'http://ergast.com/api/f1/2013/drivers/' + driver.id + '/results.json'
        const response = await axios.get(url);
        // console.log("results response",response);
        setResult(response.data.MRData);
        setIsLoading(false);

    }
    const getDataRaces = async () => {
        const url = "http://ergast.com/api/f1/2013/drivers/" + driver.id + "/results.json"
        const response = await axios.get(url);
        const dataRaces = response.data.MRData.RaceTable.Races;
        console.log("dataRaces", dataRaces)
        setDataRaces(dataRaces);
        setIsLoading(false)
    }

    const getDriverDetails = async () => {

        const url = "http://ergast.com/api/f1/2013/drivers/" + driver.id + "/driverStandings.json"
        const response = await axios.get(url);
        const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
        console.log('driverDetails', response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setDriverDetails(data);
        setIsLoading2(false);
    }

    if (isLoading || isLoading2) {
        return <Loader />
    }

    return (

        <div className="">
            <div className="driver-card">
                <img alt="drivers-photo" />
                <div key={driverDetails.Driver.driverId}>
                    <p>{driverDetails.Driver.givenName} {driverDetails.Driver.familyName}</p>
                    <p>Country: {driverDetails.Driver.nationality}</p>
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
                                    <td>{race.raceName}</td>
                                    <td><Link to={"/teams/" + race.Results[0].Constructor.constructorId}>{race.Results[0].Constructor.name}</Link></td>
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