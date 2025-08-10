////Cambiar useState por useReducer en las listas?, pero esta accion la hace reductor, acciones o contexto tienda?

import React, { useEffect, useContext } from "react";
import { TiendaContexto } from "../context/ContextoTienda.jsx";
import TarjetaEntidad from "../components/TarjetaEntidad.jsx";
import CargandoSpinner from "../components/CargandoSpinner.jsx";
import AlertaError from "../components/AlertaError.jsx";

const ListaPlanetas = () => {
  const { state, cargarPlanetas } = useContext(TiendaContexto);
  const { planetas, cargando, error } = state;

  useEffect(() => {
    if (planetas.length === 0) cargarPlanetas();
    // eslint-disable-next-line
  }, []);

  if (cargando) return <CargandoSpinner />;
  if (error)    return <AlertaError mensaje={error} />;

  return (
    <div>
      <h2>Planets</h2>
    
      <div
        className="d-flex overflow-auto gap-5 py-2"
        style={{ maxWidth: "100%" }}
      >
        {planetas.map(planeta => (
          <TarjetaEntidad
            key={planeta.id}
            item={planeta}
            tipoDeEntidad="planets"
          />
        ))}
      </div>
    </div>
  );
};

export default ListaPlanetas;
