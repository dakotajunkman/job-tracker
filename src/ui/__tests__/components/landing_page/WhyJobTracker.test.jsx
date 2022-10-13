import React from 'react';
import {render, within} from '@testing-library/react';
import WhyJobTracker from '../../../components/landing_page/WhyJobTracker';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';

mockMatchMedia();
const DEFAULT_PROPS = {};

describe('WhyJobTracker', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <WhyJobTracker {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a heading', () => {
    const component = setup();
    const heading = component.getByRole('heading', {name: /Why use Job Tracker/i});
    expect(heading).toBeInTheDocument();
  });

  it('renders a list with three items', () => {
    const component = setup();
    const list = component.getByRole('list');
    const listItems = within(list).getAllByRole('listitem');
    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
  });
});
