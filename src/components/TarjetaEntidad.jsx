import React from "react";
import { Link } from "react-router-dom";
import BotonFavorito from "./BotonFavorito.jsx";
import { getImageUrl } from "../services/getImageUrl";

const TarjetaEntidad = ({ item, tipoDeEntidad }) => (
  <div
    className="card h-100 flex-shrink-0 tarjeta-entidad"
  >
    <img
      src={getImageUrl(tipoDeEntidad, item.id)}
      alt={item.nombre}
      className="card-img-top bg-dark tarjeta-entidad-img"
      onError={evento => {
        evento.target.onerror = null;
        evento.target.src =
          "https://starwars-visualguide.com/assets/img/placeholder.jpg";
      }}
    />

    <div className="card-body d-flex flex-column mx-2 mb-2">
      <h4 className="card-title mt-2">{item.nombre}</h4>

      <h5 className="fw-normal mt-3 mb-2">(ID: {item.id})</h5>

      <div className="d-flex justify-content-start align-items-center mt-3">
        <Link
          to={`/${tipoDeEntidad}/${item.id}`}
          className="btn btn-lg btn-outline-primary me-2"
        >
          Learn more!
        </Link>
        <BotonFavorito
          id={item.id}
          nombre={item.nombre}
          tipoDeEntidad={tipoDeEntidad}
        />
      </div>
    </div>
  </div>
);

export default TarjetaEntidad;
