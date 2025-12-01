// import "./App.css";
// import { useEffect, useState } from "react";
// import { RécupérationMeteoComplete } from "./components/fonction";
// import { RécuperationPrevisionMeteo } from "./components/formation";
// import IconMeteo from "./components/iconMeteo";
// import { WeekForecast } from "./components/WeekForecast";
// import { CurrentWeather } from "./components/CurrentWeather";
// import WeatherDetails from "./components/WeatherDetails";
// import HomePage from "./HomePage";
// import MapSelector from "./components/map";
// // import { Loader2 } from 'lucide-react';

// function App() {
//   const [userData, setUserData] = useState(null);
//   const [ville, setVille] = useState("Abidjan");
//   const [meteo, setMeteo] = useState(null);
//   const [unit, setUnit] = useState("C");
//   const [forecast, setForecast] = useState(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showMapModal, setShowMapModal] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState({
//     lat: 5.3600, // Coordonnées par défaut d'Abidjan
//     lng: -4.0083
//   });

//   // Charger la météo complète quand userData existe
//   useEffect(() => {
//     if (userData) {
//       RécupérationMeteoComplete("Abidjan").then((data) => setMeteo(data));
//     }
//   }, [userData]);

//   // Charger les prévisions météo
//   useEffect(() => {
//     if (userData) {
//       const chargerPrevisions = async () => {
//         const data = await RécuperationPrevisionMeteo(ville);
//         if (data && data.daily) setForecast(data.daily);
//       };
//       chargerPrevisions();
//     }
//   }, [ville, userData]);

//   const rechercheMeteo = async (villerechercher) => {
//     const meteoData = await RécupérationMeteoComplete(villerechercher);
//     setMeteo(meteoData);
//   };

//   // Chargement user depuis le localStorage
//   useEffect(() => {
//     const savedUserData = localStorage.getItem("meteoUserData");
//     if (savedUserData) {
//       setUserData(JSON.parse(savedUserData));
//     }
//   }, []);

//   // Sauvegarder utilisateur (user)
//   const handleUserSubmit = (data) => {
//     setUserData(data);
//     localStorage.setItem("meteoUserData", JSON.stringify(data));
//   };

//   // Gérer le changement de localisation depuis la carte
//   const handleLocationChange = (lat, lng) => {
//     setSelectedLocation({ lat, lng });
//     console.log("Nouvelle position sélectionnée:", { lat, lng });
//   };

//   // Confirmer la sélection de la carte et récupérer la météo par coordonnées
//   const handleMapConfirm = async () => {
//     try {
//       console.log("Coordonnées confirmées:", selectedLocation);
      
//       // Vous pouvez ajouter ici une fonction pour récupérer la météo par coordonnées
//       // const meteoData = await RécupérationMeteo(selectedLocation.lat, selectedLocation.lng);
//       // setMeteo(meteoData); 
//       setShowMapModal(false);
//     } catch (error) {
//       console.error("Erreur lors de la récupération de la météo par coordonnées:", error);
//     }
//   };

//   // Déconnexion
//   const logout = () => {
//     localStorage.removeItem("meteoUserData");
//     setUserData(null);
//     setShowLogoutModal(false);
//   };

//   if (!userData) {
//     return <HomePage onSubmit={handleUserSubmit} />;
//   }

//   const wind_dir = meteo?.wind?.deg || 0;
//   const Wind_kph = (meteo?.wind?.speed || 0) * 3.6;
//   const uvValue = meteo?.uv || 0;
//   const uvPercentage = (uvValue / 11) * 352;
//   const humidity = meteo?.main?.humidity || 0;
//   const visibility = (meteo?.visibility || 0) / 1000;
//   const airQualityIndex = meteo?.airQuality || 0;

//   const astro = {
//     sunrise: meteo?.sunrise || "06:35",
//     sunset: meteo?.sunset || "18:42"
//   };

  
 
// // if ( SimpleSpinner ) {
// //   return (
// //     <div className="flex justify-center items-center p-8">
// //       <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
// //     </div>
// //   );


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#c1c2c6] p-6">
//       <div className="w-[1300px] text-black grid grid-cols-3 rounded-3xl">
//         <div className="col-span-1 bg-white flex flex-col justify-between p-6 rounded-l-3xl">
//           <div className="bg-blue-100 p-3 rounded-lg mb-4">
//             <p className="text-sm text-gray-700">
//               Bienvenue, <span className="font-bold">{userData.prenom} {userData.nom}</span> 👋
//             </p>
//           </div>

