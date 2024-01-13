import React, { useEffect, useState , useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "../../components";
import search_icon from "../../components/Assets/search.png";
import angin_icon from "../../components/Assets/angin.png";
import humidity_icon from "../../components/Assets/humidity.png";
import suhu_max from "../../components/Assets/suhumax.png";


interface LocationData {
    lat: number;
    lon: number;
    localtime: number;
    name: string;
    country:string;
  
  }
  
  interface ConditionData{
      text:string;
      icon:string;
      code: number;
  }
  
  interface CurrentData {
    speed: number;
    condition: ConditionData;
    wind_mph: number;
    pressure_mb:number;
    humidity: number;
    feelslike_c:number;
    temp_c: number;
    
  }
  
  
  interface AppData {
    location: LocationData;
    current: CurrentData;
  }


const HomeContainer: React.FC = () => {

    const [api_key] = useState<string>("6cd366cb3d634eb8b0c21922241201");
    const [weather, setWeather] = useState<AppData>();
    const searchRef = useRef<HTMLInputElement | null>(null);
    const Navigate = useNavigate();

    const search = async () => {
        let location = searchRef?.current?.value ? searchRef?.current?.value : "Indonesia";
       
        console.log(location);

        let url = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=7`;
        let response = await fetch(url);
        let data: AppData = await response.json();
        setWeather(data)  

        console.log (data)
        
    };
    
        useEffect(() => {
            search();
        }, []);

    return (
        <main className="bg-sky-50/[.9] rounded-b-xl">
            <section>
                <Card border={false}>

                    <section className="top-bar">
                        <input type="text" className="cityInput " placeholder="Search Location" ref={searchRef} />
                        <div className="search-icon" onClick={()=>{(search())}}>
                            <img className="h-7 w-auto" src={search_icon} alt="search logo"/>
                        </div>
                    </section>

                    <section className="weather-image">
                        <img className="bg-violet-10 hover:bg-violet-200 active:bg-violet-700 rounded-full p-10" src={weather?.current.condition.icon} alt="logo cuaca"/>
                    </section>

                    <section className="weather-status">
                        <h1 className="weather-temperature">{weather?.current.temp_c +"°C"}</h1>
                        <h3 className="local-time">{weather?.location.localtime}</h3>
                        <h2 className="weather-location">{weather?.location.country}</h2>
                    </section>

                    <section className="data-container">
                        <div className="element">
                            <img src={humidity_icon} alt="logo kelembaban udara"/>
                            <div className="data">
                                <h3 className="humidity-percent">{weather?.current.humidity+"%"}</h3>
                                <p className="text">Kelembaban</p>
                            </div>
                        </div>

                        <div className="element">
                            <img src={suhu_max} alt="logo temperatur maksimal"/>
                            <div className="data">
                                <h3 className="temperature-max">{weather?.current.temp_c+"°C"}</h3>
                                <p className="text">Max-Temperature</p>
                            </div>
                        </div>

                        <div className="element">
                            <img src={angin_icon} alt="logo hembusan angin"/>
                            <div className="data">
                                <h3 className="wind-speed">{weather?.current.wind_mph + "MpH"}</h3>
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
                        <p>{weather?.current.condition.code}</p>
                    </section>
                </Card>
                <Card border>
                    <section className="flex gap-2 flex-wrap flex-col items-center">
                        <p className="Country">Country</p>
                        <p>{weather?.location.country}</p>
                    </section>
                </Card>
                <Card border>
                    <section className="flex flex-wrap flex-col items-center">
                        <p className="Coordinate">Coordinate</p>
                        <p>{"lat:"+weather?.location.lat}; {"lon:"+weather?.location.lon}</p>
                    </section>
                </Card>
                <Card border>
                    <section className="flex flex-wrap flex-col items-center">
                        <p className="Weather">Weather</p>
                        <p className="id-icon">{weather?.current.condition.text}</p>                    </section>
                </Card>
                <Card border>
                    <section className="flex flex-wrap flex-col items-center">
                        <p className="Feelslike">{"Feels Like(°C)" }</p>
                        <p>{weather?.current.feelslike_c+"°C"}</p>
                    </section>
                </Card>
                <Card border>
                    <section className="flex flex-wrap flex-col items-center">
                        <p className="Pressure">{"Pressure(hPa)"}</p>
                        <p>{weather?.current.pressure_mb+"hPa"}</p>
                    </section>
                </Card>
                 
            </section>

            <Card border={false} className={'flex flex-wrap flex-col items-center m-4 mt-10 pt-10'}>
                <p className="mb-1 text-center text-sm text-slate-500">let's try to Weather Forecast List</p>
                <Button label="Press and Try Now" onClick={() => Navigate('/ConnectApi')}className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 mt-3 py-2 text-sm font-medium"/>
                <Button label="Another Page of Weather Finder" onClick={() => Navigate('/WeatherApp')}className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>
                <Button label="Home" onClick={() => Navigate('/')}className="text-gray-500 hover:bg-sky-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>

            </Card>

        </main>
    )
}

export default HomeContainer