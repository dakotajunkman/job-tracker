import React from 'react';
import {render} from '@testing-library/react';
import Contacts from '../../pages/contacts';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../util/util';
import * as nextauth from 'next-auth/react';
import {MOCK_SESSION_DATA} from '../util/fixtures';

mockMatchMedia();
const DEFAULT_PROPS = {};

describe('Contacts', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <Contacts {...props} />
      </ChakraProvider>
    );
  };

  beforeEach(() => {
    nextauth.useSession = jest
      .fn()
      .mockReturnValue({data: MOCK_SESSION_DATA, status: 'authenticated'});
  });

  it('renders', () => {
    const page = setup();
    expect(page).toBeTruthy();
  });

  it('renders the children components', () => {
    const page = setup();
    const component = page.getByRole('heading', {name: 'Contacts'});
    expect(component).toBeInTheDocument();
  });
});
