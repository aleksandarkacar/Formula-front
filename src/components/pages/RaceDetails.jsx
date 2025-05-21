import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router";
import Flag from "react-flagkit";
import { getAlpha2ByCountryName, getAlpha2ByNationality } from "../getFlagCode";

export default function RaceDetails({countryList}) {
    const [qualifs, setQualifs] = useState({});
    const [raceResults, setRaceResults] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    // console.log(params.id);



    useEffect(() => {
        getQualifs();
    }, []);

    // const getGPDetails = async () => {
    //     const url = ""
    // }

    const getQualifs = async () => {

        const url = "http://ergast.com/api/f1/2013/" + params.id + "/qualifying.json"
        const url2 = "http://ergast.com/api/f1/2013/" + params.id + "/results.json"

        const response = await axios.get(url);
        const response2 = await axios.get(url2);

        console.log("Qualifs", response.data.MRData.RaceTable.Races[0].QualifyingResults);
        setQualifs(response.data.MRData.RaceTable.Races[0].QualifyingResults);


        console.log("getRaceResults", response2.data.MRData.RaceTable.Races[0]);
        setRaceResults(response2.data.MRData.RaceTable.Races[0]);

        setIsLoading(false);
    };

    if (isLoading) {
        return <Loader />
    };

    return (
        <div>

            <div>
                <h2>Race Results</h2>
                <h3>Country: {raceResults.raceName}</h3>
                <Flag size={"100px"} country={getAlpha2ByCountryName(countryList, raceResults.Circuit.Location.country)} />
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
                        return (
                            <tr key={i}>
                                <td>{qualif.position}</td>
                                <td>
                                    <Flag country={getAlpha2ByNationality(countryList, qualif.Driver.nationality)} />
                                    <Link to={"/" + qualif.Driver.driverId}>{qualif.Driver.familyName}</Link>
                                </td>
                                <td><Link to={"/teams/" + qualif.Constructor.constructorId}>{qualif.Constructor.name}</Link></td>
                                <td>{fastestTime}</td>

                            </tr>

                        )
                    })}
                </tbody>



            </table>


            <h1>Race results</h1>

            <table>

                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Result</th>
                        <th>Points</th>

                    </tr>
                </thead>

                <tbody>
                    {raceResults.Results.map((raceResult, i) => {
                        return (
                            <tr key={i}>
                                <td>{raceResult.position}</td>
                                <td>
                                    <Flag country={getAlpha2ByNationality(countryList, raceResult.Driver.nationality)} />
                                    <Link to={"/" + raceResult.Driver.driverId}>{raceResult.Driver.familyName}</Link></td>
                                <td>
                                    <Link to={"/teams/" + raceResult.Constructor.constructorId}>{raceResult.Constructor.name}</Link>
                                </td>
                                <td>{raceResult.Time ? raceResult.Time.time : raceResult.status}</td>
                                <td>{raceResult.points}</td>

                            </tr>
                        )

                    })}

                </tbody>




            </table>

        </div>
    );









};