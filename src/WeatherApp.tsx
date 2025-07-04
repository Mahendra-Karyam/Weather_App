import "./style.css";
import { Search } from "react-feather";
import axios from "axios";
import { useState } from "react";

type WeatherDetails = {
  location: {
    name: string;
    region: string;
    country: string;
  };
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
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    setLoading(true);
    setError("");
    setWeatherDetails(null);

    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=ecf254c5d6a2430daa0142700250603&q=${trimmedCity}`
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
    <div className="min-h-screen w-screen flex justify-center items-center bg-slate-900 overflow-hidden font-['Times-New-Roman']">
      <div
        className={`w-full max-w-xl max-h-[95vh] overflow-y-auto rounded-2xl shadow-xl px-4 py-4 flex flex-col items-center gap-4 ${weatherAppBackgroundColor(
          weatherDetails?.current?.temp_c
        )}`}
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-black text-center">
          Weather App
        </h1>

        {/* Search Section */}
        <form
          className="flex w-full items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            fetchData();
          }}
        >
          <input
            type="search"
            placeholder="Search city or country"
            autoFocus
            className="px-3 py-1.5 rounded-full w-full bg-white outline-none shadow"
            onChange={(e) => {
              setCity(e.target.value);
              if (!e.target.value.trim()) {
                setWeatherDetails(null);
                setError("");
              }
            }}
            value={city}
          />
          <button
            type="submit"
            className="bg-white p-2 !rounded-full hover:bg-gray-200 transition"
            aria-label="Search Weather"
          >
            <Search />
          </button>
        </form>

        {/* Error message */}
        {error && !loading && (
          <p className="text-red-600 text-base font-semibold">{error}</p>
        )}

        {/* Loading message */}
        {loading && (
          <p className="text-gray-700 text-center text-sm">
            Fetching weather...
          </p>
        )}

        {/* Weather Details */}
        {weatherDetails && !loading && !error && (
          <>
            <img
              src={weatherDetails.current.condition.icon}
              width={70}
              alt="Weather Icon"
              className="mt-2"
            />

            <div className="text-center">
              <h1 className="text-4xl font-bold">
                {weatherDetails.current.temp_c}
                <sup>°</sup>C
              </h1>
              <h5 className="text-lg font-medium text-gray-700 mt-1">
                {weatherDetails.location.name},{" "}
                {weatherDetails.location.region},{" "}
                {weatherDetails.location.country}
              </h5>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4 w-full">
              <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow w-full sm:w-1/2">
                <img
                  src="https://www.svgrepo.com/show/455067/water.svg"
                  width={24}
                  alt="Humidity"
                />
                <div>
                  <p className="text-base font-semibold text-gray-800">
                    {weatherDetails.current.humidity}%
                  </p>
                  <p className="text-xs text-gray-600">Humidity</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow w-full sm:w-1/2">
                <img
                  src="https://www.svgrepo.com/show/358416/wind.svg"
                  width={24}
                  alt="Wind Speed"
                />
                <div>
                  <p className="text-base font-semibold text-gray-800">
                    {weatherDetails.current.wind_kph} km/h
                  </p>
                  <p className="text-xs text-gray-600">Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
