import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '..';

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

const ListData: React.FC = () => {
  const [api_key] = useState<string>("6cd366cb3d634eb8b0c21922241201");
  const [data, setData] = useState<AppData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=Indonesia&days=7`);
      setData([response.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main >
        <section>
            <Card border={false}>
                {data.map((item, index) => (
                    <section key={index} className="flex flex-wrap flex-col items-center">
                        <img
                        className="bg-violet-100 hover:bg-violet-200 active:bg-violet-700 rounded-full"
                        src= {item.current.condition.icon}
                        alt="logo cuaca"
                        />
                        <p className="description">{item.current.condition.text}</p>
                        <p>{item.location.country}</p>
                        <div className='flex gap-4'>
                            <p>Temperature: {item.current.temp_c}°C</p>
                            <p>Humidity: {item.current.humidity}%</p>
                            <p>Wind Speed: {item.current.wind_mph} m/s</p>
                        </div>
                    </section>
                ))}
            </Card>
        </section>

        <section className='grid gap-4 grid-cols-2'>
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