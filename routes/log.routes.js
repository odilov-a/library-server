const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Define the directory where log files are stored
const logDir = path.join(__dirname, '../logs');

// Route to get log data
router.get('/', (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const logFileName = `${currentDate}.mongodb.log`;
  const logFilePath = path.join(logDir, logFileName);

  fs.access(logFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Log file not found' });
    }

    // Set response headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Create a readable stream from the log file
    const stream = fs.createReadStream(logFilePath, { encoding: 'utf8' });

    // Pipe the stream to the response object
    stream.pipe(res);

    // Handle stream errors
    stream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).end('Internal Server Error');
    });

    // Handle client disconnect
    req.on('close', () => {
      console.log('Client disconnected');
      stream.destroy();
    });
  });
});


module.exports = router;
