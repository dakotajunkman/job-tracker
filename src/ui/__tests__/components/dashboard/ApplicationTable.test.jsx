import React from 'react';
import {render} from '@testing-library/react';
import ApplicationTable from '../../../components/dashboard/Dashboard';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import * as nextauth from 'next-auth/react';

mockMatchMedia();
const DEFAULT_PROPS = {};

describe('ApplicationTable', () => {
  nextauth.useSession = jest
    .fn()
    .mockReturnValue({data: {name: 'Test User'}, session: 'authenticated'});

  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <ApplicationTable {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });
});
