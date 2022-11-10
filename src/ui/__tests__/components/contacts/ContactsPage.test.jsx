import React from 'react';
import {render} from '@testing-library/react';
import ContactsPage from '../../../components/contacts/ContactsPage';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia, mockScrollTo} from '../../util/util';
import contactsJson from '../../../public/json/contactsExample.json';
import companiesJson from '../../../public/json/companiesExample.json';
import {MOCK_SESSION_DATA} from '../../util/fixtures';

mockMatchMedia();
mockScrollTo();
const DEFAULT_PROPS = {
  session: MOCK_SESSION_DATA,
};
const mockResponse = response =>
  Promise.resolve({
    json: () => Promise.resolve(response),
  });

describe('ContactsPage', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <ContactsPage {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a heading with specific text', () => {
    const component = setup();
    const heading = component.getByRole('heading', {name: /Contacts/i});
    expect(heading).toBeInTheDocument();
  });

  it('renders a table with company data', async () => {
    global.fetch = jest.fn();
    global.fetch
      .mockReturnValueOnce(mockResponse(contactsJson))
      .mockReturnValueOnce(mockResponse(companiesJson));

    const component = setup();
    const table = await component.findByRole('table');
    expect(table).toBeInTheDocument();
  });
});
