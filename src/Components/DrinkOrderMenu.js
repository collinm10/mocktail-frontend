import React from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/DrinkOrderMenu.css';

import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool, } from "@aws-sdk/credential-provider-cognito-identity";
import { IoTClient, AcceptCertificateTransferCommand } from "@aws-sdk/client-iot";

var AWS = require('aws-sdk')

/*AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:f9dcdda2-1dff-4c4a-a45a-4999246b7b17',
});*/

let config = {};
config.IOT_BROKER_ENDPOINT = "a233silfoqj7kh-ats.iot.us-east-2.amazonaws.com"; 
config.IOT_BROKER_REGION = "us-east-2";

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:f9dcdda2-1dff-4c4a-a45a-4999246b7b17"
});

AWS.config.region = config.IOT_BROKER_REGION;
var iotData = new AWS.IotData({endpoint: config.IOT_BROKER_ENDPOINT});
var topic = "$aws/things/mocktail/status";
var params = {
  topic: topic,
  payload: "test",
  qos: 1
};

function DrinkOrderMenu() {  

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:f9dcdda2-1dff-4c4a-a45a-4999246b7b17"
  });
  
  AWS.config.region = config.IOT_BROKER_REGION;
  var iotData = new AWS.IotData({endpoint: config.IOT_BROKER_ENDPOINT});
  var topic = "$aws/things/mocktail/status";
  var params = {
    topic: topic,
    payload: "test",
    qos: 1
  };
  
  return (
    <div className="DrinkOrderMenu-Wrapper">
        <div className="DrinkOrderMenu-Header">
          Order Something
        </div>
        <div className="buttons">
          <Button variant="dark" className="drink-button btn-dark" onClick={() => handleClick(1)}> Drink 1</Button>
          <Button variant="dark" className="drink-button btn-dark" onClick={() => handleClick(2)}> Drink 2</Button>
          <Button variant="dark" className="drink-button btn-dark" onClick={() => handleClick(3)}> Drink 3</Button>
          <Button variant="dark" className="drink-button btn-dark" onClick={() => handleClick(4)}> Drink 4</Button>
          <Button variant="dark" className="drink-button btn-dark" onClick={() => handleClick(5)}> Drink 5</Button>
          <Button variant="dark" className="drink-button btn-dark" onClick={() => handleClick(6)}> Drink 6</Button>
        </div> 
    </div>
  );
}

function handleClick(i){
  console.log(i);
  params.payload = i.toString();
  iotData.publish(params, (err, data) => {
    if(!err){
      console.log("Published!");
    }
    else{
      console.log(err);
    }
  });
}

export default DrinkOrderMenu;
