require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const codeRoutes = require('./routes/code');
const reviewRoutes = require('./routes/reviewRoutes');
const codeAnalysisRoutes = require('./routes/codeAnalysisRoutes');

const app = express();


app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/codeethos', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication-related routes
app.use('/api', reviewRoutes); // Review-related routes
app.use('/api', codeRoutes); // Code analysis routes
app.use('/api/code-analysis', codeAnalysisRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
