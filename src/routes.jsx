import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home           from "./views/Home.jsx";
import ListaPersonas  from "./views/ListaPersonas.jsx";
import ListaPlanetas  from "./views/ListaPlanetas.jsx";
import ListaVehiculos from "./views/ListaVehiculos.jsx";
import DetalleEntidad from "./views/DetalleEntidad.jsx";
import Favoritos      from "./views/Favoritos.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/people"  element={<ListaPersonas />} />
    <Route path="/planets" element={<ListaPlanetas />} />
    <Route path="/vehicles" element={<ListaVehiculos />} />

    <Route path="/:tipoDeEntidad/:id" element={<DetalleEntidad />} />

    <Route path="/favoritos" element={<Favoritos />} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
