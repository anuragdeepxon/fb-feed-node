# fb-feed-node

A flawless Facebook authentication and feed package for Node.js and Express.js applications.

This package helps you authenticate users with Facebook, fetch their profile data, and fetch their Facebook feed. It handles the OAuth2 flow and provides a simple API to retrieve the data.

## Installation

Install the package using npm:

npm install fb-feed-node

## Usage

1. Create a `.env` file in the root directory of your project, and set the following environment variables:

FB_APP_ID=your_facebook_app_id
FB_APP_SECRET=your_facebook_app_secret

Replace `your_facebook_app_id` and `your_facebook_app_secret` with your actual Facebook App ID and App Secret.

2. In your Express.js application, require the `fb-feed-node` package and set up a route to handle the Facebook authentication callback:

```javascript
const express = require('express');
const fbAuth = require('fb-feed-node');
const dotenv = require('dotenv');
dotenv.config();

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

Create a Facebook Login URL with your Facebook App ID and the callback URL:

https://www.facebook.com/v13.0/dialog/oauth?client_id=your_facebook_app_id&redirect_uri=http://localhost:3000/auth/facebook/callback&scope=email,public_profile,user_posts
Replace your_facebook_app_id with your actual Facebook App ID.

Add a "Login with Facebook" button to your frontend that redirects users to the Facebook Login URL.
After the user logs in and grants the required permissions, they will be redirected to the /auth/facebook/callback route, where the package will handle the authentication process and fetch the user data and feeds.

License
MIT
