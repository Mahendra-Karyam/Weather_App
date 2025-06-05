// import "./style.css";
// import { Search, CloudLightning } from "react-feather";
// import axios from "axios";
// import { useState, useEffect } from "react";

// export default function Main() {
//   const [weatherDetails, setWeatherDetails] = useState(null);
//   const [city, setCity] = useState("");
//   const [humidity, setHumidity] = useState(null);
//   const [windSpeed, setWindSpeed] = useState(null);

//   const fetchData = () => {
//     if (!city) return; // Prevent empty search
//     axios
//       .get(
//         `https://api.weatherapi.com/v1/current.json?key=ecf254c5d6a2430daa0142700250603&q=${city}`
//       )
//       .then((res) => {
//         setWeatherDetails(res.data); // Store API response in state
//         setHumidity(res.data.current.humidity);
//         setWindSpeed(res.data.current.wind_kph);
//       })
//       .catch((err) => {
//         console.error("Error fetching weather:", err);
//         setWeatherDetails(null);
//       });
//   };

//   //   useEffect(() => {
//   //     fetchData(); // Fetch weather data on component mount
//   //   }, []);
//   function weatherAppBackgroundColor(C) {
//     if (!city) {
//       return "bg-cyan-200";
//     }
//     if (C <= -20) {
//       return "bg-gradient-to-b from-blue-100 to-blue-300"; // Freezing Cold
//     } else if (C > -20 && C <= 0) {
//       return "bg-gradient-to-b from-blue-200 to-blue-400"; // Very Cold
//     } else if (C > 0 && C <= 15) {
//       return "bg-gradient-to-b from-blue-300 to-green-200"; // Cool
//     } else if (C > 15 && C <= 25) {
//       return "bg-gradient-to-b from-green-200 via-yellow-200 to-orange-200"; // Mild
//     } else if (C > 25 && C <= 35) {
//       return "bg-gradient-to-b from-yellow-200 via-orange-300 to-red-200"; // Warm
//     } else if (C > 35 && C <= 45) {
//       return "bg-gradient-to-b from-orange-200 to-red-300"; // Hot
//     } else {
//       return "bg-gradient-to-b from-orange-300 to-red-400"; // Extreme Heat
//     }
//   }

//   return (
//     <div className="h-screen w-screen flex justify-center items-center bg-slate-900">
//       <div
//         className={`flex flex-col justify-between items-center rounded-lg py-12 px-4 shadow-lg ${weatherAppBackgroundColor(
//           weatherDetails?.current?.temp_c
//         )}`}
//       >
//         {/* Search Bar */}
//         <div className="flex items-center w-full gap-2 text-gray-400">
//           <input
//             type="search"
//             placeholder="Enter city name"
//             className="px-4 py-2 w-full outline-none rounded-full bg-white"
//             onChange={(e) => setCity(e.target.value)}
//           />
//           <div
//             className="rounded-full p-2 cursor-pointer bg-white"
//             onClick={city ? fetchData : null}
//           >
//             <Search />
//           </div>
//         </div>

//         {/* Weather Icon */}
//         {city && (
//           <>
//             <div className="mt-12">
//               <div>
//                 <img
//                   src={weatherDetails?.current?.condition?.icon}
//                   width={100}
//                 />
//               </div>
//             </div>

//             {/* Temperature & City */}
//             <div className="flex flex-col justify-center items-center mt-12">
//               <h1 className="!text-5xl !font-medium">
//                 {weatherDetails?.current?.temp_c}
//                 <sup>°</sup>C
//               </h1>
//               <h5 className="!text-2xl !font-medium text-gray-600">
//                 {weatherDetails?.location?.name}
//               </h5>
//             </div>

