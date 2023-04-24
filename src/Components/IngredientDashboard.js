import axios from "axios";
import React, {useState, useEffect} from "react";
import {Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale} from 'chart.js';
import { Line } from 'react-chartjs-2';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/IngredientDashboard.css';

const url = "https://pa8y2a13g0.execute-api.us-east-2.amazonaws.com/default/MocktailProcessing/history";
const gen_url = "https://pa8y2a13g0.execute-api.us-east-2.amazonaws.com/default/MocktailProcessing"
ChartJS.register(CategoryScale, PointElement, LineElement, LinearScale);

const options = {
    responsive:true,
}


function IngredientDashboard(props) {

    let data = [];
    let datas = {};
    let labels = [];

    const[res, setRes ] = useState([]);
    const[genRes, setGenRes] = useState([]);

    useEffect(() => {
        axios.get(url, {params: {iid: props.id}}).then((response) => {
            setRes(response["data"]);
        }).catch((e) => {
                console.log(e);
            }
        );

        axios.get(gen_url, {params: {iid: props.id}}).then((response) => {
            setGenRes(response["data"]);
        }).catch((e) => {
                console.log(e);
            }
        );
    }, []);
    

    if(res.length > 0){

        let i = 0;
        for(i = 0; i < res.length; i++){
            console.log(i);
            labels.push(res[i][1]);
            data.push(res[i][2]);
        }

        datas = {
            labels,
            datasets:[
                {
                    data: data,
                    borderColor: 'rgb(53, 162, 235)'
                }
            ]
        }
    }

    return (
        <div className="IngredientDashboard-Wrapper">
            <div className="IngredientDashboard-Header">
                Ingredient {props.id || "undefined"}
            </div>
            <div className="ingredient-sub-comp-wrapper">
                <div className="current-volume">
                    <div className="current-volume-header h6">
                        Current Volume in Container
                    </div>
                    <div className="current-volume-data">
                        {genRes[2] || "0"} mL
                    </div>
                </div>
                <div className="volume-history">
                    <div className="volume-history-header h6">
                            Volume History
                    </div>
                    {res.length > 0 && <Line options={options} data={datas} />}        
                </div>
                <div className="total-volume-used">
                    <div className="total-volume-used-header h6">
                        Total Quantity Consumed
                    </div>
                    <div className="total-volume-used-data">
                    {genRes[3] || "0"} mL
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

export default IngredientDashboard;
