import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { isRouteErrorResponse, useParams } from "react-router";
import { Link } from "react-router";

export default function RaceDetails(){
    const [qualifs, setQualifs] = useState({});
    const [raceResults, setRaceResaults] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const params = useParams();
    // console.log(params.id);



    useEffect(() => {
        getQualifs();
        getRaceResults();
    }, []);

    const getGPDetails = async () => {
        const url = ""
    }

    const getQualifs = async () => {

        const url = "http://ergast.com/api/f1/2013/" + params.id + "/qualifying.json"
        const response = await axios.get(url);
                // console.log(response.data)

        console.log(response.data.MRData.RaceTable.Races[0].QualifyingResults);
        setQualifs(response.data.MRData.RaceTable.Races[0].QualifyingResults);
        setIsLoading(false);
    };

    const getRaceResults = async () => {
       const url = "http://ergast.com/api/f1/2013/" + params.id + "/results.json"
       const response = await axios.get(url);

       console.log("getRaceResults",response.data.MRData.RaceTable.Races[0]);
       setRaceResaults(response.data.MRData.RaceTable.Races[0]);
       setIsLoading2(false);
    }

    if (isLoading || isLoading2) {
        return <Loader />
    };

    return (
        <div>

            <div>
                <h2>Race Results</h2>
                <h3>Country: {raceResults.raceName}</h3>
                <h3>Location: {raceResults.Circuit.Location.country}</h3>
                <h3>Date: {raceResults.date}</h3>
                <h3><Link target="_blank" to={raceResults.url}>Full Report</Link>
                </h3>
            </div>

            <h1>Qualifying result</h1>

            <table >
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Best time</th>

                    </tr>
                </thead>
                <tbody>

                    {qualifs.map((qualif, i) => {
                        let fastestTime = ""
                        if (qualif.Q3) {
                            fastestTime = qualif.Q3;

                        } else if (qualif.Q2) {
                            fastestTime = qualif.Q2
                        } else {
                            fastestTime = qualif.Q1
                        }
                        return(
                        <tr key={i}>
                            <td>{qualif.position}</td>
                            <td>{qualif.Driver.nationality} </td>
                            <td>
                            <Link to={"/"+qualif.Driver.driverId}>{qualif.Driver.familyName}</Link>
                            </td>
                            <td><Link to={"/teams/"+qualif.Constructor.constructorId}>{qualif.Constructor.name}</Link></td>
                            <td>{fastestTime}</td>
                           
                        </tr>

                        )
})}
                </tbody>



            </table>

            <table>
                {/* Napisi tabelu za rezultate */}

            </table>

        </div>
        );
        
                                


        




};