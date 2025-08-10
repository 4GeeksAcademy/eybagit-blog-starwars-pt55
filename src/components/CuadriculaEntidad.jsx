import React from "react";
import TarjetaEntidad from "./TarjetaEntidad";

const CuadriculaEntidad = ({ elementos, tipoDeEntidad }) => (
  <div className="row">
    {elementos.map(entidad => (
      <div
        key={`${tipoDeEntidad}-${entidad.id}`}
        className="col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <TarjetaEntidad
          item={entidad}
          tipoDeEntidad={tipoDeEntidad}
        />
      </div>
    ))}
  </div>
);

export default CuadriculaEntidad;
