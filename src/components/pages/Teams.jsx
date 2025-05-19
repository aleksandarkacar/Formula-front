import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import {Link} from "react-router";

export default function Teams() {

    <h1>Teams page</h1>
    const [teams, setTeams] = useState({});
    const [loader, setLoader] = useState(true);
    use

    useEffect(() => {
        getTeams()
    }, []);

    const getTeams = async () => {
        console.log()
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json"
        // 'http://ergast.com/api/f1/2013/constructors/' + id + '/constructorStandings.json' 
        const response = await axios.get(url);
        console.log(response.data);
        setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
        setLoader(false);
    }

    if (loader) {
        return (<Loader />)
    };

    return (
        <div>

            <h1>Constructions Championship</h1>
            <span>Constructors Championship Standings-2013</span>
            <table>
                <tbody>
                    {teams.map((team, i) => {

                        return (

                            <tr key={i}>
                                <td>{team.positionText}</td>
                                <td><Link to={team.Constructor.constructorId}>{team.Constructor.constructorId}</Link></td>
                                <td><Link to={team.Constructor.url}>Details</Link></td>
                                <td>{team.points}</td>
                            </tr>



                        )
                    })}
                </tbody>
            </table>



        </div>
    )



};
