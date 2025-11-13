import "./App.css";
import { useEffect, useState } from "react";
import { RécupérationMeteo } from "./components/fonction";
import { RécuperationPrevisionMeteo } from "./components/formation";
import IconMeteo from "./components/iconMeteo";
import { WeekForecast } from "./components/WeekForecast";
import { Wind, Sun, Moon } from "lucide-react";

function App() {
  const [ville, setVille] = useState("Abidjan");
  const [meteo, setMeteo] = useState();
  const [unit, setUnit] = useState("C");
  const [forecast, setForecast] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // console.log("recuperation des données meteo ")
      const meteoData = await RécupérationMeteo();
      //console.log("fin recuperation")
      setMeteo(meteoData);
      //console.log(meteoData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const chargerPrevisions = async () => {
      const data = await RécuperationPrevisionMeteo(ville);
      if (data && data.daily) setForecast(data.daily);
      console.log(data.daily);
    };

    chargerPrevisions();
  }, [ville]);

  const rechercheMeteo = async (villerechercher) => {
    const meteoData = await RécupérationMeteo(villerechercher);
    setMeteo(meteoData);
    console.log(`VILLE RECHERCHER ${villerechercher}`);
    console.log(meteoData);
  };

  const dateActuelle = new Date();
  // extraire toutes les données nécessaires de l'objet meteo
  const astro = meteo?.forecast?.forecastday?.[0]?.astro;
  const wind_dir = meteo?.current?.wind_dir;
  const Wind_kph = meteo?.current?.wind_kph;
  const uvValue = meteo?.current?.uv || 0;
  const uvPercentage = (uvValue / 11) * 352;

  // ajoute des variables manquantes
  const humidity = meteo?.current?.humidity || 0;
  const visibility = meteo?.current?.vis_km || 0;
  const airQualityIndex = meteo?.current?.air_quality?.["us-epa-index"] || 0;

  return (
    <div className="relative flex items-center justify-center bg-[#c1c2c6] p-6 p-5">
      <div className="w-[1300px] text-black grid grid-cols-3 rounded-3xl">
        <div className="col-span-1 text-black bg-[#ffffff] flex-col p-6">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Entre le nom de la ville rechercher"
              className="w-[200px] h-[30px] bg-white rounded-full text-black pl-4"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  rechercheMeteo(e.target.value);
                }
              }}
            />
            <button
              onClick={() => rechercheMeteo(ville)}
              className="ml-4 w-[40px] h-[40px] bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600"
            >
              🔍
            </button>
          </div>

          {meteo && meteo.weather && <IconMeteo icon={meteo.weather[0].icon} />}
          {meteo && meteo.main ? (
            <h1 className="text-black text-center italic text-5xl mb-4">
              {meteo.main.temp} °C
            </h1>
          ) : null}
          <p className="text-black m-5 text-center">
            {dateActuelle.toLocaleDateString("fr-FR", { weekday: "long" })} ,
            {dateActuelle.getHours()}:
            {dateActuelle.getMinutes().toString().padStart(2, "0")}
          </p>

          <div
            className="relative w-full h-44 bg-center bg-cover rounded-xl overflow-hidden"
            style={{ backgroundImage: `url('Photo.jpeg')` }}
          >
            ;<div className="absolute inset-0 bg-black/40"></div>
            <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold z-10">
              {"Abidjan, A, CI"}
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
            <img
              src="Profils192.jpeg"
              alt="Profils192"
              className="w-10 h-10 rounded-full"
            />
          </div>
          {/*        
       <div className="p-6 bg-blue-50 min-h-screen h-44">
         <h1 className="text-3xl font-bold text-center mb-6">
         </h1>

        </div> */}

          <div className="App">
            <h1 className="text-2xl font-bold text-center mt-6">
              Prévisions météo
            </h1>
            {forecast ? <WeekForecast forecast={forecast} unit={unit} /> : <div>aucune donnée recu </div>}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              LES TEMPS FORTS D'AUJOURD'HUI
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
                <div className="text-gray-600 text-sm mb-4">Indice UV</div>
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#fbbf24"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${uvPercentage} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-gray-800">
                      {Math.round(uvValue)}
                    </div>
                  </div>
                </div>
                <div className="text-center text-xs text-gray-400 mt-2">
                  Faible 0-2 | Modéré 3-5 | Élevé 6-7
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
                <div className="text-gray-600 text-sm mb-4">État du vent</div>
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {Wind_kph ? Wind_kph.toFixed(1) : "8.7"}
                  <span className="text-2xl font-normal">km/h</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <Wind size={16} className="text-white" />
                  </div>
                  <span className="text-sm">{wind_dir || "WSW"}</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
                <div className="text-gray-600 text-sm mb-4">
                  Lever et coucher du soleil
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Sun size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">
                        {astro?.sunrise || "6:35 AM"}
                      </div>
                      <div className="text-xs text-gray-400">Lever</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                      <Moon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">
                        {astro?.sunset || "6:42 PM"}
                      </div>
                      <div className="text-xs text-gray-400">Coucher</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
                <div className="text-gray-600 text-sm mb-4">Humidité</div>
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {humidity}
                  <span className="text-2xl font-normal">%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {humidity < 30
                      ? "Faible"
                      : humidity < 60
                      ? "Normal"
                      : "Élevé"}
                  </span>
                  <span>
                    {humidity < 30 ? "😐" : humidity < 60 ? "👍" : "💧"}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
                <div className="text-gray-600 text-sm mb-4">Visibilité</div>
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {visibility ? visibility.toFixed(1) : "15"}
                  <span className="text-2xl font-normal">km</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {visibility > 10
                      ? "Excellente"
                      : visibility > 5
                      ? "Bonne"
                      : "Moyenne"}
                  </span>
                  <span>
                    {visibility > 10 ? "😊" : visibility > 5 ? "🙂" : "😐"}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
                <div className="text-gray-600 text-sm mb-4">
                  Qualité de l'air
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {airQualityIndex || "25"}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {airQualityIndex <= 50
                      ? "Bonne"
                      : airQualityIndex <= 100
                      ? "Modérée"
                      : "Malsaine"}
                  </span>
                  <span>
                    {airQualityIndex <= 50
                      ? "😊"
                      : airQualityIndex <= 100
                      ? "😐"
                      : "😷"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