//             {/* Humidity and Wind Speed */}
//             <div className="mt-12 flex justify-between w-full px-4">
//               <div className="flex items-center gap-2">
//                 <img
//                   src="https://www.svgrepo.com/show/455067/water.svg"
//                   width={30}
//                   alt="Humidity"
//                 />
//                 <div className="text-start">
//                   {humidity && (
//                     <div className="text-lg font-semibold">{humidity}%</div>
//                   )}
//                   <div className="text-gray-700 text-sm">Humidity</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <img
//                   src="https://www.svgrepo.com/show/358416/wind.svg"
//                   width={30}
//                   alt="Wind Speed"
//                 />
//                 <div className="text-start">
//                   {windSpeed && (
//                     <div className="text-lg font-semibold">
//                       {windSpeed} km/h
//                     </div>
//                   )}
//                   <div className="text-gray-700 text-sm">Wind Speed</div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import "./style.css";
import { Search } from "react-feather";
import axios from "axios";
import { useState } from "react";

export default function Main() {
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [city, setCity] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!city.trim()) return; // Prevent empty search
    setLoading(true);

    try {
      const res = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=ecf254c5d6a2430daa0142700250603&q=${city}`
      );
      setWeatherDetails(res.data);
      setHumidity(res.data.current.humidity);
      setWindSpeed(res.data.current.wind_kph);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  function weatherAppBackgroundColor(C) {
    if (C === undefined) return "bg-gradient-to-b from-blue-300 to-green-300";
    if (C <= -20) return "bg-gradient-to-b from-blue-100 to-blue-300";
    if (C > -20 && C <= 0) return "bg-gradient-to-b from-blue-200 to-blue-400";
    if (C > 0 && C <= 15) return "bg-gradient-to-b from-blue-300 to-green-200";
    if (C > 15 && C <= 25)
      return "bg-gradient-to-b from-green-200 via-yellow-200 to-orange-200";
    if (C > 25 && C <= 35)
      return "bg-gradient-to-b from-yellow-200 via-orange-300 to-red-200";
    if (C > 35 && C <= 45) return "bg-gradient-to-b from-orange-200 to-red-300";
    return "bg-gradient-to-b from-orange-300 to-red-400";
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-900">
      <div
        className={`flex flex-col justify-between items-center rounded-lg py-12 px-4 shadow-lg ${weatherAppBackgroundColor(
          weatherDetails?.current?.temp_c
        )}`}
      >
        {/* Search Bar */}
        <div className="flex items-center w-full gap-2 text-gray-400">
          <input
            type="search"
            placeholder="Enter city name"
            className="px-4 py-2 w-full outline-none rounded-full bg-white"
            onChange={(e) => {
              const value = e.target.value.trim();
              setCity(value);
              if (!value) setWeatherDetails(null);
            }}
          />
          <div
            className="rounded-full p-2 cursor-pointer bg-white"
            onClick={fetchData}
          >
            <Search />
          </div>
        </div>

        {/* Loading State */}
        {loading && <p className="text-gray-600">Fetching weather...</p>}

        {/* Weather Data */}
        {weatherDetails && !loading && (
          <>
            {/* Weather Icon */}
            <div className="mt-12">
              <img
                src={weatherDetails?.current?.condition?.icon}
                width={100}
                alt="Weather Icon"
              />
            </div>

            {/* Temperature & City */}
            <div className="flex flex-col justify-center items-center mt-12">
              <h1 className="!text-5xl !font-medium">
                {weatherDetails?.current?.temp_c}
                <sup>°</sup>C
              </h1>
              <h5 className="!text-2xl !font-medium text-gray-600">
                {weatherDetails?.location?.name}
              </h5>
            </div>

            {/* Humidity and Wind Speed */}
            <div className="mt-12 flex justify-between w-full px-4">
              <div className="flex items-center gap-2">
                <img
                  src="https://www.svgrepo.com/show/455067/water.svg"
                  width={30}
                  alt="Humidity"
                />
                <div className="text-start">
                  <div className="text-lg font-semibold">{humidity}%</div>
                  <div className="text-gray-700 text-sm">Humidity</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="https://www.svgrepo.com/show/358416/wind.svg"
                  width={30}
                  alt="Wind Speed"
                />
                <div className="text-start">
                  <div className="text-lg font-semibold">{windSpeed} km/h</div>
                  <div className="text-gray-700 text-sm">Wind Speed</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
