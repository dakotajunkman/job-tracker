import React from 'react';
import {render} from '@testing-library/react';
import ApplicationSection from '../../../components/dashboard/ApplicationSection';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';

mockMatchMedia();
const DEFAULT_PROPS = {};

describe('ApplicationSection', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <ApplicationSection {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });
});
