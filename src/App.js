import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const Home = () => {
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [timer, setTimer] = useState(60); // 1 minute timer
  const [bigSmall, setBigSmall] = useState('');

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handlePrediction = (color) => {
    const colors = ['red', 'green', 'blue'];
    const randomResult = colors[Math.floor(Math.random() * colors.length)];
    const newResult = { color, result: randomResult, time: new Date().toLocaleTimeString() };
    setResult(`Predicted: ${color}, Result: ${randomResult}`);
    setHistory([...history, newResult]);
  };

  const handleBigSmall = (option) => {
    const number = Math.floor(Math.random() * 100) + 1;
    setBigSmall(`Number: ${number}, You chose: ${option}, ${number > 50 ? 'Big' : 'Small'}`);
  };

  return (
    <div className="home">
      <h2>Welcome to RBWIN</h2>
      <div className="game-section">
        <h3>Wingo Game <span>Time Left: {timer}s</span></h3>
        <div className="prediction-buttons">
          <button onClick={() => handlePrediction('red')} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', margin: '5px' }}>Red</button>
          <button onClick={() => handlePrediction('green')} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', margin: '5px' }}>Green</button>
          <button onClick={() => handlePrediction('blue')} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', margin: '5px' }}>Blue</button>
        </div>
        {result && <p>{result}</p>}
      </div>
      <div className="game-section">
        <h3>Big/Small Game</h3>
        <div className="prediction-buttons">
          <button onClick={() => handleBigSmall('Big')} style={{ backgroundColor: '#ff9800', color: 'white', padding: '10px 20px', margin: '5px' }}>Big</button>
          <button onClick={() => handleBigSmall('Small')} style={{ backgroundColor: '#2196f3', color: 'white', padding: '10px 20px', margin: '5px' }}>Small</button>
        </div>
        {bigSmall && <p>{bigSmall}</p>}
      </div>
    </div>
  );
};

const GameHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Mock history (real data will come from backend)
    const mockHistory = [
      { color: 'red', result: 'green', time: '10:00 AM' },
      { color: 'blue', result: 'blue', time: '10:01 AM' },
    ];
    setHistory(mockHistory);
  }, []);

  return (
    <div className="game-history">
      <h2>Game History</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>Predicted: {entry.color}, Result: {entry.result}, Time: {entry.time}</li>
          ))}
        </ul>
      ) : (
        <p>No history yet.</p>
      )}
    </div>
  );
};

const Dashboard = () => (
  <div className="dashboard">
    <h2>Dashboard</h2>
    <p>Balance: ₹500 | VIP Level: 1</p>
    <button>Upgrade VIP</button>
  </div>
);

const Withdraw = () => (
  <div className="withdraw">
    <h2>Withdraw</h2>
    <input type="number" placeholder="Amount" />
    <select>
      <option>UPI</option>
      <option>Paytm</option>
    </select>
    <button>Withdraw</button>
  </div>
);

const Recharge = () => (
  <div className="recharge">
    <h2>Recharge</h2>
    <input type="number" placeholder="Amount" />
    <select>
      <option>UPI</option>
      <option>Paytm</option>
    </select>
    <button>Recharge</button>
  </div>
);

const Referral = () => (
  <div className="referral">
    <h2>Referral</h2>
    <p>Referral Code: RBWIN123</p>
    <button>Invite Friends</button>
  </div>
);

const Login = () => (
  <div className="login">
    <h2>Login</h2>
    <input type="text" placeholder="Username" />
    <input type="password" placeholder="Password" />
    <button>Login</button>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>RBWIN</h1>
          <nav>
            <Link to="/" style={{ margin: '0 10px', color: 'white' }}>Home</Link>
            <Link to="/game-history" style={{ margin: '0 10px', color: 'white' }}>History</Link>
            <Link to="/dashboard" style={{ margin: '0 10px', color: 'white' }}>Dashboard</Link>
            <Link to="/withdraw" style={{ margin: '0 10px', color: 'white' }}>Withdraw</Link>
            <Link to="/recharge" style={{ margin: '0 10px', color: 'white' }}>Recharge</Link>
            <Link to="/referral" style={{ margin: '0 10px', color: 'white' }}>Referral</Link>
            <Link to="/login" style={{ margin: '0 10px', color: 'white' }}>Login</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game-history" element={<GameHistory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <footer className="footer">
          <p>RBWIN © 2025 | Contact: support@rbwin.games</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
