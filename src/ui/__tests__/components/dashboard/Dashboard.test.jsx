import React from 'react';
import {getAllByTestId, render} from '@testing-library/react';
import Dashboard from '../../../components/dashboard/Dashboard';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia, mockScrollTo} from '../../util/util';
import * as nextauth from 'next-auth/react';

mockMatchMedia();
mockScrollTo();
const DEFAULT_PROPS = {};

describe('Dashboard', () => {
  nextauth.useSession = jest
    .fn()
    .mockReturnValue({data: {user: {name: 'Test User'}}, session: 'authenticated'});

  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <Dashboard {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a heading with specific text', () => {
    const component = setup();
    const heading = component.getByRole('heading', {name: /Dashboard for Test User/i});
    expect(heading).toBeInTheDocument();
  });

  it('renders the correct number of ApplicationSection components', () => {
    const NUMBER_OF_SECTIONS = 3;
    const component = setup();
    const applicationSections = component.getAllByTestId('ApplicationSection');
    expect(applicationSections).toHaveLength(NUMBER_OF_SECTIONS);
  });
});
