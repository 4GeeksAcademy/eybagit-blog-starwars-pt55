////Cambiar useState por useReducer en las listas?, pero esta accion la hace reductor, acciones o contexto tienda?

import React, { useEffect, useContext } from "react";
import { TiendaContexto } from "../context/ContextoTienda.jsx";
import TarjetaEntidad from "../components/TarjetaEntidad.jsx";
import CargandoSpinner from "../components/CargandoSpinner.jsx";
import AlertaError from "../components/AlertaError.jsx";

const ListaPersonas = () => {
  const { state, cargarPersonas } = useContext(TiendaContexto);
  const { personas, cargando, error } = state;

  useEffect(() => {
    if (personas.length === 0) cargarPersonas();
    // eslint-disable-next-line
  }, []);

  if (cargando) return <CargandoSpinner />;
  if (error)    return <AlertaError mensaje={error} />;

  return (
     <div>
      <h2>Characters</h2>

      <div
        className="d-flex overflow-auto gap-5 py-2"
        style={{ maxWidth: "100%" }}
      >
        {personas.map(persona => (
          <TarjetaEntidad
            key={persona.id}
            item={persona}
            tipoDeEntidad="people"
          />
        ))}
      </div>
    </div>
  );
};

export default ListaPersonas;
