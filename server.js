const express = require('express');
const connectDB = require('./db');
const seedDatabase = require('./seeder');
const apiRoutes = require('./api');

const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB()
    .then(() => {
        // Seed the database
        seedDatabase();

        // Set up API routes
        app.use('/api', apiRoutes);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });
