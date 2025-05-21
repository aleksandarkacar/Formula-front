import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../Loader";
import axios from "axios";
import { Link } from "react-router";
// import Nat2Flag from "../getFlagCode";
import Flag from "react-flagkit";
import { getAlpha2ByCountryName, getAlpha2ByNationality } from "../getFlagCode";

export default function TeamDetails({countryList}) {

    <h1>Teams details</h1>
    const params = useParams();

    const [teamDetails, setTeamDetails] = useState({});
    const [loader, setLoader] = useState(true);
    const [result, setResult] = useState({});
    // console.log(params, 'params');

    useEffect(() => {

        getResult();
    }, []);

    const getResult = async () => {
        const url = 'http://ergast.com/api/f1/2013/constructors/' + params.id + '/constructorStandings.json'
        const url2 = "http://ergast.com/api/f1/2013/constructors/" + params.id + " /results.json";
      

        const response = await axios.get(url);
        const response2 = await axios.get(url2);
        

        console.log("getTeamDetails", response.data);
        console.log("getResults", response2.data.MRData.RaceTable.Races);

        setTeamDetails(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setResult(response2.data.MRData.RaceTable.Races);
        setLoader(false);

    }


    if (loader) {
        return <Loader />
    };


    return (
        <div>
            <div>
                <h3>Formula 1 2013 Results</h3>
                <td>
                    <img src={`/img/teams/${params.id}.png`} style={{ height: "25px"}} />
                    {<td><Flag country={getAlpha2ByNationality (countryList,teamDetails.Constructor.nationality) } />{teamDetails.Constructor.name}</td>}
                </td>
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
                        <td><Link to={teamDetails.Constructor.url} target="_blank">History: </Link></td> 
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>

                        {result[0].Results.map((res, i) => {
                            return (
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
                        console.log("res", res);

                        return (
                            <tr key={i}>
                                <td>{res.round}</td>
                                {console.log("Lets see res",res)}
                                <td><Flag country={getAlpha2ByCountryName(countryList,res.Circuit.Location.country)} />{res.raceName}</td>



                                {res.Results.map((data, i) => {
                                    console.log("data", data)
                                    points += Number(data.points)
                                    return (
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