//Reemplazar useState por useReducer?

import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TiendaContexto } from "../context/ContextoTienda.jsx";
import TarjetaEntidad from "../components/TarjetaEntidad.jsx";
import CargandoSpinner from "../components/CargandoSpinner.jsx";
import AlertaError from "../components/AlertaError.jsx";

const Home = () => {
  const { state, cargarPersonas, cargarPlanetas, cargarVehiculos } = useContext(TiendaContexto);
  const { personas, planetas, vehiculos, cargando, error } = state;

  useEffect(() => {
    if ((personas || []).length === 0) cargarPersonas();
    if ((planetas || []).length === 0) cargarPlanetas();
    if ((vehiculos || []).length === 0) cargarVehiculos();
    // eslint-disable-next-line
  }, []);

  if (cargando) return <CargandoSpinner />;
  if (error)    return <AlertaError mensaje={error} />;

  return (
        <div className="container">

        <section className="mb-5">
        <h2>
          <Link to="/people" className="text-decoration-none text-danger">Characters</Link>
        </h2>
        <div
          className="d-flex overflow-auto gap-5 py-2 w-100"
         
        >
          {(personas || []).map(persona => (
            <TarjetaEntidad
              key={persona.id}
              item={persona}
              tipoDeEntidad="people"
            />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2>
          <Link to="/planets" className="text-decoration-none text-danger">Planets</Link>
        </h2>
        <div className="d-flex overflow-auto gap-5 py-2 w-100"
       
        >
         
          {(planetas || []).map(planeta => (
              <TarjetaEntidad 
                key={planeta.id} 
                item={planeta} 
                tipoDeEntidad="planets" 
              />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2>
          <Link to="/vehicles" className="text-decoration-none text-danger">Vehicles</Link>
        </h2>
        <div className="d-flex overflow-auto gap-5 py-2 w-100"
        >
          {(vehiculos || []).map(vehiculo => (
            <div key={vehiculo.id} >
              <TarjetaEntidad item={vehiculo} tipoDeEntidad="vehicles" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
