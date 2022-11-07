import React from 'react';
import {render} from '@testing-library/react';
import Dashboard from '../../../components/dashboard/Dashboard';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia, mockScrollTo} from '../../util/util';
import * as nextauth from 'next-auth/react';
import applicationsJson from '../../../public/json/applicationsExample.json';
import companiesJson from '../../../public/json/companiesExample.json';
import {MOCK_SESSION_DATA} from '../../util/fixtures';
import {act} from 'react-dom/test-utils';

mockMatchMedia();
mockScrollTo();
const DEFAULT_PROPS = {};
const mockResponse = response =>
  Promise.resolve({
    json: () => Promise.resolve(response),
  });

describe('Dashboard', () => {
  nextauth.useSession = jest
    .fn()
    .mockReturnValue({data: MOCK_SESSION_DATA, session: 'authenticated'});

  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <Dashboard {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a heading with specific text', () => {
    const component = setup();
    const heading = component.getByRole('heading', {name: /My Applications/i});
    expect(heading).toBeInTheDocument();
  });

  it('renders the correct number of ApplicationSection components', async () => {
    global.fetch = jest.fn();
    global.fetch
      .mockReturnValueOnce(mockResponse(companiesJson))
      .mockReturnValueOnce(mockResponse(applicationsJson));

    const component = setup();
    const NUMBER_OF_SECTIONS = 3;
    const applicationSections = await component.findAllByTestId('ApplicationSection');
    expect(applicationSections).toHaveLength(NUMBER_OF_SECTIONS);
  });
});
