import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";



export default function Races() {
    const [races,setRaces] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getRaces();
    }, []);

    
    const getRaces = async () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        const response = await axios.get(url);
        console.log(response.data.MRData.RaceTable.Races);
        setRaces(response.data.MRData.RaceTable.Races);
        setIsLoading(false);
    };

    if (isLoading) {
        return <Loader />
    };

    return (
        <div>
            
        
        <h1>Race calendar</h1>
        <h4>Race Calendar - 2013</h4>
        <table > 
            <thead>
                <tr>
                    <th>Round</th>
                    <th>Grand Prix</th>
                    <th>Circuit</th>
                    <th>Date</th>
                    <th>Winner</th>
                </tr>
            </thead>
            <tbody>
                {races.map((race,i) => {
                    
                    return (
                        <tr key={i}>
                            <td>{race.round}</td>
                            <td>{race.RaceName}</td>
                            <td>{race.Circuit.circuitName}</td>
                            <td>{race.date}</td>
                            <td>{race.Results[0].Driver.nationality} {race.Results[0].Driver.familyName}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

        </div>

    );
}