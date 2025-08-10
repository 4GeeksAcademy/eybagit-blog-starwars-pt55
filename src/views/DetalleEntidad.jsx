import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getImageUrl } from "../services/getImageUrl";
import CargandoSpinner from "../components/CargandoSpinner";
import AlertaError from "../components/AlertaError";
import { TiendaContexto } from "../context/ContextoTienda.jsx";

const DetalleEntidad = () => {
  const { tipoDeEntidad, id } = useParams();
  const { state, cargarDetalleEntidad } = useContext(TiendaContexto);
  const { detallesEntidad, cargando, error } = state;
  const datosEntidad = detallesEntidad?.[tipoDeEntidad]?.[id] || null;

  useEffect(() => {
    if (!datosEntidad && !cargando) {
      cargarDetalleEntidad(tipoDeEntidad, id);
    }
  }, [tipoDeEntidad, id, datosEntidad, cargando, cargarDetalleEntidad]);

  if (cargando) return <CargandoSpinner />;
  if (error) return <AlertaError mensaje={error} />;
  if (!datosEntidad) return null;

  const imagenSrc = getImageUrl(tipoDeEntidad, id);

  const listaPropiedades = [];
  for (const clave in datosEntidad) {
    if (clave !== "name") {
      listaPropiedades.push([clave, datosEntidad[clave]]);
    }
  }
  const filasPropiedades = [];
  for (let i = 0; i < listaPropiedades.length; i += 6) {
    filasPropiedades.push(listaPropiedades.slice(i, i + 6));
  }

  return (
    <div className="container my-5">
      <Link
        to="/"
        className="btn btn-link mb-3 fs-5 limpiar-subrayado limpiar-subrayado-hover text-primary position-sticky top-0 bg-white z-3"
      >
        ← go home🏠
      </Link>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img
                src={imagenSrc}
                alt={datosEntidad.nombre || datosEntidad.name}
                className="img-fluid rounded detalle-entidad-img"
                onError={e =>
                  (e.target.src =
                    "https://placehold.co/700x400/d9d9d9/999999?text=400×400")
                }
              />
            </div>
            <div className="col-md-6 text-md-end">
              <h1 className="display-1 mb-1 text-center fw-semibold mb-4">{datosEntidad.nombre || datosEntidad.name}</h1>
              <p className="display-6 text-muted mb-0 text-center">ID: {id}</p>
            </div>
          </div>
          <hr className="my-4" />
          {filasPropiedades.map((fila, indiceFila) => (
            <div key={indiceFila} className="row gx-0">
              {fila.map(([clavePropiedad, valorPropiedad], indiceColumna) => {
                const etiqueta = clavePropiedad.replace(/_/g, " ");
                const valorMostrar = Array.isArray(valorPropiedad)
                  ? (valorPropiedad.length ? valorPropiedad.join(", ") : "—")
                  : (valorPropiedad || "—");
                return (
                  <div
                    key={clavePropiedad}
                    className={`col-12 col-sm-6 col-md-4 col-lg-2 px-3 py-2 ${indiceColumna > 0 ? "border-start border-secondary-subtle" : ""}`}
                  >
                    <div className="text-uppercase text-secondary small mb-1">
                      {etiqueta}
                    </div>
                    <div className="fw-medium">{valorMostrar}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetalleEntidad;
