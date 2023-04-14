const rp = require('request-promise');
const dotenv = require('dotenv');
dotenv.config();

const fbAuth = async (code, redirectUri) => {
  const appId = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;

  try {
    const tokenResponse = await rp({
      method: 'GET',
      uri: `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${appSecret}&code=${code}`,
      json: true
    });

    const accessToken = tokenResponse.access_token;

    const userData = await rp({
      method: 'GET',
      uri: `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`,
      json: true
    });

    const userFeeds = await rp({
      method: 'GET',
      uri: `https://graph.facebook.com/${userData.id}/feed?access_token=${accessToken}`,
      json: true
    });

    return {
      userData,
      userFeeds
    };
  } catch (error) {
    console.error('Error fetching Facebook data:', error);
    throw error;
  }
};

module.exports = fbAuth;
