fb-feed-node
A flawless Facebook authentication and feed package for Node.js and Express.js applications.

Installation
To install the package, run:

npm install fb-feed-node

Usage
To use the package, you need to have a Facebook Developer account and a Facebook App.

Create a new Facebook App in the Facebook Developer Console.

Add the "Facebook Login" product to your app and configure the settings.

Note down the App ID and App Secret values from your Facebook App dashboard.

Configure the .env file in your project directory with the FB_APP_ID and FB_APP_SECRET values:

makefile
FB_APP_ID=your_facebook_app_id
FB_APP_SECRET=your_facebook_app_secret
Create a new Express.js application and add the following code:

javascript
const express = require('express');
const fbAuth = require('fb-feed-node');

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
Make sure to replace your_facebook_app_id with your actual Facebook App ID.

In your frontend, create a Facebook Login URL that directs users to the /auth/facebook/callback route in your Express.js application:

bash
https://www.facebook.com/v13.0/dialog/oauth?client_id=your_facebook_app_id&redirect_uri=http://localhost:3000/auth/facebook/callback&scope=email,public_profile,user_posts
Replace your_facebook_app_id with your actual Facebook App ID.

After successful login and authorization, the fbAuth function will fetch user data and user posts from Facebook and return the results as a JSON object.

Contributing
Pull requests and issues are welcome. To submit a pull request:

Fork the repository and create a new branch.
Make changes and add tests.
Run npm test to ensure that the tests pass.
Submit a pull request with a description of the changes.

License
This package is licensed under the MIT License. See the LICENSE file for more information.
