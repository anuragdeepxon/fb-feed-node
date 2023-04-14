fb-feed-node

A flawless Facebook authentication and feed package for Node.js and Express.js applications.

Installation

You can install the package using NPM:

npm install fb-feed-node

Usage

To use the fb-feed-node package in your Node.js or Express.js application, you first need to create a Facebook App and get your App ID and App Secret. Once you have your App ID and App Secret, create a .env file in your project root directory and add the following lines:

FB_APP_ID=your_facebook_app_id
FB_APP_SECRET=your_facebook_app_secret

Replace your_facebook_app_id and your_facebook_app_secret with your actual Facebook App ID and App Secret.

Next, create a simple Express.js application with a route that handles Facebook authentication and user data retrieval using the fb-feed-node package:

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

In this example, the fbAuth function from the fb-feed-node package is used to authenticate the user and fetch user data and feeds. The Facebook Login URL should point to /auth/facebook/callback route in your Express.js application.

To test the package, create a simple HTML file with a login button that redirects users to the Facebook Login URL:

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Facebook Login Test</title>
</head>
<body>
  <h1>Facebook Login Test</h1>
  <a href="https://www.facebook.com/v13.0/dialog/oauth?client_id=your_facebook_app_id&redirect_uri=http://localhost:3000/auth/facebook/callback&scope=email,public_profile,user_posts">Login with Facebook</a>
</body>
</html>

Replace your_facebook_app_id with your actual Facebook App ID. Then, open the HTML file in a browser and click on the "Login with Facebook" button. After successful login and authorization, the user should be redirected to the /auth/facebook/callback route, and the userData and userFeeds should be returned as a JSON response.

Contributing

If you find any bugs or issues with the fb-feed-node package, please open an issue on the GitHub repository. Pull requests are welcome as well!

License

This package is licensed under the MIT License. See the LICENSE file for details.
