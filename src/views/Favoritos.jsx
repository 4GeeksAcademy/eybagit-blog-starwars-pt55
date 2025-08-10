import React, { useContext } from "react";
import { TiendaContexto } from "../context/ContextoTienda.jsx";
import TarjetaEntidad from "../components/TarjetaEntidad.jsx";

const Favoritos = () => {
  const { state } = useContext(TiendaContexto);
  const { favoritos } = state;

  return (
    <div className="text-center mt-5 ">
      <h1 className="mb-3 fw-semibold display-1">My Favorites</h1>

      {favoritos.length === 0 ? (
        <p className="fw-normal fs-5">You haven't saved anything yet. Go explore the galaxy!</p>
      ) : (
        <div
          className="d-flex overflow-auto gap-5 py-2 w-100"
        >
          {favoritos.map(favorito => (
            <TarjetaEntidad
              key={`${favorito.tipoDeEntidad}-${favorito.id}`}
              item={favorito}
              tipoDeEntidad={favorito.tipoDeEntidad}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
