import React, { useEffect, useContext } from "react";
import { TiendaContexto } from "../context/ContextoTienda.jsx";
import TarjetaEntidad from "../components/TarjetaEntidad.jsx";
import CargandoSpinner from "../components/CargandoSpinner.jsx";
import AlertaError from "../components/AlertaError.jsx";

const ListaVehiculos = () => {
  const { state, cargarVehiculos } = useContext(TiendaContexto);
  const { vehiculos, cargando, error } = state;

  useEffect(() => {
    if (vehiculos.length === 0) cargarVehiculos();
  }, []);

  if (cargando) return <CargandoSpinner />;
  if (error)    return <AlertaError mensaje={error} />;

  return (
    <div>
      <h2>Vehícles</h2>
      <div
        className="d-flex overflow-auto gap-5 py-2"
        style={{ maxWidth: "100%" }}
      >
        {vehiculos.map(vehiculo => (
          <TarjetaEntidad key={vehiculo.id} item={vehiculo} tipoDeEntidad="vehicles"/>
        ))}
      </div>
    </div>
  );
};

export default ListaVehiculos;
