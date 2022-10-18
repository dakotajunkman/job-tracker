import React from 'react';
import {render} from '@testing-library/react';
import StatusLabel from '../../../components/dashboard/StatusLabel';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';

mockMatchMedia();
const DEFAULT_PROPS = {
  status: 'applied',
  key: 'c1465a83-b2a2-4059-b1b7-922ad5aa7213',
};

describe('StatusLabel', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <StatusLabel {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });
});
