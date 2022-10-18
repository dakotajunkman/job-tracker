import React from 'react';
import {render} from '@testing-library/react';
import NavigationLink from '../../../components/dashboard/NavigationLink';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import {MdBusiness} from 'react-icons/md';

mockMatchMedia();
const DEFAULT_PROPS = {
  icon: MdBusiness,
  label: 'Link Text',
  href: '/location',
};

describe('NavigationLink', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <NavigationLink {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });
});
