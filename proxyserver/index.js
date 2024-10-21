const express = require('express');
const axios = require('axios'); // For HTTP requests to C++ backend
const https = require('https'); // HTTPS setup
const fs = require('fs'); // File system to read SSL files
const cors = require('cors'); // CORS middleware

// Load SSL certificates (update with correct paths)
const key = fs.readFileSync('cert/private.key');
const cert = fs.readFileSync('cert/cert.crt');

// Create Express app
const app = express();

// Use CORS for all routes
app.use(cors());

// Parse JSON body (optional for future post requests)
app.use(express.json());

// C++ backend URL
const CPP_BACKEND_URL = 'http://localhost:8080';

// Catch-all route to forward requests to the C++ backend
app.use('*', async (req, res) => {
    const url = `${CPP_BACKEND_URL}${req.originalUrl}`; // Construct the C++ backend URL
    const method = req.method.toLowerCase(); // Get the request method

    try {
        const response = await axios({
            method,
            url,
            data: req.body, // Forward the request body (for POST/PUT requests)
            params: req.query, // Forward the query parameters
            headers: req.headers // Forward the request headers
        });
        res.status(response.status).send(response.data); // Send back the response from the C++ backend
    } catch (error) {
        console.error('Error forwarding request:', error);
        const status = error.response ? error.response.status : 500; // Use error status or 500
        res.status(status).send('Error communicating with C++ backend');
    }
});

// Create HTTPS server with SSL certificates
const httpsServer = https.createServer({ key, cert }, app);

// Start the HTTPS server on port 3000
httpsServer.listen(443, () => {
  console.log('HTTPS server running on https://localhost:443');
});
