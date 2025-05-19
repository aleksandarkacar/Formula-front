import { useState,useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../Loader";
import axios from "axios";

export default function TeamDetails() {

    <h1>Teams details</h1>
    const params = useParams();

    const [teamDetails, setTeamDetails] = useState({});
    const [loader, setLoader] = useState(true);
    console.log(params, 'params');

    useEffect(() => {
        getTeamDetails()
    }, []);

    const getTeamDetails = async () => {
        const url = 'http://ergast.com/api/f1/2013/constructors/id/constructorStandings.json'
        const response = await axios.get(url);
        console.log(response.data);
        setTeamDetails(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setLoader(false);
    }


    if (loader) {
        return <Loader />
    };

    return (
        <div>
        <div>
            <h3>Formula 1 2013 Results</h3>
        </div>
        <table>
            <tbody>
                {teamDetails.map((detail, i)=>{
                    return(
                        <tr>
                            <td>{detail.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.nationality}</td>
                        </tr>

                    )
                })}
            </tbody>
        </table>
        </div>
    )

}