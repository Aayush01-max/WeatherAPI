import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import "./App.css"

function Weather() {

    const [location , setlocation] = useState("");
    const [data , setdata] = useState({})

    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0498080e1a5197f270b0caf571365be5&units=metric`;

    async function getweather() {

      try {
        if(location){
          const response = await axios(URL);
          console.log(response.data)
          setdata(response.data)
        }
      }
      catch(error){
        console.log("the error is ", error)
      }

    }

    useEffect(()=>{
      getweather();
    },[])


  return (
    <div className="weather">
      <div className="fixed left-1/3 top-32">
        <input
          type="text"
          placeholder="search..."
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
        <button onClick={getweather}>get</button>
        <div>
          <h1>
            <b>City: {data.name}</b>
          </h1>
          <h1>
            <b>
              Temp : {data.main ? data.main.temp : null} <sup>o</sup>C
            </b>
          </h1>
          <h1>
            <b>Wind : {data.wind ? data.wind.speed : null}</b>
          </h1>
          <img
            src={
              data.weather
                ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                : null
            }
            alt="Weather Icon"
          />
        </div>
      </div>
    </div>
  );
}

export default Weather;

