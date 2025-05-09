import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to RBWIN</h1>
      <p>Play Wingo and Win Big!</p>
      <Link to="/game">
        <button style={{ padding: '10px 20px', backgroundColor: '#F59E0B', border: 'none', color: 'white' }}>
          Play Wingo
        </button>
      </Link>
      <br />
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;
