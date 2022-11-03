import React from 'react';
import {render} from '@testing-library/react';
import NavigationSidebar from '../../../../components/common/navigation/NavigationSidebar';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../../util/util';

mockMatchMedia();
const DEFAULT_PROPS = {};
const LINKS = [
  {label: 'View Applications', href: '/'},
  {label: 'View Companies', href: '/companies'},
  {label: 'View Contacts', href: '/#'},
  {label: 'View Analytics', href: '/#'},
];

describe('NavigationSidebar', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <NavigationSidebar {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a heading for navigation', () => {
    const component = setup();
    const header = component.getByRole('heading', {name: /Navigation/i});
    expect(header).toBeInTheDocument();
  });

  it('renders a link for each link', () => {
    const component = setup();
    LINKS.forEach(link => {
      const {label, href} = link;
      const linkElement = component.getByRole('link', {name: label});
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', href);
    });
  });
});
