const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gestiontime';

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('DB ERROR:', err);
    console.error(err.stack);
  });
