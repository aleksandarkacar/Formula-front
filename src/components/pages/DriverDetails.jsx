import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader"
import { useParams } from "react-router";
import { Link } from "react-router";

export default function DriverDetails() {
    const [driverDetails, setDriverDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const driver = useParams();
    console.log(driver.id);


    useEffect(() => {
        getDriverDetails();
    }, []);

    const getDriverDetails = async () => {
        const url = "http://ergast.com/api/f1/2013/drivers/"+driver.id+"/results.json"
        const response = await axios.get(url);
        const data = response.data.MRData.RaceTable.Races;
        console.log(response.data.MRData.RaceTable.Races);
        setDriverDetails(data);
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loader />
    }
    
    return (
         
        <div className="">
        <div className="driver-card">
            {/* <img alt="drivers-photo"/>
            {driverDetails.map((driver, i) => {
                        return (
                            <div key={driver.Driver.driverId}>
                                <p>{driver.Driver.givenName} {driver.Driver.familyName}</p>
                                <p>Country: {driver.Driver.nationality}</p>
                                <p>Team: {driver.Constructors[0].name}</p>
                                <p>Biography: <Link to={driver.Driver.url}></Link></p>
                            </div>
                        )
                    })} */}
        </div>

        <span>Formula 1 2013 Results</span>
        <div className="driver-results">
            <table>
                <tbody className="a">
                    {driverDetails.map((driver, i) => {
                        return (
                            <tr key={i}>
                                <td>{driver.round}</td>
                                <td>{driver.raceName}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </div>
        
    )
}