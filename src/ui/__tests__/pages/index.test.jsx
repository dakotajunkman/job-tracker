import React from 'react';
import {render} from '@testing-library/react';
import Home from '../../pages/index';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../util/util';

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
