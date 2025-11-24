// import React from "react";
// import { Wind, Sun, Moon } from "lucide-react";

// const WeatherDetails = ({
//   uvValue,
//   uvPercentage,
//   Wind_kph,
//   wind_dir,
//   astro,
//   humidity,
//   visibility,
//   airQualityIndex
// }) => {
//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

//         <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
//           <div className="text-gray-600 text-sm mb-4">Indice UV</div>
//           <div className="relative w-32 h-32 mx-auto">
//             <svg className="transform -rotate-90 w-32 h-32">
//               <circle cx="64"
//                cy="64" 
//                r="56" 
//                stroke="#e5e7eb" 
//                strokeWidth="12" 
//                fill="none"
//                />
//               <circle
//                 cx="64"
//                 cy="64"
//                 r="56"
//                 stroke="#fbbf24"
//                 strokeWidth="12"
//                 fill="none"
//                 strokeDasharray={`${uvPercentage} 352`}
//                 strokeLinecap="round"
//               />
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-4xl font-bold text-gray-800">
//                 {Math.round(uvValue) || "5"}
//               </div>
//             </div>
//           </div>
//           <div className="text-center text-xs text-gray-400 mt-2">
//             Faible 0-2 | Modéré 3-5 | Élevé 6-7
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
//           <div className="text-gray-600 text-sm mb-4">État du vent</div>
//           <div className="text-5xl font-bold text-gray-800 mb-2">
//             {Wind_kph?.toFixed(1) || "7.70"}
//             <span className="text-2xl font-normal">km/h</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-600">
//             <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
//               <Wind size={16} className="text-white" />
//             </div>
//             <span className="text-sm">{wind_dir || "WSW"}</span>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
//           <div className="text-gray-600 text-sm mb-4">Lever et coucher du soleil</div>
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
//                 <Sun size={20} className="text-white" />
//               </div>
//               <div>
//                 <div className="font-bold text-gray-800">{astro?.sunrise || "6:35 AM"}</div>
//                 <div className="text-xs text-gray-400">Lever</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
//                 <Moon size={20} className="text-white" />
//               </div>
//               <div>
//                 <div className="font-bold text-gray-800">{astro?.sunset || "6:42 PM"}</div>
//                 <div className="text-xs text-gray-400">Coucher</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
//           <div className="text-gray-600 text-sm mb-4">Humidité</div>
//           <div className="text-5xl font-bold text-gray-800 mb-2">
//             {humidity}<span className="text-2xl font-normal">%</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-600">
//               {humidity < 30 ? "Faible" : humidity < 60 ? "Normal" : "Élevé"}
//             </span>
//             <span>
//               {humidity < 30 ? "😐" : humidity < 60 ? "👍" : "💧"}
//             </span>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
//           <div className="text-gray-600 text-sm mb-4">Visibilité</div>
//           <div className="text-5xl font-bold text-gray-800 mb-2">
//             {visibility?.toFixed(1) || "5.2"}<span className="text-2xl font-normal">km</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-600">
//               {visibility > 10 ? "Excellente" : visibility > 5 ? "Bonne" : "Moyenne"}
//             </span>
//             <span>
//               {visibility > 10 ? "😊" : visibility > 5 ? "🙂" : "😐"}
//             </span>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
//           <div className="text-gray-600 text-sm mb-4">Qualité de l'air</div>
//           <div className="text-5xl font-bold text-gray-800 mb-2">
//             {airQualityIndex || "105"}
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-600">
//               {airQualityIndex <= 50 ? "Bonne" : airQualityIndex <= 100 ? "Modérée" : "Malsaine"}
//             </span>
//             <span>
//               {airQualityIndex <= 50 ? "😊" : airQualityIndex <= 100 ? "😐" : "😷"}
//             </span>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default WeatherDetails;


import React from "react";
import { Wind, Sun, Moon } from "lucide-react";

const WeatherDetails = ({
  uvValue,
  uvPercentage,
  Wind_kph,
  wind_dir,
  astro,
  humidity,
  visibility,
  airQualityIndex
}) => {
  
  // Fonction pour déterminer le niveau UV
  const getUVLevel = (uv) => {
    if (uv <= 2) return { text: "Faible", color: "text-green-600" };
    if (uv <= 5) return { text: "Modéré", color: "text-yellow-600" };
    if (uv <= 7) return { text: "Élevé", color: "text-orange-600" };
    if (uv <= 10) return { text: "Très élevé", color: "text-red-600" };
    return { text: "Extrême", color: "text-purple-600" };
  };

  // Fonction pour convertir les degrés en direction cardinale
  const getWindDirection = (deg) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                        'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  const uvLevel = getUVLevel(uvValue);
  const windDirection = getWindDirection(wind_dir);

  return (
    <div className="p-6">
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
          <div className={`text-center text-sm font-medium mt-2 ${uvLevel.color}`}>
            {uvLevel.text}
          </div>
          <div className="text-center text-xs text-gray-400 mt-1">
            Faible 0-2 | Modéré 3-5 | Élevé 6-7
          </div>
        </div>


        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
          <div className="text-gray-600 text-sm mb-4">État du vent</div>
          <div className="text-5xl font-bold text-gray-800 mb-2">
            {Wind_kph.toFixed(1)}
            <span className="text-2xl font-normal">km/h</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <Wind size={16} className="text-white" />
            </div>
            <span className="text-sm">{windDirection}</span>
          </div>
        </div>

        
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
          <div className="text-gray-600 text-sm mb-4">Lever et coucher du soleil</div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sun size={20} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-800">{astro?.sunrise}</div>
                <div className="text-xs text-gray-400">Lever</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                <Moon size={20} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-800">{astro?.sunset}</div>
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
            {humidity}<span className="text-2xl font-normal">%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {humidity < 30 ? "Faible" : humidity < 60 ? "Normal" : "Élevé"}
            </span>
            <span>
              {humidity < 30 ? "😐" : humidity < 60 ? "👍" : "💧"}
            </span>
          </div>
        </div>

      
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
          <div className="text-gray-600 text-sm mb-4">Visibilité</div>
          <div className="text-5xl font-bold text-gray-800 mb-2">
            {visibility.toFixed(1)}<span className="text-2xl font-normal">km</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {visibility > 10 ? "Excellente" : visibility > 5 ? "Bonne" : "Moyenne"}
            </span>
            <span>
              {visibility > 10 ? "😊" : visibility > 5 ? "🙂" : "😐"}
            </span>
          </div>
        </div>

    
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
          <div className="text-gray-600 text-sm mb-4">Qualité de l'air</div>
          <div className="text-5xl font-bold text-gray-800 mb-2">
            {Math.round(airQualityIndex)}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${
              airQualityIndex <= 50 ? "text-green-600" : 
              airQualityIndex <= 100 ? "text-yellow-600" : 
              airQualityIndex <= 150 ? "text-orange-600" : 
              "text-red-600"
            }`}>
              {airQualityIndex <= 50 ? "Bonne" : 
               airQualityIndex <= 100 ? "Modérée" : 
               airQualityIndex <= 150 ? "Malsaine" : 
               "Très malsaine"}
            </span>
            <span>
              {airQualityIndex <= 50 ? "😊" : 
               airQualityIndex <= 100 ? "😐" : 
               airQualityIndex <= 150 ? "😷" : 
               "🤢"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeatherDetails;