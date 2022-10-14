import React from 'react';
import {render} from '@testing-library/react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';

mockMatchMedia();
const DEFAULT_PROPS = {};

describe('LoadingSpinner', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <LoadingSpinner {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });
});
