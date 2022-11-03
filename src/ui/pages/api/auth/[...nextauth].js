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
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  console.log('refreshing token...');
  console.log('old token:', token);
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

    if (!response.ok) {
      throw refreshedTokens;
    }

    console.log('new token:', {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    });

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, account}) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        const {access_token, id_token, expires_at, refresh_token} = account;
        token.accessToken = access_token;
        token.jwt = id_token;
        token.accessTokenExpires = Date.now() + expires_at * 1000;
        token.refreshToken = refresh_token;

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

        return token;
      }

      // Return previous token if the access token has not yet expired
      if (Date.now() < token.accessTokenExpires) return token;

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({session, token, user}) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.jwt = token.jwt;
      session.error = token.error;
      return session;
    },
  },
};

export default NextAuth(authOptions);
