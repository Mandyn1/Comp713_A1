import express from 'express';

const app = express();
const PORT = 5000;

// Middleware to handle JSON payloads
app.use(express.json());

// A simple API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from the TypeScript Backend!" });
});

app.listen(PORT, () => {
  console.log(`[Backend] API is running on http://localhost:${PORT}`);
});
