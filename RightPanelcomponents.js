// ========================================
// FICHIER 2: src/components/RightPanelComponents.js
// ========================================
import React from 'react';
import { Wind, Sun, Moon } from 'lucide-react';

export const Header = ({ unit, setUnit }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex gap-6">
        <button className="text-gray-400 hover:text-gray-600 font-medium">Aujourd'hui</button>
        <button className="text-gray-800 font-semibold border-b-2 border-gray-800 pb-1">Semaine</button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex bg-gray-800 rounded-full p-1">
          <button
            onClick={() => setUnit('C')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              unit === 'C' ? 'bg-white text-gray-800' : 'text-white'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('F')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              unit === 'F' ? 'bg-white text-gray-800' : 'text-white'
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
    </div>
  );
};

export const WeekForecast = ({ forecast, unit }) => {
  if (!forecast || forecast.length === 0) {
    const defaultWeek = [
      { day: 'Sun', icon: '☀️', temp: 15, low: 3 },
      { day: 'Mon', icon: '🌦️', temp: 12, low: 7 },
      { day: 'Tue', icon: '🌧️', temp: 9, low: 7 },
      { day: 'Wed', icon: '🌧️', temp: 8, low: 1 },
      { day: 'Thu', icon: '🌨️', temp: 5, low: -2 },
      { day: 'Fri', icon: '☀️', temp: 4, low: -4 },
      { day: 'Sat', icon: '☀️', temp: 3, low: -3 }
    ];

    return (
      <div className="grid grid-cols-7 gap-4 mb-8">
        {defaultWeek.map((day, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-gray-600 text-sm mb-3">{day.day}</div>
            <div className="text-4xl mb-3">{day.icon}</div>
            <div className="font-bold text-gray-800">{day.temp}°</div>
            <div className="text-gray-400 text-sm">{day.low}°</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-4 mb-8">
      {forecast.map((day, index) => {
        const temp = unit === 'C' ? day.maxtemp_c : day.maxtemp_f;
        const tempMin = unit === 'C' ? day.mintemp_c : day.mintemp_f;
        
        return (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-gray-600 text-sm mb-3">{day.day}</div>
            <div className="text-4xl mb-3">{day.emoji}</div>
            <div className="font-bold text-gray-800">{Math.round(temp)}°</div>
            <div className="text-gray-400 text-sm">{Math.round(tempMin)}°</div>
          </div>
        );
      })}
    </div>
  );
};

export const UVIndex = ({ uv }) => {
  const uvValue = uv || 5;
  const uvPercentage = (uvValue / 12) * 352;
  
  return (
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
          <div className="text-4xl font-bold text-gray-800">{Math.round(uvValue)}</div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-2">6 9 12</div>
    </div>
  );
};

export const WindStatus = ({ wind_kph, wind_dir }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
      <div className="text-gray-600 text-sm mb-4">Wind Status</div>
      <div className="text-5xl font-bold text-gray-800 mb-2">{wind_kph ? wind_kph.toFixed(2) : '7.70'} <span className="text-2xl font-normal">km/h</span></div>
      <div className="flex items-center gap-2 text-gray-600">
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
          <Wind size={16} className="text-white" />
        </div>
        <span className="text-sm">{wind_dir || 'WSW'}</span>
      </div>
    </div>
  );
};

export const SunriseSunset = ({ astro }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
      <div className="text-gray-600 text-sm mb-4">Lever et coucher du soleil</div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <Sun size={20} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-800">{astro?.sunrise || '6:35 AM'}</div>
            <div className="text-xs text-gray-400">-1m 46s</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
            <Moon size={20} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-800">{astro?.sunset || '5:42 PM'}</div>
            <div className="text-xs text-gray-400">+2m 22s</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Humidity = ({ humidity }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
      <div className="text-gray-600 text-sm mb-4">Humidité</div>
      <div className="text-5xl font-bold text-gray-800 mb-2">{humidity || 12}<span className="text-2xl">%</span></div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Normal</span>
        <span>👍</span>
        <div className="ml-auto w-3 h-3 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export const Visibility = ({ visibility }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
      <div className="text-gray-600 text-sm mb-4">Visibilité</div>
      <div className="text-5xl font-bold text-gray-800 mb-2">{visibility ? visibility.toFixed(1) : '5.2'} <span className="text-2xl font-normal">km</span></div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Moyenne</span>
        <span>😊</span>
        <div className="ml-auto w-3 h-3 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export const AirQuality = ({ airQuality }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
      <div className="text-gray-600 text-sm mb-4">Qualité de l'air</div>
      <div className="text-5xl font-bold text-gray-800 mb-2">{airQuality || 105}</div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Malsaine</span>
        <span>😷</span>
        <div className="ml-auto w-3 h-3 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );
};
