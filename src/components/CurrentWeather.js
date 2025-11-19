// CurrentWeather.jsx
import { Cloud, CloudRain } from "lucide-react";

export const CurrentWeather = ({ meteo }) => {
  if (!meteo) return null;

  const temperature = Math.round(meteo.main.temp);
  const description = meteo.weather[0].description;
  const rain = meteo.rain?.["1h"] || 0;

  const date = new Date();
  const options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
  const formattedDate = date.toLocaleString("fr-FR", options);

  return (
    <div className="text-center italic mb-4">
      <h1 className="text-6xl font-light text-center italic mb-4">{temperature}°C</h1>
      <p className="text-gray-500 text-lg mt-2">{formattedDate}</p>

      <div className="border-b border-gray-300 my-4" />
      <div className="flex items-center gap-3 mt-4">
        <Cloud className="text-gray-400" size={26} />
        <span className="text-gray-600 text-lg capitalize">
          {description}
        </span>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <CloudRain className="text-blue-500" size={26} />
        <span className="text-gray-600 text-lg">
          Pluie – {rain ? rain * 10 : 30}%
        </span>
      </div>
    </div>
  );
};

export default CurrentWeather;
