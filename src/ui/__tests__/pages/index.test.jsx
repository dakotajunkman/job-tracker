import React from 'react';
import {render} from '@testing-library/react';
import Home from '../../pages/index';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../util/util';
import * as nextauth from 'next-auth/react';

mockMatchMedia();
const DEFAULT_PROPS = {};

describe('Home', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <Home {...props} />
      </ChakraProvider>
    );
  };

  describe('Landing Page for Logged Out Users', () => {
    nextauth.useSession = jest.fn().mockReturnValue({data: false, session: 'unauthenticated'});

    it('renders', () => {
      const page = setup();
      expect(page).toBeTruthy();
    });

    it('renders the WhyJobTracker component', () => {
      const page = setup();
      const component = page.getByTestId('WhyJobTracker');
      expect(component).toBeInTheDocument();
    });

    it('renders the LoginContainer component', () => {
      const page = setup();
      const component = page.getByTestId('LoginContainer');
      expect(component).toBeInTheDocument();
    });
  });

  /* TODO: Add tests for Dashboard Page */
  describe('Dashboard Page for Logged In Users', () => {
    // nextauth.useSession = jest.fn().mockReturnValue({
    //   data: {
    //     /* Add session data here */
    //   },
    //   session: 'authenticated',
    // });

    it('renders', () => {
      const page = setup();
      expect(page).toBeTruthy();
    });
  });
});
