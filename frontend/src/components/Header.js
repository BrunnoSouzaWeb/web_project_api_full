import logo from "../images/around.png";
import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Header({ loggedIn, userEmail, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignUpPage = location.pathname === "/signup";
  const isSignInPage = location.pathname === "/signin";

  const signOut = () => {
    handleLogout();
    localStorage.removeItem("jwt");
    navigate("/signin");
  };

  const RenderMenuItems = () => {
    if (isSignUpPage) {
      return (
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__item header__item_active" : "header__item"
          }
          to="/signin"
        >
          Faça o login
        </NavLink>
      );
    } else if (isSignInPage) {
      return (
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__item header__item_active" : "header__item"
          }
          to="/signup"
        >
          Inscreva-se
        </NavLink>
      );
    } else if (loggedIn) {
      return (
        <>
          <span className="header__item">{userEmail}</span>
          <button onClick={signOut} className="header__item header__button">
            Sair
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Logo Around the U.S." />
      <nav className="menu">
        <RenderMenuItems />
      </nav>
    </header>
  );
}

export default Header;
