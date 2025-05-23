import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../Loader";
import axios from "axios";
import { Link } from "react-router";
// import Nat2Flag from "../getFlagCode";
import Flag from "react-flagkit";
import { getAlpha2ByCountryName, getAlpha2ByNationality } from "../getFlagCode";
import { TrendingUp } from 'lucide-react';
import { Trophy } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { Earth } from 'lucide-react';
import "../../styles/components/detailsCard.scss";
import { Building2 } from 'lucide-react';

export default function TeamDetails({ countryList }) {

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
        <div className="page-wrapper">
            <div className="card-wrapper" >
                <div className="card">
                    <h1  className="title"> < Building2 className="idCard, largeIcon, color-primary"/> Team Profile</h1>
                    <h2 className="subtitle">Team information and statistics</h2>
                    <div>
                        <img className="logo" src={`/img/teams/${params.id}.png`} />
                        <div className="name">{teamDetails.Constructor.name}</div>
                    </div>
                    <div className="menu-row">
                        <div>
                            <div>
                                <div className="menu-row">
                                    <div className="subMenu">
                                        <div className="menu-title">
                                            <div>
                                                Nationality
                                            </div>
                                            <div className="color-primary">
                                                <Earth className="icon" />
                                            </div>
                                        </div>
                                        <div className="menu-title" >
                                            <div>{teamDetails.Constructor.nationality}</div>
                                            <Flag country={getAlpha2ByNationality(countryList, teamDetails.Constructor.nationality)} size={18}className="flag" />
                                        </div>
                                    </div>
                                    <div className="subMenu">
                                        <div className="menu-title">
                                            <div>
                                                Position
                                            </div>
                                            <div className="color-primary">
                                                <TrendingUp className="icon" /></div>
                                            {/* size={17} */}
                                        </div>
                                        <div>{teamDetails.position}</div>
                                    </div>
                                </div>
                                <div className="menu-row">
                                    <div className="subMenu">
                                        <div className="menu-title">
                                            <div>
                                                Points
                                            </div>
                                            <div className="color-primary">
                                                <Trophy className="icon" />
                                            </div>
                                        </div>
                                        <div>{teamDetails.points}</div>
                                    </div>
                                    <Link className="menu-title" to={teamDetails.Constructor.url} target="_blank">
                                    <div className="subMenu">

                                                 <div>History</div> <div><ExternalLink className="icon" /></div>

                                    </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="tabelus">
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
                            // console.log("res", res);

                            return (
                                <tr key={i}>
                                    <td>{res.round}</td>
                                    {/* {console.log("Lets see res", res)} */}
                                    <td><Flag country={getAlpha2ByCountryName(countryList, res.Circuit.Location.country)} />{res.raceName}</td>



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
        </div>
    )

}