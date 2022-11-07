export const MOCK_SESSION_DATA = {
  user: {
    name: 'John Doe',
    email: 'johndoe@oregonstate.edu',
    image: 'https://picsum.photos/96',
  },
  expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
  accessToken: 'abc',
  jwt: 'xyz',
};
