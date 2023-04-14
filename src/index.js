const express = require('express');
const fbAuth = require('./fbAuth');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/auth/facebook/callback', async (req, res) => {
  const code = req.query.code;
  const redirectUri = 'http://localhost:3000/auth/facebook/callback';

  try {
    const { userData, userFeeds } = await fbAuth(code, redirectUri);
    res.json({ userData, userFeeds });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Facebook data' });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
