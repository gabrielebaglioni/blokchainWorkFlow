import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'onchain-monitor-ms', timestamp: new Date().toISOString() });
});

// TODO: Add API routes

app.listen(PORT, () => {
  console.log(`🚀 onchain-monitor-ms running on port ${PORT}`);
});
