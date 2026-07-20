import { NavLink } from "react-router";
import "./Notfound.css";

export default function NotFound() {
  return (
    <div className="error-page">
      <h1 className="error">404</h1>
      <p className="content">Cette page n'existe pas.</p>
      <NavLink to="/" end className="home-link">retour à l'acceuil</NavLink>
    </div>
  );
}