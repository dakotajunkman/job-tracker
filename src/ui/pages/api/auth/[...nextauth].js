import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET, BACKEND_URL} = process.env;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, account}) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.jwt = account.id_token;
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
      }
      return token;
    },
    async session({session, token, user}) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.jwt = token.jwt;
      return session;
    },
  },
};

export default NextAuth(authOptions);
