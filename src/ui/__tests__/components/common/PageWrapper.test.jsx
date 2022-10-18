import React from 'react';
import {render, within} from '@testing-library/react';
import PageWrapper from '../../../components/common/PageWrapper';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';

mockMatchMedia();
const DEFAULT_PROPS = {
  children: (
    <div data-testid="ChildComponent">
      <span>Page Text</span>
    </div>
  ),
};

describe('PageWrapper', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <PageWrapper {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders children props', () => {
    const component = setup();
    const children = component.getByTestId('ChildComponent', 'Page Text');
    expect(children).toBeInTheDocument();
  });

  describe('Header Content', () => {
    it('renders the Header', () => {
      const component = setup();
      const header = component.getByTestId('PageWrapperHeader');
      expect(header).toBeInTheDocument();
    });

    it('renders the Job Tracker logo', () => {
      const component = setup();
      const logo = component.getByTestId('PageWrapperHeader', /Job Tracker/i);
      expect(logo).toBeInTheDocument();
      expect(within(logo).getByRole('link')).toHaveAttribute('href', '/');
    });

    it('renders a sign out button', () => {
      const component = setup();
      const button = component.getByRole('button', /sign out/i);
      expect(button).toBeInTheDocument();
    });

    it('renders a navigation menu', () => {
      const component = setup();
      const menu = component.getByTestId('NavigationMenu');
      expect(menu).toBeInTheDocument();
    });
  });

  describe('Footer Content', () => {
    it('renders the Footer', () => {
      const component = setup();
      const footer = component.getByTestId('PageWrapperFooter');
      expect(footer).toBeInTheDocument();
    });

    it('renders the Job Tracker name', () => {
      const component = setup();
      const logo = component.getByTestId('PageWrapperFooter', /Job Tracker/i);
      expect(logo).toBeInTheDocument();
    });
  });
});
