import React from 'react';
import {render} from '@testing-library/react';
import DeleteAlert from '../../../components/common/DeleteAlert';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';

mockMatchMedia();
const DEFAULT_PROPS = {
  isOpen: true,
  onClose: jest.fn(),
  onDelete: jest.fn(),
  entityName: 'Application',
};

describe('DeleteAlert', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <DeleteAlert {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders the alert dialog', () => {
    const component = setup();
    const heading = component.getByRole('alertdialog', {
      name: `Delete ${DEFAULT_PROPS.entityName}`,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the alert text', () => {
    const component = setup();
    const alertText = `Are you sure you want to delete this ${DEFAULT_PROPS.entityName.toLowerCase()}? You can't undo this action afterwards`;
    const text = component.getByText(alertText, {exact: false});
    expect(text).toBeInTheDocument();
  });

  it('renders the cancel and delete buttons', () => {
    const component = setup();
    const cancelButton = component.getByRole('button', {name: 'Cancel'});
    const deleteButton = component.getByRole('button', {name: 'Delete'});
    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
