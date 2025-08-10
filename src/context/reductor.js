export const SET_DETALLE_ENTIDAD = "SET_DETALLE_ENTIDAD";
export const SET_PERSONAS = "SET_PERSONAS";
export const SET_PLANETAS = "SET_PLANETAS";
export const SET_VEHICULOS = "SET_VEHICULOS";
export const SET_CARGANDO = "SET_CARGANDO";
export const SET_ERROR = "SET_ERROR";
export const AGREGAR_FAVORITO  = "AGREGAR_FAVORITO";
export const ELIMINAR_FAVORITO = "ELIMINAR_FAVORITO";

const estadoInicial = {
  favoritos: [],
  personas: [],
  planetas: [],
  vehiculos: [],
  detallesEntidad: {},
  cargando: false,
  error: null
};

export default function reductor(state = estadoInicial, action) {
  switch (action.type) {
    case AGREGAR_FAVORITO:
      if (state.favoritos.some(
        favorito =>
          favorito.id === action.payload.id &&
          favorito.tipoDeEntidad === action.payload.tipoDeEntidad
      )) {
        return state;
      }
      return {
        ...state,
        favoritos: [...state.favoritos, action.payload]
      };

    case ELIMINAR_FAVORITO:
      return {
        ...state,
        favoritos: state.favoritos.filter(
          favorito =>
            !(
              favorito.id === action.payload.id &&
              favorito.tipoDeEntidad === action.payload.tipoDeEntidad
            )
        )
      };

    case SET_PERSONAS:
      return {
        ...state,
        personas: action.payload
      };
    case SET_PLANETAS:
      return {
        ...state,
        planetas: action.payload
      };
    case SET_VEHICULOS:
      return {
        ...state,
        vehiculos: action.payload
      };
    case SET_CARGANDO:
      return {
        ...state,
        cargando: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_DETALLE_ENTIDAD: {
      const { tipo, id, detalle } = action.payload;
      return {
        ...state,
        detallesEntidad: {
          ...state.detallesEntidad,
          [tipo]: {
            ...(state.detallesEntidad[tipo] || {}),
            [id]: detalle
          }
        }
      };
    }
    default:
      return state;
  }
}
