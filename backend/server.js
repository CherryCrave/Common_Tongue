const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allows the React Native frontend to communicate with the backend.
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json('Server is looking healthy.');
})
// Starts the local server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:` + PORT);
});
