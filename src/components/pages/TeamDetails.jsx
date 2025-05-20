import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../Loader";
import axios from "axios";
import { Link } from "react-router";

export default function TeamDetails() {

    <h1>Teams details</h1>
    const params = useParams();

    const [teamDetails, setTeamDetails] = useState({});
    const [loader, setLoader] = useState(true);
    const [loader2, setLoader2] = useState(true);
    const [result, setResult] = useState({});
    // console.log(params, 'params');

    useEffect(() => {
        getTeamDetails();
        getResult();
    }, []);

    const getResult = async () => {
        const url = "http://ergast.com/api/f1/2013/constructors/" + params.id + " /results.json";
        const response = await axios.get(url);
        console.log("getResults",response.data.MRData.RaceTable.Races);
        setResult(response.data.MRData.RaceTable.Races);
        setLoader(false);
    }

    const getTeamDetails = async () => {
        const url = 'http://ergast.com/api/f1/2013/constructors/' + params.id + '/constructorStandings.json'
        const response = await axios.get(url);
        console.log("getTeamDetails",response.data);
        setTeamDetails(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setLoader2(false);
    }


    if (loader || loader2) {
        return <Loader />
    };




    return (
        <div>
            <div>
                <h3>Formula 1 2013 Results</h3>
            </div>
            <table>
                <thead>
              <tr>
                        <th>Country: </th>
                        <th>Position: </th>
                        <th>Points: </th>
                        <th>History: </th>
              </tr>
                    
                </thead>
                <tbody>
                   

                    <tr>
                        <td>{teamDetails.Constructor.nationality}</td>
                        <td>{teamDetails.position}</td>
                        <td>{teamDetails.points}</td>
                        <td><Link to={teamDetails.history}>History: </Link></td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>

                        {result[0].Results.map((res, i) => {
                            return(
                                <th key={i}>
                                    {res.Driver.familyName}
                                </th>
                            )
                        })}

                        <th>Points</th>
                    </tr>
                </thead>

                <tbody>
                        {result.map((res, i) => {
                            let points = 0;
                            console.log("res",res);

                            return(
                                <tr key={i}>
                            <td>{res.round}</td>
                            <td>{res.raceName}</td>

                            
                            
                            {res.Results.map((data, i) => {
                                console.log("data",data)
                                points += Number(data.points)
                                return(
                                    <td key={i}>{data.position}</td>
                                )
                            })}

                            <td>{points}</td>
                    </tr>
                            )
                        })}
                </tbody>

            </table>

        </div>
    )

}