import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'social-publisher-ms', timestamp: new Date().toISOString() });
});

// TODO: Add API routes

app.listen(PORT, () => {
  console.log(`🚀 social-publisher-ms running on port ${PORT}`);
});
