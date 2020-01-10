const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

const getAuthorizeUrl = () => {
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile'
  });
};

const getUserProfileAndGoogleToken = async code => {
  const {
    tokens: { access_token }
  } = await client.getToken(code);

  const { data: profile } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
  );

  return { profile, googleToken: access_token };
};

const logout = async googleToken => {
  try {
    await client.revokeToken(googleToken);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { getAuthorizeUrl, getUserProfileAndGoogleToken, logout };
