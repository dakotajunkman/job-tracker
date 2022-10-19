import React from 'react';
import {render} from '@testing-library/react';
import PageWrapperMenu from '../../../components/common/PageWrapperMenu';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';

mockMatchMedia();
const DEFAULT_PROPS = {};

describe('PageWrapperMenu', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <PageWrapperMenu {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a button for navigation links', () => {
    const component = setup();
    const button = component.getByRole('button', /Navigation Menu/i);
    expect(button).toBeInTheDocument();
  });

  it('renders a link to View Companies', () => {
    const component = setup();
    const link = component.getByTestId('ViewCompaniesLink');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/#');
  });

  it('renders a link to View Contacts', () => {
    const component = setup();
    const link = component.getByTestId('ViewContactsLink');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/#');
  });

  it('renders a link to View Analytics', () => {
    const component = setup();
    const link = component.getByTestId('ViewAnalyticsLink');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/#');
  });
});
