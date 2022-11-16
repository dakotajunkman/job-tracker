import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET, BACKEND_URL} = process.env;

const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
  });

/**
 * Adopted from: https://next-auth.js.org/tutorials/refresh-token-rotation
 * Accessed on 11/16/2022
 *
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async token => {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;
    const {access_token, expires_at, refresh_token} = refreshedTokens;

    return {
      ...token,
      accessToken: access_token,
      accessTokenExpires: Date.now() + expires_at * 1000,
      refreshToken: refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

const createNewUser = async token => {
  const {jwt, email, accessToken} = token;

  const peopleResponse = await fetch(
    'https://people.googleapis.com/v1/people/me?personFields=names',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const people = await peopleResponse.json();
  const {givenName, familyName} = people.names[0];

  await fetch(`${BACKEND_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify({
      firstName: givenName,
      lastName: familyName,
      emailAddress: email,
    }),
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
};

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, user, account}) {
      // Persist the OAuth access_token to the token right after signin
      if (account && user) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = Date.now() + account.expires_at * 1000;
        token.refreshToken = account.refresh_token;
        token.jwt = account.id_token;
        token.user = user;
        await createNewUser(token);
        return token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({session, token, user}) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.jwt = token.jwt;
      return session;
    },
  },
};

export default NextAuth(authOptions);
