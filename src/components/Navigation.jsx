import React from "react";
import "./Navigation.css";
import logo from "../logo/logo_white_large.png";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <div className="nav--wrapper">
        <figure className="nav__img--wrapper">
          <Link to="/">
            <img className="nav__img" src={logo} alt="" />
          </Link>
        </figure>
        <ul className="nav__links">
          <li className="nav__link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__link">
            <Link to="/discover">Discover</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
