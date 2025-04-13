import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes
import Navbar from './components/Navbar';

// Páginas
import Home from './pages/Home';
import Register from './pages/Register';
import Balance from './pages/Balance';
import Recharge from './pages/Recharge';
import Payment from './pages/Payment';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/recharge" element={<Recharge />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} ePayco Virtual Wallet</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
