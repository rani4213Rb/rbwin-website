import { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleRecharge = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/recharge', { amount: rechargeAmount });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error submitting recharge');
    }
  };

  const handleWithdraw = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/withdraw', { amount: withdrawAmount });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error submitting withdrawal');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>User Dashboard</h2>
      <p>Balance: ₹1000</p>
      <div>
        <h3>Recharge</h3>
        <input
          type="number"
          value={rechargeAmount}
          onChange={(e) => setRechargeAmount(e.target.value)}
          placeholder="Enter amount"
          style={{ padding: '10px', margin: '5px' }}
        />
        <button
          style={{ padding: '10px 20px', backgroundColor: '#F59E0B', color: 'white', border: 'none' }}
          onClick={handleRecharge}
        >
          Submit Recharge
        </button>
      </div>
      <div>
        <h3>Withdraw</h3>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Enter amount"
          style={{ padding: '10px', margin: '5px' }}
        />
        <button
          style={{ padding: '10px 20px', backgroundColor: '#F59E0B', color: 'white', border: 'none' }}
          onClick={handleWithdraw}
        >
          Submit Withdrawal
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
