import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useParams } from "react-router";

export default function RaceDetails(){
    const [qualifs, setQualifs] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const params = useParams();
    // console.log(params.id);



    useEffect(() => {
        getQualifs();
        getRaceResults();
    }, []);


    const getQualifs = async () => {

        const url = "http://ergast.com/api/f1/2013/" + params.id + "/qualifying.json"
        const response = await axios.get(url);

        console.log(response.data.MRData.RaceTable.Races[0].QualifyingResults);
        setQualifs(response.data.MRData.RaceTable.Races[0].QualifyingResults);
        setIsLoading(false);
    };

    const getRaceResults = async () => {
       const url = "http://ergast.com/api/f1/2013/" + params.id + "/results.json"

        setIsLoading2(false);
    }

    if (isLoading || isLoading2) {
        return <Loader />
    };

    return (
        <div>

            <h1>Qualifying resaults</h1>

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
                            <td>{qualif.Driver.nationality} {qualif.Driver.familyName}</td>
                            <td>{qualif.Constructor.name}</td>
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