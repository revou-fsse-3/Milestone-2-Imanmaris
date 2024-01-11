import React, { useEffect, useRef, useState } from "react";

import './WeatherSub.css';

import search_icon from "../../components/Assets/search.png";
import angin_icon from "../../components/Assets/angin.png";
import humidity_icon from "../../components/Assets/humidity.png";
import suhu_max from "../../components/Assets/suhumax.png"
// import cerah_icon from "../../components/Assets/cerah.png";
// import mendung_icon from "../../components/Assets/berawan.png";
// import hujan_icon from "../../components/Assets/hujan.png";
// import petir_icon from "../../components/Assets/petir.png";
// import salju_icon from "../../components/Assets/salju2.png";


interface MainData {
    humidity: number;
    temp_max: number;
    temp: number;
}

interface WindData {
    speed: number;
}

interface WeatherData {
    icon :string;
    description : string;
}

interface AppData {
    main : MainData;
    weather : {[key:number]: WeatherData};
    wind : WindData;
    name : string;
}

// interface WeatherData {
//     // [x: string]: any;
//     main?: {
//         humidity: number;
//         temp_max: number;
//         temp: number;
//     };
//     wind?: {
//         speed: number;
//     };
//     name?: string;
// }

// interface Response {
//     data: WeatherData[];
// }

const WeatherSub: React.FC = () => {

    const [api_key] = useState<string>("6e33f37dca5a8579ee77037a9d2d2929");
    // const [wicon,setWicon] = useState (mendung_icon);
    const [weather, setWeather] = useState<AppData>();
    const searchRef = useRef<HTMLInputElement | null>(null);

    // let api_key = "6e33f37dca5a8579ee77037a9d2d2929";

    console.log(weather)

    const search = async () => {
       let location = searchRef?.current?.value ? searchRef?.current?.value : "Indonesia";
       
        // const element = document.getElementsByClassName("cityInput") as HTMLCollectionOf<HTMLInputElement>;
        // if(element[0].value==="")
        // {
        //     return "Indonesia";
        // }
        console.log(location);

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
        let response = await fetch(url);
        let data: AppData = await response.json();
        setWeather(data)
        

        // const humidity =document.getElementsByClassName("humidity-percent");
        // const tempMax = document.getElementsByClassName("temperature-max");
        // const wind = document.getElementsByClassName("wind-speed");
        // const temperature = document.getElementsByClassName("weather-temperature");
        // const location = document.getElementsByClassName("weather-location");

        // humidity[0].innerHTML = data.main.humidity;
        // tempMax[0].innerHTML = data.main.temp_max;
        // wind[0].innerHTML = data.wind.speed;
        // temperature[0].innerHTML = data.main.temp;
        // location[0].innerHTML = data.name;

        // const humidity = document.getElementsByClassName("humidity-percent") as HTMLCollectionOf<HTMLDivElement>;
        // const tempMax = document.getElementsByClassName("temperature-max") as HTMLCollectionOf<HTMLDivElement>;
        // const wind = document.getElementsByClassName("wind-speed") as HTMLCollectionOf<HTMLDivElement>;
        // const temperature = document.getElementsByClassName("weather-temperature") as HTMLCollectionOf<HTMLDivElement>;
        // const location = document.getElementsByClassName("weather-location") as HTMLCollectionOf<HTMLDivElement>;
        // const idIcon = document.getElementsByClassName("id-icon") as HTMLCollectionOf<HTMLDivElement>;
        
        // humidity[0].innerHTML = String(data.main.humidity + "%");
        // tempMax[0].innerHTML = String(data.main.temp_max + "°C");
        // wind[0].innerHTML = String(data.wind.speed + "Mph");
        // temperature[0].innerHTML = String(data.main.temp + "°C");
        // idIcon[0].innerHTML = data.weather.icon;
        // location[0].innerHTML = data.name;

        // if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
        //     setWicon(cerah_icon);
        // } 
        // else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
        //     setWicon(mendung_icon);
        // } 
        // else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
        //     setWicon(salju_icon);
        // } 
        // else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        //     setWicon(hujan_icon);
        // } 
        // else if(data.weather[0].icon==="11d" || data.weather[0].icon==="11n"){
        //     setWicon(petir_icon);
        // } 

        // else {
        //     let icon = data.weather[0].icon
        //     const img = document.querySelector('#weatherIcon');
        //     img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
        // }
        
    };

    useEffect(() => {
        // if(searchRef.current){
        //     searchRef.current.value = "Indonesia";
        // }
        search();
    },[]);

    return (
        <main className="container">
            <section className="top-bar">
                <input type="text" className="cityInput " placeholder="Search" ref={searchRef} />
                <div className="search-icon" onClick={()=>{(search())}}>
                    <img className="h-7 w-auto" src={search_icon} alt="search logo"/>
                </div>
            </section>

            <section className="weather-image">
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="logo cuaca"/>
            </section>

            <section className="weather-status">
                <h1 className="weather-temperature">32°C</h1>
                <h2 className="weather-location">{weather?.name}</h2>
                <p className="id-icon">{weather?.weather[0].description}</p>
            </section>

            <section className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="logo kelembaban udara"/>
                    <div className="data">
                        <h3 className="humidity-percent">50%</h3>
                        <p className="text">Kelembaban</p>
                    </div>
                </div>

                <div className="element">
                    <img src={suhu_max} alt="logo temperatur maksimal"/>
                    <div className="data">
                        <h3 className="temperature-max">32°C</h3>
                        <p className="text">Max-Temperature</p>
                    </div>
                </div>

                <div className="element">
                    <img src={angin_icon} alt="logo hembusan angin"/>
                    <div className="data">
                        <h3 className="wind-speed">18 mph</h3>
                        <p className="text">Kecepatan Angin</p>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default WeatherSub