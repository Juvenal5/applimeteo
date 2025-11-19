import React from "react";

function IconMeteo ({ icon }) {
  const Iconrecu = icon ?? "01d";
//   console.log(`ICON RECU DANS ICONMETEO JS ${iconrecu} `);

  const url = `https://openweathermap.org/img/wn/${Iconrecu}.png`;

  return (
    <div className="flex items-center justify-center">
      <img src={url} alt="icone meteo" width={200} height={200} />
    </div>
  );
}

export default IconMeteo;



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
