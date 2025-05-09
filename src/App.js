import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const Home = ({ userId, token }) => {
  const [result, setResult] = useState('');
  const [timer, setTimer] = useState(60);
  const [bigSmall, setBigSmall] = useState('');

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handlePrediction = async (color) => {
    const response = await fetch('https://rbwin-backend.onrender.com/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ color }),
    });
    const data = await response.json();
    if (data.success) {
      setResult(`Predicted: ${color}, Result: ${data.result}`);
    }
  };

  const handleBigSmall = async (option) => {
    const response = await fetch('https://rbwin-backend.onrender.com/api/bigsmall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ option }),
    });
    const data = await response.json();
    if (data.success) {
      setBigSmall(`Number: ${data.number}, You chose: ${option}, Result: ${data.result}`);
    }
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

const GameHistory = ({ userId, token }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`https://rbwin-backend.onrender.com/api/predictions/${userId}`, {
        headers: { 'Authorization': token },
      });
      const data = await response.json();
      setHistory(data);
    };
    if (userId && token) fetchHistory();
  }, [userId, token]);

  return (
    <div className="game-history">
      <h2>Game History</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>Predicted: {entry.color}, Result: {entry.result}, Time: {new Date(entry.timestamp).toLocaleTimeString()}</li>
          ))}
        </ul>
      ) : (
        <p>No history yet.</p>
      )}
    </div>
  );
};

const Dashboard = ({ userId, token }) => {
  const [userData, setUserData] = useState({ balance: 0, vipLevel: 1 });

  useEffect(() => {
    const fetchDashboard = async () => {
      const response = await fetch(`https://rbwin-backend.onrender.com/api/dashboard/${userId}`, {
        headers: { 'Authorization': token },
      });
      const data = await response.json();
      setUserData(data);
    };
    if (userId && token) fetchDashboard();
  }, [userId, token]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Balance: ₹{userData.balance} | VIP Level: {userData.vipLevel}</p>
      <button>Upgrade VIP</button>
    </div>
  );
};

const Withdraw = ({ userId, token }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('UPI');

  const handleWithdraw = async () => {
    const response = await fetch('https://rbwin-backend.onrender.com/api/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ amount: parseInt(amount), method }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="withdraw">
      <h2>Withdraw</h2>
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option>UPI</option>
        <option>Paytm</option>
      </select>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
};

const Recharge = ({ userId, token }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('UPI');

  const handleRecharge = async () => {
    const response = await fetch('https://rbwin-backend.onrender.com/api/recharge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ amount: parseInt(amount), method }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="recharge">
      <h2>Recharge</h2>
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option>UPI</option>
        <option>Paytm</option>
      </select>
      <button onClick={handleRecharge}>Recharge</button>
    </div>
  );
};

const Referral = ({ userId, token }) => {
  const [referralCode, setReferralCode] = useState('');

  const handleReferral = async () => {
    const response = await fetch('https://rbwin-backend.onrender.com/api/referral', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ referralCode }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="referral">
      <h2>Referral</h2>
      <input type="text" placeholder="Enter Referral Code" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
      <button onClick={handleReferral}>Submit Referral</button>
    </div>
  );
};

const Login = ({ setUserId, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('https://rbwin-backend.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      setUserId(data.userId);
      setToken(data.token);
      alert('Login successful');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

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
            <Link to="/login" style={{ margin: '0 10px', color: 'white' }}>{userId ? 'Logout' : 'Login'}</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home userId={userId} token={token} />} />
          <Route path="/game-history" element={<GameHistory userId={userId} token={token} />} />
          <Route path="/dashboard" element={<Dashboard userId={userId} token={token} />} />
          <Route path="/withdraw" element={<Withdraw userId={userId} token={token} />} />
          <Route path="/recharge" element={<Recharge userId={userId} token={token} />} />
          <Route path="/referral" element={<Referral userId={userId} token={token} />} />
          <Route path="/login" element={<Login setUserId={setUserId} setToken={setToken} />} />
        </Routes>
        <footer className="footer">
          <p>RBWIN © 2025 | Contact: support@rbwin.games</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
