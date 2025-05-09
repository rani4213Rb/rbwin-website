const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('YOUR_MONGODB_URI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  type: String, // 'recharge' or 'withdraw'
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Game Prediction API
app.post('/api/game/predict', async (req, res) => {
  const { color } = req.body;
  const colors = ['Red', 'Green', 'Blue'];
  const result = colors[Math.floor(Math.random() * colors.length)];
  if (color === result) {
    res.json({ message: `You won! Result: ${result}` });
  } else {
    res.json({ message: `You lost! Result: ${result}` });
  }
});

// Recharge API
app.post('/api/recharge', async (req, res) => {
  const { amount } = req.body;
  try {
    const transaction = new Transaction({
      userId: 'user123', // Replace with actual user ID
      amount,
      type: 'recharge',
    });
    await transaction.save();
    res.status(201).json({ message: 'Recharge request submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting recharge' });
  }
});

// Withdrawal API
app.post('/api/withdraw', async (req, res) => {
  const { amount } = req.body;
  try {
    const transaction = new Transaction({
      userId: 'user123', // Replace with actual user ID
      amount,
      type: 'withdraw',
    });
    await transaction.save();
    res.status(201).json({ message: 'Withdrawal request submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting withdrawal' });
  }
});

// Admin: Get all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

// Admin: Update transaction status
app.put('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: 'Transaction updated', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Error updating transaction' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