//           <div className="flex mb-4">
//             <input
//               type="text"
//               placeholder="Entre le nom de la ville rechercher"
//               className="w-full p-2 rounded-lg bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={ville}
//               onChange={(e) => setVille(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && rechercheMeteo(ville)}
//             />
//             <button
//               onClick={() => rechercheMeteo(ville)}
//               className="ml-4 w-[40px] h-[40px] bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-600"
//             >
//               🔍
//             </button>
//           </div>

//           <IconMeteo icon={meteo?.weather?.[0]?.icon} />
//           <CurrentWeather meteo={meteo} />

//           <div
//             className="relative mt-auto w-full h-44 bg-center bg-cover rounded-xl overflow-hidden"
//             style={{ backgroundImage: `url('Photos.jfif')` }}
//           >
//             <div className="absolute inset-0 bg-black/40"></div>
//             <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold z-10">
//               {meteo ? `${meteo.name} ,${meteo.name.slice(0,1)}, ${meteo.sys.country}` : "Abidjan , A, CI"}
//             </h1>
//           </div>
//         </div>

//         <div className="relative w-full p-8 col-span-2 bg-[#f7f6f9] flex flex-col rounded-r-3xl">
//           <div className="mb-6 flex items-center gap-4">
//             <button className="text-gray-400 hover:text-gray-600 font-medium">
//               Aujourd'hui
//             </button>
//             <button className="text-gray-800 font-semibold border-b-2 border-gray-800 pb-1">
//               Semaine
//             </button>

//             <button
//               onClick={() => setShowMapModal(true)}
//               className="ml-4 bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2"
//             >
//               🗺️ Carte
//             </button>
//           </div>

//           <div className="flex items-center gap-4 absolute top-5 right-5">
//             <div className="flex bg-gray-800 rounded-full p-1">
//               <button
//                 onClick={() => setUnit("C")}
//                 className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
//                   unit === "C" ? "bg-white text-gray-800" : "text-white"
//                 }`}
//               >
//                 °C
//               </button>
//               <button
//                 onClick={() => setUnit("F")}
//                 className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
//                   unit === "F" ? "bg-white text-gray-800" : "text-white"
//                 }`}
//               >
//                 °F
//               </button>
//             </div>

//             <div
//               onClick={() => setShowLogoutModal(true)}
//               className="cursor-pointer w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm"
//             >
//               {userData.prenom[0]}{userData.nom[0]}
//             </div>
//           </div>

//           <div className="App flex items-center justify-center w-full">
//             {forecast ? (
//               <WeekForecast forecast={forecast} unit={unit} />
//             ) : (
//               <div>Aucune donnée reçue</div>
//             )}
//           </div>

//           <div className="mt-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 p-2">
//               LES TEMPS FORTS D'AUJOURD'HUI
//             </h2>

//             <WeatherDetails
//               uvValue={uvValue}
//               uvPercentage={uvPercentage}
//               Wind_kph={Wind_kph}
//               wind_dir={wind_dir}
//               astro={astro}
//               humidity={humidity}
//               visibility={visibility}
//               airQualityIndex={airQualityIndex}
//             />
//           </div>
//         </div>
//       </div>

//       {showLogoutModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white w-80 rounded-xl p-6 shadow-xl text-center">
//             <h2 className="text-xl font-bold mb-4">Voulez-vous quitter l'application ?</h2>
//             <p className="text-gray-600 mb-6">Vos données seront supprimées du navigateur.</p>
//             <div className="flex justify-center gap-4">
//               <button
//                 className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
//                 onClick={logout}
//               >
//                 Oui
//               </button>
//               <button
//                 className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
//                 onClick={() => setShowLogoutModal(false)}
//               >
//                 Non
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

    
//       {showMapModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-xl">
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex gap-4 w-full p-6">
//               <h2 className="text-2xl font-bold text-gray-800">Sélectionner une localisation</h2>

