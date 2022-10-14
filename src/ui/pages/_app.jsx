import {ChakraProvider} from '@chakra-ui/react';
import {SessionProvider} from 'next-auth/react';

function MyApp({Component, pageProps: {session, ...pageProps}}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
