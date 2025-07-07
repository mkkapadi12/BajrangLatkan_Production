const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://niravkanzariya11:nirav11@productworker.4lzp4mg.mongodb.net/?retryWrites=true&w=majority&appName=productworker');

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/workers', require('./routes/workers'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});