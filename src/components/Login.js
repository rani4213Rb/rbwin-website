import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Logging in ${username}`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={{ padding: '10px', margin: '5px', display: 'block' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ padding: '10px', margin: '5px', display: 'block' }}
      />
      <button
        style={{ padding: '10px 20px', backgroundColor: '#F59E0B', color: 'white', border: 'none' }}
        onClick={handleLogin}
      >
        Login
      </button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