//               <div className="flex mb-4">
//               <input
//                 type="text"
//                 placeholder="Entre le nom de la ville rechercher"
//                 className="w-50 p-2 rounded-lg bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={ville}
//                 onChange={(e) => setVille(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && rechercheMeteo(ville)}
//               />
//               <button
//                 onClick={() => rechercheMeteo(ville)}
//                 className="ml-4 w-[40px] h-[40px] bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-600"
//               >
//                 🔍
//               </button>
//             </div>
//             </div>


//               <button
//                 onClick={() => setShowMapModal(false)}
//                 className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//               >
//                 ×
//               </button>
//             </div>

//             <p className="text-gray-600 mb-4">
//               Cliquez sur la carte pour sélectionner une position
//             </p>

//             <MapSelector
//               latitude={selectedLocation.lat}
//               longitude={selectedLocation.lng}
//               onLocationChange={handleLocationChange}
//             />

//             <div className="mt-4 p-3 bg-gray-100 rounded-lg">
//               <p className="text-sm text-gray-700">
//                 <span className="font-semibold">Latitude:</span> {selectedLocation.lat.toFixed(4)} | 
//                 <span className="font-semibold ml-3">Longitude:</span> {selectedLocation.lng.toFixed(4)}
//               </p>
//             </div>

//             <div className="flex justify-end gap-4 mt-6">
//               <button
//                 className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//                 onClick={() => setShowMapModal(false)}
//               >
//                 Annuler
//               </button>
//               <button
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 onClick={handleMapConfirm}
//               >
//                 Confirmer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

// }

// export default App;


import "./App.css";
import { useEffect, useState } from "react";
import { RécupérationMeteoComplete } from "./components/fonction";
import { RécuperationPrevisionMeteo } from "./components/formation";
import IconMeteo from "./components/iconMeteo";
import { WeekForecast } from "./components/WeekForecast";
import { CurrentWeather } from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import HomePage from "./HomePage";
import MapSelector from "./components/map";


// useRef

