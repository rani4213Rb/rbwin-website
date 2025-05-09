import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    alert(`Registering ${username}`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Register</h2>
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
        onClick={handleRegister}
      >
        Register
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
