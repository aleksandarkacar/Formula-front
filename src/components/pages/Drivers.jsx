import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader"
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByNationality } from "../getFlagCode";

export default function Drivers({countryList}) {
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json"
        const response = await axios.get(url);
        const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        console.log(data)
        setDrivers(data);
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="table-wrapper">
            <h1>Drivers page</h1>
            <span>Drivers Championship Standings 2013</span>
             
            <table className="tabelus">
                <tbody className="a">
                    {drivers.map((driver, i) => {
                        return (
                            <tr key={driver.Driver.driverId}>
                                <td>{driver.position}</td>
                                {/* <td>{driver.Driver.nationality}</td> */}
                                
                                <td><Flag country={getAlpha2ByNationality(countryList, driver.Driver.nationality)} /><Link to={driver.Driver.driverId}>{driver.Driver.givenName} {driver.Driver.familyName}</Link></td>
                                <td>{driver.Constructors[0].name}</td>
                                <td>{driver.points}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        
    )
}