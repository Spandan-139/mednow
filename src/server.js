require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Mednow API is running.' });
});

console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas');
    app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error('Connection failed:', err.message);
  });