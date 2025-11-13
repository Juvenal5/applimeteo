const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const RécuperationPrevisionMeteo = async (ville = 'Abidjan') => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`
    );
    if (!response.ok) throw new Error('Erreur réseau');
    const data = await response.json();
    return { daily: data.list };
  } catch (error) {
    console.error('Erreur:', error);
    return { daily: [] };
  }
};