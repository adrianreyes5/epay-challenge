import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          ePayco Wallet
        </Link>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Inicio</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register" className="navbar-link">Registro</Link>
        </li>
        <li className="navbar-item">
          <Link to="/balance" className="navbar-link">Consultar Saldo</Link>
        </li>
        <li className="navbar-item">
          <Link to="/recharge" className="navbar-link">Recargar</Link>
        </li>
        <li className="navbar-item">
          <Link to="/payment" className="navbar-link">Pagar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
