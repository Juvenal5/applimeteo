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