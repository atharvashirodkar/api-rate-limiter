require('dotenv').config();
const express = require('express');
const fixedWindowMiddleware = require('./src/middleware/fixedWindow');

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());


app.get('/ping', fixedWindowMiddleware, (req, res) => {
  res.json({ status: 'ok'});
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});