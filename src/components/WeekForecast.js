import React from "react";

export const WeekForecast = ({ forecast, unit }) => {
  console.log(forecast);
  // if (!forecast || forecast.length === 0) {
  //   const defaultWeek = [
  //     { day: "Dimanche", icon: "☀️", temp: 15, low: 3 },
  //     { day: "Lundi", icon: "🌦️", temp: 12, low: 7 },
  //     { day: "Mardi", icon: "🌧️", temp: 9, low: 7 },
  //     { day: "Mercredi", icon: "🌧️", temp: 8, low: 1 },
  //     { day: "Jeudi", icon: "🌨️", temp: 5, low: -2 },
  //     { day: "Vendredi", icon: "☀️", temp: 4, low: -4 },
  //     { day: "Samedi", icon: "☀️", temp: 3, low: -3 },
  //   ];

  //   return (
  //     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 mb-8 h-44">
  //       {defaultWeek.map((day, index) => (
  //         <div
  //           key={index}
  //           className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl text-center hover:shadow-lg transition-shadow"
  //         >
  //           <div className="text-gray-600 text-sm mb-3">{day.day}</div>
  //           <div className="text-4xl mb-3">{day.icon}</div>
  //           <div className="font-bold text-gray-800">{day.temp}°</div>
  //           <div className="text-gray-400 text-sm">{day.low}°</div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 mb-8">
      {forecast.map((day, index) => {

        if (!day || !day.main.temp) return null;
        const tempMax =
          unit === "C" ? day.main.temp_max : (day.temp.max * 9) / 5 + 32;
        const tempMin =
          unit === "C" ? day.main.temp_min : (day.temp.min * 9) / 5 + 32;
        return (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-gray-600 text-sm mb-3">
              {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
                weekday: "short",
              })}
            </div>

            <div className="text-4xl mb-3">
              {day.weather?.[0]?.icon ? (
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="mx-auto w-12 h-12"
                />
              ) : (
                <span>☁️</span>
              )}
            </div>

            <div className="font-bold text-gray-800">
              {Math.round(tempMax)}°
            </div>
            <div className="text-gray-400 text-sm">{Math.round(tempMin)}°</div>
          </div>
        );
      })}
    </div>
  );
};
