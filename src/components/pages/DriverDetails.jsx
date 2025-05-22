import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader"
import { data, useParams } from "react-router";
import { Link } from "react-router";
import { getAlpha2ByCountryName, getAlpha2ByNationality } from "../getFlagCode";
import Flag from "react-flagkit";
import { TeamOutlined } from "@ant-design/icons";
import {ReadOutlined } from "@ant-design/icons";

export default function DriverDetails({ countryList }) {
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

        <div className="driver-card">
            <div className="card">
                <h1 className="title">Driver Profile</h1>
                <h2 className="subtitle">Driver information and statistics</h2>
                <img className="photo" src={`/img/drivers/${driver.id}.jpg`} alt="drivers-photo" />
                <div key={driverDetails.Driver.driverId}>
                    <p>{driverDetails.Driver.givenName} {driverDetails.Driver.familyName}</p>
                    {/* <p>Country: <Nat2Flag nat={driverDetails.Driver.nationality} /></p> */}
                    {/* Country: */} <p><Flag country={getAlpha2ByNationality(countryList, driverDetails.Driver.nationality)} /></p>
                    <div className="card2"> <div className="team"><div className="mini-title">Team </div> <TeamOutlined style={{color:"#e11d48" }} /></div><div className="mini-text-below"> <Link to={"/teams/" + driverDetails.Constructors[0].consturctorId}>{driverDetails.Constructors[0].name}</Link></div></div>
                    <div className="card2">
                        <div className="team">
                            Biography <ReadOutlined style={{color:"#e11d48" }}/>
                        </div>  
                        <Link target="_blank" to={driverDetails.Driver.url}>
                            <div className="mini-text-below">About Driver</div>
                        </Link>
                    </div>
                    
                </div>
            </div>

            <h4>Formula 1 2013 Results</h4>
            <div className="driver-results">
                <table>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <div>
                <table className="tabelus">
                    <thead>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Race</th>
                        </tr>
                    </thead>

                    <tbody className="driver-card">
                        {dataRaces.map((race) => {
                            return (
                                <tr>
                                    <td>{race.round}</td>
                                    <td><Link to={"/races/" + race.round}><Flag country={getAlpha2ByCountryName(countryList, race.Circuit.Location.country)} />{race.raceName}</Link></td>
                                    <td>{race.Results[0].Constructor.name}</td>
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