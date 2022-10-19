import React from 'react';
import {render} from '@testing-library/react';
import LandingPage from '../../../components/landing_page/LandingPage';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import * as nextauth from 'next-auth/react';

mockMatchMedia();
const DEFAULT_PROPS = {};

describe('LandingPage', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <LandingPage {...props} />
      </ChakraProvider>
    );
  };

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
