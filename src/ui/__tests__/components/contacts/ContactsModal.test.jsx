import React from 'react';
import {render} from '@testing-library/react';
import ContactsModal from '../../../components/contacts/contactsModal';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import {MOCK_SESSION_DATA} from '../../util/fixtures';

mockMatchMedia();
const DEFAULT_PROPS = {
  type: 'New',
  isOpen: true,
  onClose: jest.fn(),
  token: MOCK_SESSION_DATA.jwt,
  onSave: jest.fn(),
  onDelete: jest.fn(),
  contact: null,
};

describe('ContactsModal', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <ContactsModal {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a dialog', () => {
    const component = setup();
    const dialog = component.getByRole('dialog');
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
    const FORM_TEXT = [
      'Company',
      'Contact Name',
      'Position Title',
      'Email Address',
      'Phone Number',
      'Notes',
    ];
    const component = setup();
    FORM_TEXT.forEach(text => {
      const formText = component.getByText(text);
      expect(formText).toBeInTheDocument();
    });
  });
});
