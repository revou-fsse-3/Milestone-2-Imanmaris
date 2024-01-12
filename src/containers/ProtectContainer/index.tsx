import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateUpdate from "../../components/WeatherComponent/DateUpdate";
import { Card, Button } from "../../components";
import angin_icon from "../../components/Assets/angin.png";
import humidity_icon from "../../components/Assets/humidity.png";
import suhu_max from "../../components/Assets/suhumax.png";


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
    id:number;
}


const ProtectContainer: React.FC = () => {

    const [api_key] = useState<string>("6e33f37dca5a8579ee77037a9d2d2929");
    const [weather, setWeather] = useState<AppData>();
    const Navigate = useNavigate();

    const fetchDetail = async () => {

        let url = `https://api.openweathermap.org/data/2.5/weather?q=Indonesia&units=metric&appid=${api_key}`;
        let response = await fetch(url);
        let data: AppData = await response.json();
        setWeather(data)  

        console.log (data)
        // try {
        //     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Indonesia&units=metric&appid=${api_key}`);
        //     setWeather([response.data]);
        //   } catch (error) {
        //     console.error('Error fetching data:', error);
        //   }
        
    };
    
        useEffect(() => {
            fetchDetail();
        }, []);

    return (
        <main className="bg-sky-50/[.9] rounded-b-xl">
            <section>
                <Card border={false}>
                    <section className="weather-image">
                        <img className="bg-violet-100 hover:bg-violet-200 active:bg-violet-700 rounded-full" src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="logo cuaca"/>
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
                </Card>
            </section>

            <section className='grid gap-4 grid-cols-3 m-4'>
                
                <Card border>
                    <section className="flex gap-2 flex-wrap flex-col items-center">
                        <p className="Id-location">ID</p>
                        <p>{weather?.id}</p>
                    </section>
                </Card>
                <Card border>
                    <section className="flex gap-2 flex-wrap flex-col items-center">
                        <p className="Country">Country</p>
                        <p>{weather?.sys.country}</p>
                    </section>
                </Card>
                <Card border>
                    <section className="flex flex-wrap flex-col items-center">
                        <p className="Coordinate">Coordinate</p>
                        <p>{"lat:"+weather?.coord.lat}; {"lon:"+weather?.coord.lon}</p>
                    </section>
                </Card>
                <Card border>
                    <section className="flex flex-wrap flex-col items-center">
                        <p className="Weather">Weather</p>
                        <p className="id-icon">{weather?.weather[0].description}</p>                    </section>
                </Card>
                <Card border>
                    <section className="flex flex-wrap flex-col items-center">
                        <p className="Feelslike">{"Feels Like(°C)" }</p>
                        <p>{weather?.main.feels_like+"°C"}</p>
                    </section>
                </Card>
                <Card border>
                    <section className="flex flex-wrap flex-col items-center">
                        <p className="Pressure">{"Pressure(hPa)"}</p>
                        <p>{weather?.main.pressure+"hPa"}</p>
                    </section>
                </Card>


                        {/*<Card border={false} className={'flex flex-wrap flex-col items-center'}>
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
                        </Card>*/}
                 
            </section>

            <Card border={false} className={'flex flex-wrap flex-col items-center m-4'}>
                <p className="mb-1 text-center text-sm text-slate-500">let's try checking the weather in another place</p>
                <Button label="Register Now" onClick={() => Navigate('/Login')}className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 mt-3 py-2 text-sm font-medium"/>
            </Card>

        </main>
    )
}

export default ProtectContainer