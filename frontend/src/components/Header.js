import React from "react";
import logo from "../images/logo.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Header({ loggedIn, setLoggedIn, userEmail }) {
  const navigate = useNavigate();
  let location = useLocation();

  function signOut() {
    localStorage.removeItem("token");
    navigate("/signin");
    setLoggedIn(false);
  }

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Место" />

      {location.pathname === "/signup" && (
        <NavLink to="/signin" className="header__link">
          Войти
        </NavLink>
      )}

      {location.pathname === "/signin" && (
        <NavLink to="/signup" className="header__link">
          Регистрация
        </NavLink>
      )}

      {location.pathname === "/" && (
        <div className="header__logout">
          <p className="header__data-user">{userEmail}</p>
          <NavLink to="/signin" className="header__link" onClick={signOut}>
            Выйти
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
