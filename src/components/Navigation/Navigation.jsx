import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <NavLink
        className={({ isActive }) => {
          return isActive && css.active;
        }}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return isActive && css.active;
        }}
        to="/movies"
      >
        Movies
      </NavLink>
    </nav>
  );
}
