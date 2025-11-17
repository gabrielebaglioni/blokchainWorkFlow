import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'news-scraper-ms', timestamp: new Date().toISOString() });
});

// TODO: Add API routes
app.get('/api/v1/articles', (req, res) => {
  res.json({ message: 'Not implemented yet' });
});

app.listen(PORT, () => {
  console.log(`🚀 News Scraper MS running on port ${PORT}`);
});

