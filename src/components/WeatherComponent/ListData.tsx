// import React, { useState,useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Card } from '..';



// interface MainData {
//     humidity: number;
//     temp_max: number;
//     temp: number;
// }

// interface WindData {
//     speed: number;
// }

// interface WeatherData {
//     icon :string;
//     description : string;
// }

// interface AppData {
//     main : MainData;
//     weather : {[key:number]: WeatherData};
//     wind : WindData;
//     name : string;
// }

// const DataComponent: React.FC = () => {
//     const [api_key] = useState<string>("6e33f37dca5a8579ee77037a9d2d2929");
//     const [weather, setWeather] = useState<AppData | null>(null);
//     const searchRef = useRef<HTMLInputElement | null>(null);
//     const [data, setData] = useState<AppData[]>([]);

//     const search = async () => {
//         try {
//             let location = searchRef?.current?.value ? searchRef?.current?.value : "Indonesia";
//             let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`);
//             setWeather(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             // Handle the error (e.g., show an error message to the user)
//         }
//     };

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`);
//             setData([response.data]);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <main className="container">
//             {/* ... */}
//             <section className="data-container">
//                 {/* ... */}
//             </section>
//             <Card border={false} className={'flex flex-wrap flex-col items-center'}>
//                 {/* ... */}
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Location</th>
//                             <th>Temperature</th>
//                             <th>Status</th>
//                             <th>Wind Speed</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((item) => (
//                             <tr key={item.name}>
//                                 <td>{item.name}</td>
//                                 <td>{item.main.temp}</td>
//                                 <td>{item.main.humidity}</td>
//                                 <td>{item.wind.speed}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </Card>
//         </main>
//     );
// };

// export default DataComponent;