import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import Confetti from 'react-confetti';
import './App.css';

const socket = io('https://rbwin-backend.onrender.com');

const Home = ({ userId, token }) => {
  const [result, setResult] = useState('');
  const [timer, setTimer] = useState(60);
  const [bigSmall, setBigSmall] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [bonusMessage, setBonusMessage] = useState('');

  useEffect(() => {
    socket.on('timer', (time) => {
      setTimer(time);
    });

    socket.on('result', (gameResult) => {
      setResult(`Result: ${gameResult}`);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    });

    socket.on('bonus', (message) => {
      setBonusMessage(message);
      setTimeout(() => setBonusMessage(''), 5000);
    });

    return () => {
      socket.off('timer');
      socket.off('result');
      socket.off('bonus');
    };
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
      setResult('Prediction saved, waiting for result...');
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
      {showConfetti && <Confetti />}
      <h2 className="text-2xl font-bold mb-4">Welcome to RBWIN</h2>
      {bonusMessage && <p className="bonus-message">{bonusMessage}</p>}
      <div className="game-section">
        <h3 className="text-xl font-semibold">Wingo Game <span>Time Left: {timer}s</span></h3>
        <div className="prediction-buttons">
          <button onClick={() => handlePrediction('red')} className="bg-red-500 text-white px-5 py-2 m-2 rounded hover:bg-red-600">Red</button>
          <button onClick={() => handlePrediction('green')} className="bg-green-500 text-white px-5 py-2 m-2 rounded hover:bg-green-600">Green</button>
          <button onClick={() => handlePrediction('blue')} className="bg-blue-500 text-white px-5 py-2 m-2 rounded hover:bg-blue-600">Blue</button>
        </div>
        {result && <p className="mt-2">{result}</p>}
      </div>
      <div className="game-section">
        <h3 className="text-xl font-semibold">Big/Small Game</h3>
        <div className="prediction-buttons">
          <button onClick={() => handleBigSmall('Big')} className="bg-orange-500 text-white px-5 py-2 m-2 rounded hover:bg-orange-600">Big</button>
          <button onClick={() => handleBigSmall('Small')} className="bg-blue-400 text-white px-5 py-2 m-2 rounded hover:bg-blue-500">Small</button>
        </div>
        {bigSmall && <p className="mt-2">{bigSmall}</p>}
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
      <h2 className="text-2xl font-bold mb-4">Game History</h2>
      {history.length > 0 ? (
        <ul className="list-disc pl-5">
          {history.map((entry, index) => (
            <li key={index} className="mb-2">
              Predicted: {entry.color}, Result: {entry.result}, Time: {new Date(entry.timestamp).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No history yet.</p>
      )}
    </div>
  );
};

const Dashboard = ({ userId, token }) => {
  const [userData, setUserData] = useState({ balance: 0, vipLevel: 1, winStreak: 0 });

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
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Balance: ₹{userData.balance} | VIP Level: {userData.vipLevel} | Win Streak: {userData.winStreak}</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">Upgrade VIP</button>
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
      <h2 className="text-2xl font-bold mb-4">Withdraw</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      >
        <option>UPI</option>
      </select>
      <div className="upi-details">
        <p><strong>Payment will be sent to your UPI:</strong> rani4213@upi</p>
        <p>OR</p>
        <p>Scan the QR Code to receive payment:</p>
        <img src="https://via.placeholder.com/150?text=QR+Code" alt="UPI QR Code" className="w-36 h-36 mx-auto" />
        <p className="mt-2">Your withdrawal request will be processed within 24 hours.</p>
      </div>
      <button onClick={handleWithdraw} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Submit Withdraw
      </button>
    </div>
  );
};

const Recharge = ({ userId, token }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('UPI');
  const [transactionId, setTransactionId] = useState('');

  const handleRecharge = async () => {
    if (!transactionId) {
      alert('Please enter the transaction ID after making the payment.');
      return;
    }
    const response = await fetch('https://rbwin-backend.onrender.com/api/recharge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ amount: parseInt(amount), method, transactionId }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="recharge">
      <h2 className="text-2xl font-bold mb-4">Recharge</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      >
        <option>UPI</option>
      </select>
      <div className="upi-details">
        <p><strong>Pay via UPI:</strong> rani4213@upi</p>
        <p>OR</p>
        <p>Scan the QR Code to pay:</p>
        <img src="https://via.placeholder.com/150?text=QR+Code" alt="UPI QR Code" className="w-36 h-36 mx-auto" />
        <p className="mt-2">After payment, enter the Transaction ID below:</p>
        <input
          type="text"
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
      </div>
      <button onClick={handleRecharge} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Submit Recharge
      </button>
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
      <h2 className="text-2xl font-bold mb-4">Referral</h2>
      <input
        type="text"
        placeholder="Enter Referral Code"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <button onClick={handleReferral} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit Referral
      </button>
    </div>
  );
};

const Profile = ({ userId, token }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`https://rbwin-backend.onrender.com/api/profile/${userId}`, {
        headers: { 'Authorization': token },
      });
      const data = await response.json();
      setProfile(data);
    };
    if (userId && token) fetchProfile();
  }, [userId, token]);

  return (
    <div className="profile">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Balance: ₹{profile.balance}</p>
      <p>VIP Level: {profile.vipLevel}</p>
      <p>Referral Code: {profile.referralCode}</p>
    </div>
  );
};

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch('https://rbwin-backend.onrender.com/api/leaderboard');
      const data = await response.json();
      setTopUsers(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      {topUsers.length > 0 ? (
        <ul className="list-decimal pl-5">
          {topUsers.map((user, index) => (
            <li key={index} className="mb-2">{index + 1}. {user.username} - ₹{user.balance}</li>
          ))}
        </ul>
      ) : (
        <p>No users yet.</p>
      )}
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
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Login
      </button>
    </div>
  );
};

function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setUserId(null);
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1 className="text-3xl font-bold">RBWIN</h1>
          <nav>
            <Link to="/" className="text-white mx-2 hover:underline">Home</Link>
            <Link to="/game-history" className="text-white mx-2 hover:underline">History</Link>
            <Link to="/dashboard" className="text-white mx-2 hover:underline">Dashboard</Link>
            <Link to="/withdraw" className="text-white mx-2 hover:underline">Withdraw</Link>
            <Link to="/recharge" className="text-white mx-2 hover:underline">Recharge</Link>
            <Link to="/referral" className="text-white mx-2 hover:underline">Referral</Link>
            <Link to="/profile" className="text-white mx-2 hover:underline">Profile</Link>
            <Link to="/leaderboard" className="text-white mx-2 hover:underline">Leaderboard</Link>
            <Link to="/login" onClick={userId ? handleLogout : null} className="text-white mx-2 hover:underline">
              {userId ? 'Logout' : 'Login'}
            </Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home userId={userId} token={token} />} />
          <Route path="/game-history" element={<GameHistory userId={userId} token={token} />} />
          <Route path="/dashboard" element={<Dashboard userId={userId} token={token} />} />
          <Route path="/withdraw" element={<Withdraw userId={userId} token={token} />} />
          <Route path="/recharge" element={<Recharge userId={userId} token={token} />} />
          <Route path="/referral" element={<Referral userId={userId} token={token} />} />
          <Route path="/profile" element={<Profile userId={userId} token={token} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
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
