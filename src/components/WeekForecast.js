import React from "react";
import { formatForecast } from"./Donnée";

// export const WeekForecast = ({ forecast, unit }) => {
//   console.log(forecast);
    
//   const forecast = formatForecastTo7Days(forecast);
  
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 mb-8">
//       {forecast.map((day, index) => {
      
//         if (!day || !day.main.temp) return null;
//         const tempMax =
//           unit === "C" ? day.main.temp_max : (day.temp.max * 9) / 5 + 32;
//         const tempMin =
//           unit === "C" ? day.main.temp_min : (day.temp.min * 9) / 5 + 32;
//         return (
//           <div
//             key={index}
//             className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl text-center hover:shadow-lg transition-shadow"
//           >
//             <div className="text-gray-600 text-sm mb-3">
//               {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
//                 weekday: "short",
//               })}
//             </div>

//             <div className="text-4xl mb-3">
//               {day.weather?.[0]?.icon ? (
//                 <img
//                   src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
//                   alt={day.weather[0].description}
//                   className="mx-auto w-12 h-12"
//                 />
//               ) : (
//                 <span>☁️</span>
//               )}
//             </div>

//             <div className="font-bold text-gray-800">
//               {Math.round(tempMax)}°
//             </div>
//             <div className="text-gray-400 text-sm">{Math.round(tempMin)}°</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };


export const WeekForecast = ({ forecast, unit }) => {
  const week = formatForecast(forecast);

  return (
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
  );
};
