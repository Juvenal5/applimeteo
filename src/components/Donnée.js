export function formatForecast(list) {
  const days = {};

  list.forEach(item => {
    const date = new Date(item.dt_txt).toLocaleDateString("fr-FR");

    if (!days[date]) {
      days[date] = {
        dt: item.dt,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather,
      };
    } else {
      days[date].temp_min = Math.min(days[date].temp_min, item.main.temp_min);
      days[date].temp_max = Math.max(days[date].temp_max, item.main.temp_max);
    }
  });

  return Object.entries(days)
    .slice(0, 10)
    .map(([date, data]) => ({
      ...data,
      date,
    }));
}
