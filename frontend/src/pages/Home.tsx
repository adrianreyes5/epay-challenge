import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a ePayco Wallet</h1>
      <p>Tu billetera virtual para pagos y recargas</p>
      
      <div className="features">
        <div className="feature-card">
          <h2>Registro</h2>
          <p>Crea tu cuenta en nuestra plataforma</p>
          <Link to="/register" className="btn btn-primary">Registrarse</Link>
        </div>
        
        <div className="feature-card">
          <h2>Consulta tu saldo</h2>
          <p>Verifica el saldo disponible en tu billetera</p>
          <Link to="/balance" className="btn btn-primary">Consultar</Link>
        </div>
        
        <div className="feature-card">
          <h2>Recarga tu billetera</h2>
          <p>Añade fondos a tu billetera virtual</p>
          <Link to="/recharge" className="btn btn-primary">Recargar</Link>
        </div>
        
        <div className="feature-card">
          <h2>Realiza pagos</h2>
          <p>Paga de forma segura con tu billetera</p>
          <Link to="/payment" className="btn btn-primary">Pagar</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
