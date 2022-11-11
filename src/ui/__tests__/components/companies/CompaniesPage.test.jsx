import React from 'react';
import {render} from '@testing-library/react';
import CompaniesPage from '../../../components/companies/CompaniesPage';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import companiesJson from '../../../public/json/companiesExample.json';
import {MOCK_SESSION_DATA} from '../../util/fixtures';

mockMatchMedia();

const DEFAULT_PROPS = {
  session: MOCK_SESSION_DATA,
};

describe('CompaniesPage', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <CompaniesPage {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a heading with specific text', () => {
    const component = setup();
    const heading = component.getByRole('heading', {name: /Job Tracker Companies/i});
    expect(heading).toBeInTheDocument();
  });

  it('renders a table with company data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({data: companiesJson}),
      })
    );

    const component = setup();
    const table = await component.findByRole('table');
    expect(table).toBeInTheDocument();
  });
});
