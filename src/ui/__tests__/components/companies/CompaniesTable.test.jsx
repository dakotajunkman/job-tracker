import React from 'react';
import {render, within} from '@testing-library/react';
import CompaniesTable from '../../../components/companies/CompaniesTable';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import companiesJson from '../../../public/json/companiesExample.json';

const DEFAULT_PROPS = {
  companies: companiesJson,
};

describe('ApplicationTable', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <CompaniesTable {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders the table column headers', () => {
    const component = setup();
    const columnNames = ['Company Name'];
    columnNames.forEach(name => {
      const columnHeader = component.getByRole('columnheader', {name: name});
      expect(columnHeader).toBeInTheDocument();
    });
  });

  it('renders a row for each company', () => {
    const component = setup();
    const rows = component.getAllByRole('row');
    expect(rows).toHaveLength(DEFAULT_PROPS.companies.length + 1); // plus header row
  });

  it('renders content in each row corresponding to the application', () => {
    const component = setup();
    const rows = component.getAllByRole('row');
    rows.shift(); // Remove Header row
    rows.forEach((row, index) => {
      const {name} = DEFAULT_PROPS.companies[index];
      expect(within(row).getByText(name)).toBeInTheDocument();
    });
  });
});
