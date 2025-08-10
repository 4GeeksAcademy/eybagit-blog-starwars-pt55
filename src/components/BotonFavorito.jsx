import React, { useContext } from "react";
import { TiendaContexto } from "../context/ContextoTienda.jsx";

const BotonFavorito = ({ id, tipoDeEntidad, nombre }) => {
  if (id == null || !tipoDeEntidad || !nombre) return null;

  const {
    state: { favoritos },
    agregarFavorito,
    eliminarFavorito
  } = useContext(TiendaContexto);

  const esFavorito = favoritos.some(
    favorito => favorito.id === id && favorito.tipoDeEntidad === tipoDeEntidad
  );

  const manejarClick = () => {
    const item = { id, tipoDeEntidad, nombre };
    esFavorito ? eliminarFavorito(item) : agregarFavorito(item);
  };

  return (
    <button
      type="button"
      className={`boton-favorito ${esFavorito ? "activo" : ""}`}
      aria-label={
        esFavorito
          ? `Quitar ${nombre} de favoritos`
          : `Agregar ${nombre} a favoritos`
      }
      onClick={manejarClick}
    >
      {esFavorito
        ? <i className="fas fa-heart" />
        : <i className="far fa-heart" />
      }
    </button>
  );
};

export default BotonFavorito;