function App() {
  const [userData, setUserData] = useState(null);
  const [ville, setVille] = useState("Abidjan");
  const [villeMap, setVilleMap] = useState("Abidjan"); // État séparé pour la recherche carte
  const [meteo, setMeteo] = useState(null);
  const [unit, setUnit] = useState("C");
  const [forecast, setForecast] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 5.3600,
    lng: -4.0083
  });

  // Charger la météo complète quand userData existe
  useEffect(() => {
    if (userData) {
      RécupérationMeteoComplete("Abidjan").then((data) => setMeteo(data));
    }
  }, [userData]);

  // Charger les prévisions météo
  useEffect(() => {
    if (userData) {
      const chargerPrevisions = async () => {
        const data = await RécuperationPrevisionMeteo(ville);
        if (data && data.daily) setForecast(data.daily);
      };
      chargerPrevisions();
    }
  }, [ville, userData]);

  // Recherche météo principale (panneau gauche)
  const rechercheMeteo = async (villerechercher) => {
    const meteoData = await RécupérationMeteoComplete(villerechercher);
    setMeteo(meteoData);
  };

  // Recherche météo pour la carte (modale) - NOUVELLE FONCTION
  const rechercheMeteoMap = async (villerechercher) => {
    const meteoData = await RécupérationMeteoComplete(villerechercher);
    if (meteoData && meteoData.coord) {
      setSelectedLocation({
        lat: meteoData.coord.lat,
        lng: meteoData.coord.lon
      });
    }
  };

  // Chargement user depuis le localStorage
  useEffect(() => {
    const savedUserData = localStorage.getItem("meteoUserData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  // Sauvegarder utilisateur (user)
  const handleUserSubmit = (data) => {
    setUserData(data);
    localStorage.setItem("meteoUserData", JSON.stringify(data));
  };

  // Gérer le changement de localisation depuis la carte
  const handleLocationChange = (lat, lng) => {
    setSelectedLocation({ lat, lng });
    console.log("Nouvelle position sélectionnée:", { lat, lng });
  };

  // Confirmer la sélection de la carte et récupérer la météo par coordonnées
  const handleMapConfirm = async () => {
    try {
      console.log("Coordonnées confirmées:", selectedLocation); 
      setShowMapModal(false);
    } catch (error) {
      console.error("Erreur lors de la récupération de la météo par coordonnées:", error);
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("meteoUserData");
    setUserData(null);
    setShowLogoutModal(false);
  };

  if (!userData) {
    return <HomePage onSubmit={handleUserSubmit} />;
  }

  const wind_dir = meteo?.wind?.deg || 0;
  const Wind_kph = (meteo?.wind?.speed || 0) * 3.6;
  const uvValue = meteo?.uv || 0;
  const uvPercentage = (uvValue / 11) * 352;
  const humidity = meteo?.main?.humidity || 0;
  const visibility = (meteo?.visibility || 0) / 1000;
  const airQualityIndex = meteo?.airQuality || 0;

  const astro = {
    sunrise: meteo?.sunrise || "06:35",
    sunset: meteo?.sunset || "18:42"
  };

  if (!meteo)
    return <div className="text-center text-xl p-10">Chargement...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c1c2c6] p-6">
      <div className="w-[1300px] text-black grid grid-cols-3 rounded-3xl">
        <div className="col-span-1 bg-white flex flex-col justify-between p-6 rounded-l-3xl">
          
          <div className="bg-blue-100 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-700">
              Bienvenue, <span className="font-bold">{userData.prenom} {userData.nom}</span> 👋
            </p>
          </div>

          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Entre le nom de la ville rechercher"
              className="w-full p-2 rounded-lg bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          <IconMeteo icon={meteo?.weather?.[0]?.icon} />
          <CurrentWeather meteo={meteo} />

          <div
            className="relative mt-auto w-full h-44 bg-center bg-cover rounded-xl overflow-hidden"
            style={{ backgroundImage: `url('Photos.jfif')` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold z-10">
              {meteo ? `${meteo.name}, ${meteo.name.slice(0,1)}, ${meteo.sys.country}` : "Abidjan, A, CI"}
            </h1>
          </div>
        </div>

        <div className="relative w-full p-8 col-span-2 bg-[#f7f6f9] flex flex-col rounded-r-3xl">
          <div className="mb-6 flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 font-medium">
              Aujourd'hui
            </button>
            <button className="text-gray-800 font-semibold border-b-2 border-gray-800 pb-1">
              Semaine
            </button>

            <button
              onClick={() => setShowMapModal(true)}
              className="ml-4 bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2"
            >
              🗺️ Carte
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

            <div
              onClick={() => setShowLogoutModal(true)}
              className="cursor-pointer w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm"
            >
              {userData.prenom[0]}{userData.nom[0]}
            </div>
          </div>

          <div className="App flex items-center justify-center w-full">
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

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-80 rounded-xl p-6 shadow-xl text-center">
            <h2 className="text-xl font-bold mb-4">Voulez-vous quitter l'application ?</h2>
            <p className="text-gray-600 mb-6">Vos données seront supprimées du navigateur.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                onClick={logout}
              >
                Oui
              </button>
              <button
                className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setShowLogoutModal(false)}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}

      {showMapModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4 w-full px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-800">Sélectionner une localisation</h2>

              {/* MODIFICATION: Champ de recherche séparé avec villeMap */}
            <div className="flex mb-4 gap-2">
              <input
                type="text"
                placeholder="Rechercher une ville sur la carte"
                className="w-50 p-2 rounded-lg bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={villeMap}
                onChange={(e) => setVilleMap(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && rechercheMeteoMap(villeMap)}
              />
              <button
                onClick={() => rechercheMeteoMap(villeMap)}
                className="ml-4 w-[40px] h-[40px] bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-600"
              >
                🔍
              </button>
            </div>
            </div>

              <button
                onClick={() => setShowMapModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
           

            <p className="text-gray-600 mb-4">
              Cliquez sur la carte pour sélectionner une position
            </p>

            <MapSelector
              latitude={selectedLocation.lat}
              longitude={selectedLocation.lng}
              onLocationChange={handleLocationChange}
            />

            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Latitude:</span> {selectedLocation.lat.toFixed(4)} | 
                <span className="font-semibold ml-3">Longitude:</span> {selectedLocation.lng.toFixed(4)}
              </p>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                onClick={() => setShowMapModal(false)}
              >
                Annuler
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleMapConfirm}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;