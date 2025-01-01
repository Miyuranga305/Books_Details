import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import bodyParser from 'body-parser'; // Import body-parser for parsing JSON
import express from 'express'; // Import express to create the server
import axios from 'axios'; // Import axios for making HTTP requests

dotenv.config(); // Load environment variables from .env

const app = express();

app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.static('public')); // Serve static files from the "public" directory

// Set CORS headers for all incoming requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); // Allow specified methods
  next();
});

// Route to get books from Google Books API
app.get('/api/books', async (req, res) => {
  const query = req.query.q || 'react'; // Default to 'react' if no query parameter is provided
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY; // Load the API key from environment variables
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
    res.json(response.data.items); // Send the list of books as the response
  } catch (error) {
    console.error('Error fetching books:', error); // Log errors for debugging
    res.status(500).json({ message: 'Failed to fetch books from Google Books API.' }); // Send error response
  }
});

// Handle OPTIONS requests for CORS
app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Respond with status 200 for preflight requests
  }
  res.status(404).json({ message: 'Not found' }); // Respond with 404 for other unmatched routes
});

// Start the server
app.listen(3002, () => {
  console.log('Backend server is running on port 3002');
});
