import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './WeatherSub.css';
import './DateUpdate';
import { Card, Button } from "..";
import search_icon from "../../components/Assets/search.png";
import angin_icon from "../../components/Assets/angin.png";
import humidity_icon from "../../components/Assets/humidity.png";
import suhu_max from "../../components/Assets/suhumax.png";
import DateUpdate from "./DateUpdate";
import *as Yup from "yup";


interface MainData {
    humidity: number;
    temp_max: number;
    temp: number;
    pressure: number;
    feels_like: number;

}

interface WindData {
    speed: number;
}

interface WeatherData {
    icon :string;
    description : string;
    main :  string;
}

interface CoordinateData {
    lat :number;
    lon : number;
}

interface SysData {
    
country: string
id: number
sunrise: number
sunset: number
}

interface AppData {
    main : MainData;
    weather : {[key:number]: WeatherData};
    wind : WindData;
    name : string;
    coord : CoordinateData;
    sys : SysData
}


const WeatherSub: React.FC = () => {

    const [api_key] = useState<string>("6e33f37dca5a8579ee77037a9d2d2929");
    const [weather, setWeather] = useState<AppData>();
    const searchRef = useRef<HTMLInputElement | null>(null);
    const Navigate = useNavigate();

    const searchSchema = Yup.object().shape({
        searchTerm: Yup.string().required("Search term is required"),
    });
    // console.log(weather)

    const search = async () => {
        let location = searchRef?.current?.value ? searchRef?.current?.value : "Indonesia";
       
        console.log(location);

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
        let response = await fetch(url);
        let data: AppData = await response.json();
        setWeather(data)
        
        // console.log (data);
        
    };
    
        useEffect(() => {
            // fetchDetail();
            search();
        }, []);

    return (
        <main className="container">
            <section className="top-bar">
                <input type="text" className="cityInput " placeholder="Search" ref={searchRef} />
                <div className="search-icon" onClick={()=>{(search())}}>
                    <img className="h-7 w-auto" src={search_icon} alt="search logo"/>
                </div>
            </section>

            <section className="weather-image">
                <img className="bg-violet-100 hover:bg-violet-200 active:bg-violet-700 rounded-full" src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="logo cuaca"/>
                <p className="id-icon">{weather?.weather[0].description}</p>
            </section>

            <section className="weather-status">
                <h1 className="weather-temperature">{weather?.main.temp +"°C"}</h1>
                <DateUpdate/>
                <h2 className="weather-location">{weather?.name}</h2>

            </section>

            <section className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="logo kelembaban udara"/>
                    <div className="data">
                        <h3 className="humidity-percent">{weather?.main.humidity+"%"}</h3>
                        <p className="text">Kelembaban</p>
                    </div>
                </div>

                <div className="element">
                    <img src={suhu_max} alt="logo temperatur maksimal"/>
                    <div className="data">
                        <h3 className="temperature-max">{weather?.main.temp_max+"°C"}</h3>
                        <p className="text">Max-Temperature</p>
                    </div>
                </div>

                <div className="element">
                    <img src={angin_icon} alt="logo hembusan angin"/>
                    <div className="data">
                        <h3 className="wind-speed">{weather?.wind.speed + "MpH"}</h3>
                        <p className="text">Kecepatan Angin</p>
                    </div>
                </div>
            </section>

            <Card border={false} className={'flex flex-wrap flex-col items-center'}>
                    <table >
                        <thead >
                            <tr >
                                <th>Country</th>
                                <th>Coordinate</th>
                                <th>Weather</th>
                                <th>Main</th>
                                <th>Feels Like</th>
                                <th>Pressure</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                                <tr >
                                    <td>{weather?.sys.country}</td>
                                    <td>{"lat:"+weather?.coord.lat}; {"lon:"+weather?.coord.lon}</td>
                                    <td className={'flex justify-center '}>
                                      <img className="h-8 w-auto bg-violet-100 hover:bg-violet-300 active:bg-violet-700 rounded-full" src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="logo cuaca"/>
                                    </td>
                                    <td>{weather?.weather[0].main}</td>
                                    <td>{weather?.main.feels_like+"°C"}</td>
                                    <td>{weather?.main.pressure+"hPa"}</td>
                                    
                                </tr>
                        </tbody>
                    </table>

                    <Card border={false} className="mt-2 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">

                        <Button label="Previous" onClick={() => Navigate('/Login')}className="text-gray-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>
                        <div className="h-9 w-px bg-slate-500/50"/>
                        <Button label="Next" onClick={() => Navigate('/ConnectApi')}className="text-gray-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>

                    </Card>
            </Card> 

        </main>
    )
}

export default WeatherSub