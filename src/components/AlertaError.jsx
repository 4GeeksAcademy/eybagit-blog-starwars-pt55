import React from "react";

const AlertaError = ({ mensaje }) => (
  <div className="alert alert-danger" role="alert">
    <strong>¡Ñae!</strong> Ha ocurrido un error: {mensaje}
  </div>
);

export default AlertaError;
