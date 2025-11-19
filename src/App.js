import "./App.css";
import { useEffect, useState } from "react";
import { RécupérationMeteo } from "./components/fonction";
import { RécuperationPrevisionMeteo } from "./components/formation";
import IconMeteo from "./components/iconMeteo";
import { WeekForecast } from "./components/WeekForecast";
import { CurrentWeather } from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import HomePage from "./HomePage";

function App() {
  const [userData, setUserData] = useState(null);
  const [ville, setVille] = useState("Abidjan");
  const [meteo, setMeteo] = useState(null);
  const [unit, setUnit] = useState("C");
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (userData) {
      RécupérationMeteo("Abidjan").then((data) => setMeteo(data));
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const chargerPrevisions = async () => {
        const data = await RécuperationPrevisionMeteo(ville);
        if (data && data.daily) setForecast(data.daily);
      };
      chargerPrevisions();
    }
  }, [ville, userData]);

  const rechercheMeteo = async (villerechercher) => {
    const meteoData = await RécupérationMeteo(villerechercher);
    setMeteo(meteoData);
  };

  const handleUserSubmit = (data) => {
    setUserData(data);
  };

  if (!userData) {
    return <HomePage onSubmit={handleUserSubmit} />;
  }

  const astro = meteo?.forecast?.forecastday?.[0]?.astro;
  const wind_dir = meteo?.current?.wind_dir;
  const Wind_kph = meteo?.current?.wind_kph;
  const uvValue = meteo?.current?.uv || 0;
  const uvPercentage = (uvValue / 11) * 352;
  const humidity = meteo?.current?.humidity || 0;
  const visibility = meteo?.current?.vis_km || 0;
  const airQualityIndex = meteo?.current?.air_quality?.["us-epa-index"] || 0;

  if (!meteo)
    return <div className="text-center text-xl p-10">Chargement...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c1c2c6] p-6">
      <div className="w-[1300px] text-black grid grid-cols-3 rounded-3xl">
        <div className="col-span-1 bg-white flex flex-col justify-between p-6">
          
          <div className="bg-blue-100 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-700">
              Bienvenue, <span className="font-bold">{userData.prenom} {userData.nom}</span> 👋
            </p>
          </div>

          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Entre le nom de la ville rechercher"
              className="w-[200px] h-[30px] bg-white rounded-full text-black pl-4"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && rechercheMeteo(ville)}
            />
            <button
              onClick={() => rechercheMeteo(ville)}
              className="ml-4 w-[40px] h-[40px] bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-600"
            >
              🔍
            </button>
          </div>
          <IconMeteo icon={meteo?.current?.condition?.icon} />
          <CurrentWeather meteo={meteo} />
          <div
            className="relative mt-auto w-full h-44 bg-center bg-cover rounded-xl overflow-hidden"
            style={{ backgroundImage: `url('Photo.jpeg')` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold z-10">
              {meteo ? `${meteo.name} ,${meteo.name.slice(0,1)}, ${meteo.sys.country}` : "Abidjan , A, CI"}
            </h1>
          </div>
        </div>

        <div className="relative w-full p-8 col-span-2 bg-[#f7f6f9] flex flex-col">

          <div className="mb-6">
            <button className="text-gray-400 hover:text-gray-600 font-medium mr-3">
              Aujourd'hui
            </button>
            <button className="text-gray-800 font-semibold border-b-2 border-gray-800 pb-1">
              Semaine
            </button>
          </div>
          <div className="flex items-center gap-4 absolute top-5 right-5">
            <div className="flex bg-gray-800 rounded-full p-1">
              <button
                onClick={() => setUnit("C")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  unit === "C" ? "bg-white text-gray-800" : "text-white"
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit("F")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  unit === "F" ? "bg-white text-gray-800" : "text-white"
                }`}
              >
                °F
              </button>
            </div>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {userData.prenom[0]}{userData.nom[0]}
            </div>
          </div>

          <div className="App">
            {forecast ? (
              <WeekForecast forecast={forecast} unit={unit} />
            ) : (
              <div>Aucune donnée reçue</div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 p-2">
              LES TEMPS FORTS D'AUJOURD'HUI
            </h2>

            <WeatherDetails
              uvValue={uvValue}
              uvPercentage={uvPercentage}
              Wind_kph={Wind_kph}
              wind_dir={wind_dir}
              astro={astro}
              humidity={humidity}
              visibility={visibility}
              airQualityIndex={airQualityIndex}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;