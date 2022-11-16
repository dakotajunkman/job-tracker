import React from 'react';
import {render} from '@testing-library/react';
import StatusLabel from '../../../components/dashboard/StatusLabel';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import {APPLICATION_STATUS_MAP} from '../../../components/dashboard/StatusLabel';

mockMatchMedia();
const DEFAULT_PROPS = {
  status: 'APPLIED',
  id: 'c1465a83-b2a2-4059-b1b7-922ad5aa7213',
};

describe('StatusLabel', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <StatusLabel {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders the correct label text', () => {
    const component = setup();
    const {text} = APPLICATION_STATUS_MAP[DEFAULT_PROPS.status];
    const labelText = component.getByText(text);
    expect(labelText).toBeInTheDocument();
  });
});
