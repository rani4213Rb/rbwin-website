import { useState } from 'react';
import axios from 'axios';

function Game() {
  const [color, setColor] = useState('');
  const [result, setResult] = useState('');

  const predictColor = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/game/predict', { color });
      setResult(res.data.message);
    } catch (err) {
      setResult('Error predicting');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Wingo Game</h2>
      <p>Predict the next color!</p>
      <div>
        <button
          style={{ padding: '10px', margin: '5px', backgroundColor: 'red', color: 'white', border: 'none' }}
          onClick={() => setColor('Red')}
        >
          Red
        </button>
        <button
          style={{ padding: '10px', margin: '5px', backgroundColor: 'green', color: 'white', border: 'none' }}
          onClick={() => setColor('Green')}
        >
          Green
        </button>
        <button
          style={{ padding: '10px', margin: '5px', backgroundColor: 'blue', color: 'white', border: 'none' }}
          onClick={() => setColor('Blue')}
        >
          Blue
        </button>
      </div>
      <button
        style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#F59E0B', color: 'white', border: 'none' }}
        onClick={predictColor}
      >
        Submit Prediction
      </button>
      <p>Result: {result}</p>
    </div>
  );
}

export default Game;
