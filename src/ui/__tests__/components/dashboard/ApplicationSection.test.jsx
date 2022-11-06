import React from 'react';
import {render} from '@testing-library/react';
import ApplicationSection from '../../../components/dashboard/ApplicationSection';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia, mockScrollTo} from '../../util/util';
import applicationJson from '../../../public/json/applicationsExample.json';

mockMatchMedia();
mockScrollTo();
const openApplications = applicationJson.filter(app => app.status === 'APPLIED');
const DEFAULT_PROPS = {
  heading: 'Open Applications',
  applicationData: openApplications,
  startOpened: true,
};

describe('ApplicationSection', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <ApplicationSection {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders the heading', () => {
    const component = setup();
    const headingRegex = new RegExp(DEFAULT_PROPS.heading, 'i');
    const heading = component.getByRole('heading', {name: headingRegex});
    expect(heading).toBeInTheDocument();
  });

  it('renders the number of applications in the heading', () => {
    const component = setup();
    const appCountRegex = new RegExp(`(${DEFAULT_PROPS.applicationData.length})`, 'i');
    const count = component.getByRole('heading', {name: appCountRegex});
    expect(count).toBeInTheDocument();
  });

  it('renders the ApplicationTable component', () => {
    const component = setup();
    const applicationTable = component.getByTestId('ApplicationTable');
    expect(applicationTable).toBeInTheDocument();
  });
});
