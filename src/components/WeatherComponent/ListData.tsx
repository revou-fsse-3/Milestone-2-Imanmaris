import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card } from '..';
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

interface ConditionData5{
    text:string;
    icon:string;
    code: number;
}



interface HourData {
    heatindex_c: number;
    condition: ConditionData5;
    wind_mph: number;
    pressure_mb:number;
    humidity: number;
    feelslike_c:number;
    temp_c: number;    
  }
interface ForecastDay {
    hour: {[key:number]:HourData};
    date: string;
}

interface ForcaseData {
    forecasteday : {[key:number]:ForecastDay}
}

interface AppData {
    forecast: ForcaseData;
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
  forecast: ForcaseData;
}

const ListData: React.FC = () => {
  const [api_key] = useState<string>("6cd366cb3d634eb8b0c21922241201");
  const [data, setData] = useState<AppData[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=Indonesia&days=7`);
//       setData([response.data]);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
    const search = async () => {
    let location = searchRef?.current?.value ? searchRef?.current?.value : "Indonesia";
   
    console.log(location);

    // let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
    // let response = await fetch(url);
    // let data: AppData = await response.json();
    // setData(data)
        try {
          const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=7`);
          setData([response.data]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    
        console.log (data);
    
    };

    useEffect(() => {
        // fetchDetail();
        search();
    }, []);

  return (
    <main >

        <section className="top-bar mb-10">
                <input type="text" className="cityInput " placeholder="Search" ref={searchRef} />
                <div className="search-icon" onClick={()=>{(search())}}>
                    <img className="h-7 w-auto" src={search_icon} alt="search logo"/>
                </div>
        </section>

        <section>
            <Card border={false}>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <h2 className='font-bold text-xl text-slate-500'>{item.location.country}</h2>
                        <p>{item.location.localtime}</p>

                        <img
                        className="m-5 bg-violet-50 hover:bg-violet-200 active:bg-violet-700 rounded-full p-5"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>

                        <div className='flex gap-7 justify-center items-center mt-4'>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={suhu_max} alt="logo suhu udara"/> {item.current.temp_c}°C</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={humidity_icon} alt="logo kelembaban udara"/>{item.current.humidity}%</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={angin_icon} alt="logo kecepatan udara"/>{item.current.wind_mph} m/s</p>
                        </div>
                    </section>
                ))}
            </Card>
        </section>

        <section className='grid gap-4 grid-cols-2 mt-10'>
            <Card border>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <h2 >{"Senin"}</h2>
                        <p className='mb-3'>{item.forecast.forecasteday[2].date}</p>
                        <img
                        className="m-5 bg-violet-50 hover:bg-violet-200 active:bg-violet-700 rounded-full p-5"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>
                        
                        <div className='text-xs flex gap-2 justify-center items-center mt-2'>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={suhu_max} alt="logo suhu udara"/> {item.current.temp_c}°C</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={humidity_icon} alt="logo kelembaban udara"/>{item.current.humidity}%</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={angin_icon} alt="logo kecepatan udara"/>{item.current.wind_mph} m/s</p>
                        </div>
                    </section>
                ))}
            </Card>

            <Card border>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <h2 >{"Selasa"}</h2>
                        <p className='mb-3'>{item.location.localtime}</p>
                        <img
                        className="m-5 bg-violet-50 hover:bg-violet-200 active:bg-violet-700 rounded-full p-5"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>
                        
                        <div className='text-xs flex gap-2 justify-center items-center mt-2'>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={suhu_max} alt="logo suhu udara"/> {item.current.temp_c}°C</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={humidity_icon} alt="logo kelembaban udara"/>{item.current.humidity}%</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={angin_icon} alt="logo kecepatan udara"/>{item.current.wind_mph} m/s</p>
                        </div>
                    </section>
                ))}
            </Card>

            <Card border>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <h2 >{"Rabu"}</h2>
                        <p className='mb-3'>{item.location.localtime}</p>
                        <img
                        className="m-5 bg-violet-50 hover:bg-violet-200 active:bg-violet-700 rounded-full p-5"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>
                        
                        <div className='text-xs flex gap-2 justify-center items-center mt-2'>                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={suhu_max} alt="logo suhu udara"/> {item.current.temp_c}°C</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={humidity_icon} alt="logo kelembaban udara"/>{item.current.humidity}%</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={angin_icon} alt="logo kecepatan udara"/>{item.current.wind_mph} m/s</p>
                        </div>
                    </section>
                ))}
            </Card>

            <Card border>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <h2 >{"Kamis"}</h2>
                        <p className='mb-3'>{item.location.localtime}</p>
                        <img
                        className="m-5 bg-violet-50 hover:bg-violet-200 active:bg-violet-700 rounded-full p-5"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>
                        
                        <div className='text-xs flex gap-2 justify-center items-center mt-2'>                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={suhu_max} alt="logo suhu udara"/> {item.current.temp_c}°C</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={humidity_icon} alt="logo kelembaban udara"/>{item.current.humidity}%</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={angin_icon} alt="logo kecepatan udara"/>{item.current.wind_mph} m/s</p>
                        </div>
                    </section>
                ))}
            </Card>      

            <Card border>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <h2 >{"Jumat"}</h2>
                        <p className='mb-3'>{item.location.localtime}</p>
                        <img
                        className="m-5 bg-violet-50 hover:bg-violet-200 active:bg-violet-700 rounded-full p-5"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>
                        
                        <div className='text-xs flex gap-2 justify-center items-center mt-2'>                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={suhu_max} alt="logo suhu udara"/> {item.current.temp_c}°C</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={humidity_icon} alt="logo kelembaban udara"/>{item.current.humidity}%</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={angin_icon} alt="logo kecepatan udara"/>{item.current.wind_mph} m/s</p>
                        </div>
                    </section>
                ))}
            </Card>

            <Card border>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <h2 >{"Sabtu"}</h2>
                        <p className='mb-3'>{item.location.localtime}</p>
                        <img
                        className="m-5 bg-violet-50 hover:bg-violet-200 active:bg-violet-700 rounded-full p-5"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>
                        
                        <div className='text-xs flex gap-2 justify-center items-center mt-2'>                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={suhu_max} alt="logo suhu udara"/> {item.current.temp_c}°C</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={humidity_icon} alt="logo kelembaban udara"/>{item.current.humidity}%</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={angin_icon} alt="logo kecepatan udara"/>{item.current.wind_mph} m/s</p>
                        </div>
                    </section>
                ))}
            </Card>

            <Card border className='col-start-1 col-end-3'>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <h2 >{"Minggu"}</h2>
                        <p className='mb-3'>{item.location.localtime}</p>
                        <img
                        className="m-5 bg-violet-50 hover:bg-violet-200 active:bg-violet-700 rounded-full p-5"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>
                        
                        <div className='text-xs flex gap-2 justify-center items-center mt-2'>                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={suhu_max} alt="logo suhu udara"/> {item.current.temp_c}°C</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={humidity_icon} alt="logo kelembaban udara"/>{item.current.humidity}%</p>
                            <p className='flex justify-center items-center'><img className='h-8 w-auto' src={angin_icon} alt="logo kecepatan udara"/>{item.current.wind_mph} m/s</p>
                        </div>
                    </section>
                ))}
            </Card>       
 
        </section>

        {/* <section className='flex'>
            <Card border>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <img
                        className="bg-violet-100 hover:bg-violet-200 active:bg-violet-700 rounded-full"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>
                        <p>{item.location.country}</p>
                        <p>Temperature: {item.current.temp_c}°C</p>
                        <p>Humidity: {item.current.humidity}%</p>
                        <p>Wind Speed: {item.current.wind_mph} m/s</p>
                    </section>
                ))}
            </Card>

            <Card border>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <img
                        className="bg-violet-100 hover:bg-violet-200 active:bg-violet-700 rounded-full"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>
                        <p>{item.location.country}</p>
                        <p>Temperature: {item.current.temp_c}°C</p>
                        <p>Humidity: {item.current.humidity}%</p>
                        <p>Wind Speed: {item.current.wind_mph} m/s</p>
                    </section>
                ))}
            </Card>
        </section> */}

    </main>
  );
};

export default ListData;