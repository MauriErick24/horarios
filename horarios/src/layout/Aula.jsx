import React from "react";
import Map2d from "../assets/2dMap.png";
import Map3d from "../assets/3dMap.png";

export const Aula = () => {
  return (
    <div>
      <div>
        <h1>Mapa de aulas</h1>
        <img src={Map2d} style={{ width: "100%" }} />
        <img src={Map3d} style={{ width: "100%" }} />
      </div>
    </div>
  );
};
