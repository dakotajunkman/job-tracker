import React from 'react';
import {render} from '@testing-library/react';
import CompaniesModal from '../../../components/companies/CompaniesModal';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import companiesJson from '../../../public/json/companiesExample.json';
import {MOCK_SESSION_DATA} from '../../util/fixtures';

mockMatchMedia();
const DEFAULT_PROPS = {
  header: 'Open Applications',
  isOpen: true,
  onClose: jest.fn(),
  companies: companiesJson.companies,
  token: MOCK_SESSION_DATA.jwt,
  addCompany: jest.fn(),
};

describe('CompaniesModal', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <CompaniesModal {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a dialog', () => {
    const component = setup();
    const dialog = component.getByRole('dialog', {name: DEFAULT_PROPS.header});
    expect(dialog).toBeInTheDocument();
  });

  it('renders buttons', () => {
    const BUTTON_NAMES = ['Close', 'Cancel', 'Save'];
    const component = setup();
    BUTTON_NAMES.forEach(name => {
      const button = component.getByRole('button', {name: name});
      expect(button).toBeInTheDocument();
    });
  });

  it('renders form text', () => {
    const FORM_TEXT = ['Company Name'];
    const component = setup();
    FORM_TEXT.forEach(text => {
      const formText = component.getByText(text);
      expect(formText).toBeInTheDocument();
    });
  });
});
