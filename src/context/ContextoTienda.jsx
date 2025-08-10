import React, { createContext, useReducer, useEffect } from "react";
import reductor, { AGREGAR_FAVORITO, ELIMINAR_FAVORITO, SET_PERSONAS, SET_PLANETAS, SET_VEHICULOS, SET_CARGANDO, SET_ERROR, SET_DETALLE_ENTIDAD } from "./reductor";
import { obtenerPersonas, obtenerPlanetas, obtenerVehiculos, obtenerDetalleEntidad } from "../services/api";

const CLAVE_ALMACEN = "starwars-almacen";

export const TiendaContexto = createContext();

export const ProveedorTienda = ({ children }) => {
  const [state, dispatch] = useReducer(
    reductor,
    undefined,
    () => {
      const guardado = localStorage.getItem(CLAVE_ALMACEN);
      let restaurado = guardado ? JSON.parse(guardado) : {};
       
      return {
        favoritos: Array.isArray(restaurado.favoritos) ? restaurado.favoritos : [],
        personas: Array.isArray(restaurado.personas) ? restaurado.personas : [],
        planetas: Array.isArray(restaurado.planetas) ? restaurado.planetas : [],
        vehiculos: Array.isArray(restaurado.vehiculos) ? restaurado.vehiculos : [],
        detallesEntidad:
          restaurado.detallesEntidad &&
          typeof restaurado.detallesEntidad === 'object' &&
          !Array.isArray(restaurado.detallesEntidad)
            ? restaurado.detallesEntidad
            : {},
        cargando: false,
        error: null
      };
    }
  );

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(state));
    }, 300);
    return () => clearTimeout(id);
  }, [state]);


  const agregarFavorito = favorito => dispatch({ type: AGREGAR_FAVORITO, payload: favorito });
  const eliminarFavorito = favorito => dispatch({ type: ELIMINAR_FAVORITO, payload: favorito });

  const cargarPersonas = () => {
    dispatch({ type: SET_CARGANDO, payload: true });
    obtenerPersonas()
      .then(personas => {
        dispatch({ type: SET_PERSONAS, payload: personas });
        dispatch({ type: SET_ERROR, payload: null });
        dispatch({ type: SET_CARGANDO, payload: false });
      })
      .catch(error => {
        dispatch({ type: SET_ERROR, payload: error.message });
        dispatch({ type: SET_CARGANDO, payload: false });
      });
  };

  const cargarPlanetas = () => {
    dispatch({ type: SET_CARGANDO, payload: true });
    obtenerPlanetas()
      .then(planetas => {
        dispatch({ type: SET_PLANETAS, payload: planetas });
        dispatch({ type: SET_ERROR, payload: null });
        dispatch({ type: SET_CARGANDO, payload: false });
      })
      .catch(error => {
        dispatch({ type: SET_ERROR, payload: error.message });
        dispatch({ type: SET_CARGANDO, payload: false });
      });
  };

  const cargarVehiculos = () => {
    dispatch({ type: SET_CARGANDO, payload: true });
    obtenerVehiculos()
      .then(vehiculos => {
        dispatch({ type: SET_VEHICULOS, payload: vehiculos });
        dispatch({ type: SET_ERROR, payload: null });
        dispatch({ type: SET_CARGANDO, payload: false });
      })
      .catch(error => {
        dispatch({ type: SET_ERROR, payload: error.message });
        dispatch({ type: SET_CARGANDO, payload: false });
      });
  };

  const cargarDetalleEntidad = (tipo, id) => {
    dispatch({ type: SET_CARGANDO, payload: true });
    obtenerDetalleEntidad(tipo, id)
      .then(detalle => {
        if (detalle && detalle.properties) {
          dispatch({ type: "SET_DETALLE_ENTIDAD", payload: { tipo, id, detalle: detalle.properties } });
          dispatch({ type: SET_ERROR, payload: null });
        } else {
          dispatch({ type: SET_ERROR, payload: "Entidad no encontrada" });
        }
        dispatch({ type: SET_CARGANDO, payload: false });
      })
      .catch(error => {
        dispatch({ type: SET_ERROR, payload: error.message });
        dispatch({ type: SET_CARGANDO, payload: false });
      });
  };

  return (
    <TiendaContexto.Provider
      value={{
        state,
        agregarFavorito,
        eliminarFavorito,
        cargarPersonas,
        cargarPlanetas,
        cargarVehiculos,
        cargarDetalleEntidad
      }}
    >
      {children}
    </TiendaContexto.Provider>
  );
};
