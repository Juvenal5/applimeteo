import React from "react";
import { formatForecast } from"./Donnée";


export const WeekForecast = ({ forecast, unit }) => {
  const week = formatForecast(forecast);

  return (
    <div className="flex items-center justify-center w-full">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 mb-8">
      {week.map((day, index) => {

        const tempMax = unit === "C" ? day.temp_max : (day.temp_max * 9) / 5 + 32;
        const tempMin = unit === "C" ? day.temp_min : (day.temp_min * 9) / 5 + 32;

        return (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-gray-600 text-sm mb-3">
              {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
                weekday: "long",
              })};
            </div>

            <div className="text-4xl mb-3">
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="mx-auto w-12 h-12"
              />
            </div>

            <div className="font-bold text-gray-800">
              {Math.round(tempMax)}°
            </div>
            <div className="text-gray-400 text-sm">
              {Math.round(tempMin)}°
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};


// import React from "react";

// // Fonction pour formater les prévisions (remplace l'import de ./Donnée)
// const formatForecast = (forecast) => {
//   if (!forecast || !forecast.list) return [];
  
//   const dailyData = {};
  
//   forecast.list.forEach((item) => {
//     const date = new Date(item.dt * 1000).toLocaleDateString();
    
//     if (!dailyData[date]) {
//       dailyData[date] = {
//         dt: item.dt,
//         temp_max: item.main.temp_max,
//         temp_min: item.main.temp_min,
//         weather: item.weather,
//       };
//     } else {
//       dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max);
//       dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min);
//     }
//   });
  
//   return Object.values(dailyData).slice(0, 7);
// };

// export const WeekForecast = ({ forecast, unit, isLoading }) => {
  
//   const LoadingSpinner = () => (
//     <div className="flex flex-col items-center justify-center w-full py-16">
//       <div className="relative w-20 h-20 mb-4">
        
//         <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
//         <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        
        
//         <div className="absolute inset-0 flex items-center justify-center">
//           <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 2C9.24 2 7 4.24 7 7c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 2.88c1.18 0 2.12.94 2.12 2.12S13.18 9.12 12 9.12 9.88 8.18 9.88 7 10.82 4.88 12 4.88zM12 14c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
//           </svg>
//         </div>
//       </div>
      
//       <div className="text-center">
//         <p className="text-lg font-medium text-gray-700 mb-2">
//           Recherche en cours...
//         </p>
//         <p className="text-sm text-gray-500">
//           Récupération des prévisions météo
//         </p>
//       </div>
      
     
//       <div className="flex gap-2 mt-4">
//         <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
//         <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
//         <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
//       </div>
//     </div>
//   );

//   // Afficher le chargement si isLoading est true
//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   // Si pas de données de prévision, ne rien afficher
//   if (!forecast) {
//     return null;
//   }

//   const week = formatForecast(forecast);

//   return (
//     <div className="flex items-center justify-center w-full">
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 mb-8">
//         {week.map((day, index) => {
//           const tempMax = unit === "C" ? day.temp_max : (day.temp_max * 9) / 5 + 32;
//           const tempMin = unit === "C" ? day.temp_min : (day.temp_min * 9) / 5 + 32;

//           return (
//             <div
//               key={index}
//               className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl text-center hover:shadow-lg transition-shadow"
//             >
//               <div className="text-gray-600 text-sm mb-3 capitalize">
//                 {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
//                   weekday: "long",
//                 })}
//               </div>

//               <div className="text-4xl mb-3">
//                 <img
//                   src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
//                   alt={day.weather[0].description}
//                   className="mx-auto w-12 h-12"
//                 />
//               </div>

//               <div className="font-bold text-gray-800">
//                 {Math.round(tempMax)}°
//               </div>
//               <div className="text-gray-400 text-sm">
//                 {Math.round(tempMin)}°
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };