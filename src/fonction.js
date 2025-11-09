// const API_KEY = process.env.local.REACT_APP_OPENWEATHER_API_KEY;



// export const RécupérationMeteo = async (ville = "Abidjan") =>{
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&lang=fr&APPID=${API_KEY}`);
//      const Data = await response.json();
//      return Data;

// };

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const RécupérationMeteo = async (ville = "Abidjan") => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&lang=fr&APPID=${API_KEY}`
  );
  const data = await response.json();
  console.log(data)
  return data;
};





