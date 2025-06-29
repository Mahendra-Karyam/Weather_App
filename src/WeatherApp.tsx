import "./style.css";
import { Search } from "react-feather";
import axios from "axios";
import { useState } from "react";

type WeatherDetails = {
  location: { name: string };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    condition: { icon: string };
  };
};

export default function Main() {
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>(
    null
  );
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeatherDetails(null);

    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=ecf254c5d6a2430daa0142700250603&q=${city}`
      );
      setWeatherDetails(res.data);
    } catch (err) {
      setError("No results found");
    } finally {
      setLoading(false);
    }
  };

  function weatherAppBackgroundColor(temp: number | undefined): string {
    if (temp === undefined)
      return "bg-gradient-to-b from-blue-300 to-green-300";
    if (temp <= -20) return "bg-gradient-to-b from-blue-100 to-blue-300";
    if (temp <= 0) return "bg-gradient-to-b from-blue-200 to-blue-400";
    if (temp <= 15) return "bg-gradient-to-b from-blue-300 to-green-200";
    if (temp <= 25)
      return "bg-gradient-to-b from-green-200 via-yellow-200 to-orange-200";
    if (temp <= 35)
      return "bg-gradient-to-b from-yellow-200 via-orange-300 to-red-200";
    if (temp <= 45) return "bg-gradient-to-b from-orange-200 to-red-300";
    return "bg-gradient-to-b from-orange-300 to-red-400";
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-900 px-4">
      <div
        className={`w-full max-w-xl rounded-2xl shadow-2xl px-6 py-10 flex flex-col items-center gap-6 ${weatherAppBackgroundColor(
          weatherDetails?.current?.temp_c
        )}`}
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-black text-center">
          Weather App
        </h1>

        {/* Search Section */}
        <div className="flex w-full items-center gap-2">
          <input
            type="search"
            placeholder="Ex: Hyderabad"
            className="px-4 py-2 rounded-full w-full bg-white outline-none shadow-md"
            onChange={(e) => {
              const value = e.target.value.trim();
              setCity(value);
              if (!value) {
                setWeatherDetails(null);
                setError("");
              }
            }}
          />
          <button
            onClick={fetchData}
            className="bg-white p-2 !rounded-full hover:bg-gray-200 transition"
            aria-label="Search Weather"
          >
            <Search />
          </button>
        </div>

        {/* Error message below input */}
        {error && <p className="text-red-600 text-sm mt-[-8px]">{error}</p>}

        {/* Loading */}
        {loading && (
          <p className="text-gray-700 text-center">Fetching weather...</p>
        )}

        {/* Weather Details */}
        {weatherDetails && !loading && !error ? (
          weatherDetails.location.name.toLowerCase() !== city.toLowerCase() ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-red-600 text-lg font-semibold">
                No results found
              </p>
            </div>
          ) : (
            <>
              <img
                src={weatherDetails.current.condition.icon}
                width={100}
                alt="Weather Icon"
                className="mt-4"
              />

              <div className="text-center">
                <h1 className="text-5xl font-bold">
                  {weatherDetails.current.temp_c}
                  <sup>°</sup>C
                </h1>
                <h5 className="text-2xl font-medium text-gray-700 mt-1">
                  {weatherDetails.location.name}
                </h5>
              </div>

              <div className="flex justify-between gap-4 mt-8 w-full">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow w-1/2">
                  <img
                    src="https://www.svgrepo.com/show/455067/water.svg"
                    width={30}
                    alt="Humidity"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {weatherDetails.current.humidity}%
                    </p>
                    <p className="text-sm text-gray-600">Humidity</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow w-1/2">
                  <img
                    src="https://www.svgrepo.com/show/358416/wind.svg"
                    width={30}
                    alt="Wind Speed"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {weatherDetails.current.wind_kph} km/h
                    </p>
                    <p className="text-sm text-gray-600">Wind Speed</p>
                  </div>
                </div>
              </div>
            </>
          )
        ) : null}
      </div>
    </div>
  );
}
