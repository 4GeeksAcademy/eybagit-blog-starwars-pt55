import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TiendaContexto } from "../context/ContextoTienda.jsx";

const Navbar = () => {
  const {
    state: { favoritos },
    eliminarFavorito
  } = useContext(TiendaContexto);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light  ">
      <div className="container ">
       <Link className="navbar-brand" to="/">
          <img
            src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG28.png"
            alt="Star Wars Logo"
            className="navbar-logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navFavoritos"
          aria-controls="navFavoritos"
          aria-expanded="false"
          aria-label="Alternar navegación"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navFavoritos">
          <ul className="navbar-nav mx-auto  ">
            <li className="nav-item mx-3 fs-5">
              <Link className="nav-link" to="/people">
                Characters
              </Link>
            </li>
            <li className="nav-item mx-3 fs-5">
              <Link className="nav-link" to="/planets">
                Planets
              </Link>
            </li>
            <li className="nav-item mx-3 fs-5">
              <Link className="nav-link" to="/vehicles">
                Vehicles
              </Link>
            </li>
          </ul>

          <div className="nav-item dropdown" data-bs-auto-close="outside">
            <button
              className="btn btn-primary btn-lg dropdown-toggle"
              id="desplegableFavoritos"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites <span className="badge bg-secondary">{favoritos.length}</span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end navbar-dropdown-menu"
              aria-labelledby="desplegableFavoritos"
            >
              {favoritos.length === 0 ? (
                <li>
                  <span className="dropdown-item-text text-dark text-center fs-5">
                    (empty)
                  </span>
                </li>
              ) : (
                favoritos.map(favorito => (
                  <li
                    key={`${favorito.tipoDeEntidad}-${favorito.id}`}
                    className="d-flex align-items-center justify-content-between px-2 "
                  >
                    <Link
                      className="dropdown-item flex-grow-1 pe-2 text-primary limpiar-subrayado limpiar-subrayado-hover fs-5"
                      to={`/${favorito.tipoDeEntidad}/${favorito.id}`}
                    >
                      {favorito.nombre}
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-dark p-1 me-2 fa-lg"
                      aria-label={`Eliminar ${favorito.nombre}`}
                      onClick={evento => {
                        evento.preventDefault();
                        evento.stopPropagation();
                        eliminarFavorito(favorito);
                      }}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </li>
                ))
              )}
              <li><hr className="dropdown-divider" /></li>
              <li>
                <Link className="dropdown-item text-center limpiar-subrayado limpiar-subrayado-hover fs-5 text-primary" to="/favoritos">
                  Go to favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
