const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// Récupération météo actuelle (existant)
export const RécupérationMeteo = async (ville) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`
    );
    const data = await response.json();
    
    if (data.cod !== 200) {
      throw new Error(data.message);
    }
    
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la météo:", error);
    return null;
  }
};

// Récupération prévisions (existant)
export const RécuperationPrevisionMeteo = async (ville) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`
    );
    const data = await response.json();
    
    if (data.cod !== "200") {
      throw new Error(data.message);
    }
    
    const daily = [];
    const groupedByDay = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!groupedByDay[date]) {
        groupedByDay[date] = [];
      }
      groupedByDay[date].push(item);
    });
    
    Object.values(groupedByDay).forEach(dayData => {
      const temps = dayData.map(d => d.main.temp);
      daily.push({
        dt: dayData[0].dt,
        temp: {
          max: Math.max(...temps),
          min: Math.min(...temps)
        },
        weather: dayData[0].weather
      });
    });
    
    return { daily };
  } catch (error) {
    console.error("Erreur lors de la récupération des prévisions:", error);
    return null;
  }
};

// Récupération indice UV
export const RécupérationUV = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    return data.value || 0;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'UV:", error);
    return 0;
  }
};

// Récupération qualité de l'air
export const RécupérationQualitéAir = async (lat, lon) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    
    if (data.list && data.list[0]) {
      const aqi = data.list[0].main.aqi;
      const conversion = {
        1: 25,
        2: 75, 
        3: 125, 
        4: 175, 
        5: 300   
      };
      
      return conversion[aqi] || 0;
    }
    return 0;
  } catch (error) {
    console.error("Erreur lors de la récupération de la qualité de l'air:", error);
    return 0;
  }
};

//  Convertir timestamp en heure lisible
export const formatHeure = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const heures = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${heures}:${minutes}`;
};

//  Récupérer toutes les données météo
export const RécupérationMeteoComplete = async (ville) => {
  try {
    const meteoActuelle = await RécupérationMeteo(ville);

    if (!meteoActuelle) {
      return null;
    }
    
    const { coord, sys } = meteoActuelle;
    
    const [uv, qualiteAir] = await Promise.all([
      RécupérationUV(coord.lat, coord.lon),
      RécupérationQualitéAir(coord.lat, coord.lon)
    ]);
    
    return {
      ...meteoActuelle,
      uv: uv,
      airQuality: qualiteAir,
      sunrise: formatHeure(sys.sunrise),
      sunset: formatHeure(sys.sunset)
    };
  } catch (error) {
    console.error("Erreur lors de la récupération complète:", error);
    return null;
  }
};




