const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read DB
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
// Helper to write DB
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// GET all farmers
app.get('/api/farmers', (req, res) => {
  const db = readDB();
  res.json(db.farmers);
});

// POST new farmer
app.post('/api/farmers', (req, res) => {
  const db = readDB();
  const newFarmer = {
    ...req.body,
    id: `FRM-${Math.floor(1000 + Math.random() * 9000)}`,
    walletBalance: 0,
    totalSubsidy: 0,
    redemptionHistory: []
  };
  db.farmers.push(newFarmer);
  writeDB(db);
  res.status(201).json(newFarmer);
});

// GET all transactions
app.get('/api/transactions', (req, res) => {
  const db = readDB();
  res.json(db.transactions);
});

// POST new transaction
app.post('/api/transactions', (req, res) => {
  const db = readDB();
  const { farmerId, amount, dealer, item, location, program } = req.body;
  
  const farmerIndex = db.farmers.findIndex(f => f.id === farmerId);
  if (farmerIndex === -1) return res.status(404).json({ error: 'Farmer not found' });
  
  if (db.farmers[farmerIndex].walletBalance < amount) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  // Update farmer
  db.farmers[farmerIndex].walletBalance -= amount;
  const newTxn = {
    id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
    farmerId,
    farmerName: db.farmers[farmerIndex].name,
    program: program || 'General Subsidy',
    dealer,
    value: amount,
    timestamp: new Date().toISOString(),
    location,
    status: 'Completed'
  };
  
  db.farmers[farmerIndex].redemptionHistory.push({
    id: newTxn.id,
    date: newTxn.timestamp.split('T')[0],
    item,
    amount,
    dealer
  });

  db.transactions.unshift(newTxn);
  writeDB(db);
  res.status(201).json(newTxn);
});

// GET metrics
app.get('/api/metrics', (req, res) => {
  const db = readDB();
  res.json(db.impactMetrics);
});

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
