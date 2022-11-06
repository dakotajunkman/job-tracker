import React from 'react';
import {render, within} from '@testing-library/react';
import ApplicationTable from '../../../components/dashboard/ApplicationTable';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import applicationJson from '../../../public/json/applicationsExample.json';
import {APPLICATION_STATUS_MAP} from '../../../components/dashboard/StatusLabel';

mockMatchMedia();
const openApplications = applicationJson.filter(app => app.status === 'APPLIED');
const DEFAULT_PROPS = {
  applications: openApplications,
};

describe('ApplicationTable', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <ApplicationTable {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders the table column headers', () => {
    const component = setup();
    const columnNames = ['Company', 'Position', 'Date Submitted', 'Status'];
    columnNames.forEach(name => {
      const columnHeader = component.getByRole('columnheader', {name: name});
      expect(columnHeader).toBeInTheDocument();
    });
  });

  it('renders a row for each application', () => {
    const component = setup();
    const rows = component.getAllByRole('row');
    expect(rows).toHaveLength(DEFAULT_PROPS.applications.length + 1); // plus header row
  });

  it('renders content in each row corresponding to the application', () => {
    const component = setup();
    const rows = component.getAllByRole('row');
    rows.shift(); // Remove Header row
    rows.forEach((row, index) => {
      const {company, positionTitle, submitDate, status} = DEFAULT_PROPS.applications[index];
      expect(within(row).getByText(company.name)).toBeInTheDocument();
      expect(within(row).getByText(positionTitle)).toBeInTheDocument();
      expect(within(row).getByText(submitDate)).toBeInTheDocument();
      expect(within(row).getByText(APPLICATION_STATUS_MAP[status].text)).toBeInTheDocument();
    });
  });
});
