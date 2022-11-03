import React from 'react';
import {render} from '@testing-library/react';
import Companies from '../../pages/companies';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../util/util';
import * as nextauth from 'next-auth/react';

mockMatchMedia();
const DEFAULT_PROPS = {};

describe('Companies', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <Companies {...props} />
      </ChakraProvider>
    );
  };

  beforeEach(() => {
    nextauth.useSession = jest.fn().mockReturnValue({data: {jwt: 'abc'}, status: 'authenticated'});
  });

  it('renders', () => {
    const page = setup();
    expect(page).toBeTruthy();
  });

  it('renders the children components', () => {
    const page = setup();
    const component = page.getByText(/Job Tracker Companies/i);
    expect(component).toBeInTheDocument();
  });
});
