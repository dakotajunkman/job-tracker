import React from 'react';
import {render, within} from '@testing-library/react';
import ContactsTable from '../../../components/contacts/ContactsTable';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import contactsJson from '../../../public/json/contactsExample.json';

mockMatchMedia();
const DEFAULT_PROPS = {
  contacts: contactsJson,
  openModal: jest.fn(),
};

describe('ContactsTable', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <ContactsTable {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders the table column headers', () => {
    const component = setup();
    const columnNames = ['Company', 'Contact Name', 'Position'];
    columnNames.forEach(name => {
      const columnHeader = component.getByRole('columnheader', {name: name});
      expect(columnHeader).toBeInTheDocument();
    });
  });

  it('renders a row for each contact', () => {
    const component = setup();
    const rows = component.getAllByRole('row');
    expect(rows).toHaveLength(DEFAULT_PROPS.contacts.length + 1); // plus header row
  });

  it('renders content in each row corresponding to the contact', () => {
    const component = setup();
    const rows = component.getAllByRole('row');
    rows.shift(); // Remove Header row
    rows.forEach((row, index) => {
      const {company, positionTitle, fullName} = DEFAULT_PROPS.contacts[index];
      expect(within(row).getByText(company.name)).toBeInTheDocument();
      expect(within(row).getByText(fullName)).toBeInTheDocument();
      expect(within(row).getByText(positionTitle)).toBeInTheDocument();
    });
  });
});
