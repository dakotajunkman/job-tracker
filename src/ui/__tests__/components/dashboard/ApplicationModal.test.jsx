import React from 'react';
import {render} from '@testing-library/react';
import ApplicationModal from '../../../components/dashboard/ApplicationModal';
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
  application: null,
};

describe('ApplicationSection', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <ApplicationModal {...props} />
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
    const FORM_TEXT = ['Company', 'Position Title', 'Submit Date', 'Status', 'Skills', 'Notes'];
    const component = setup();
    FORM_TEXT.forEach(text => {
      const formText = component.getByText(text);
      expect(formText).toBeInTheDocument();
    });
  });
});
