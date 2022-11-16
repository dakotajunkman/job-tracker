import React from 'react';
import {render} from '@testing-library/react';
import SkillsPage from '../../../components/skills/SkillsPage';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import skillsJson from '../../../public/json/skillsExample.json';
import {MOCK_SESSION_DATA} from '../../util/fixtures';

mockMatchMedia();

const DEFAULT_PROPS = {
  session: MOCK_SESSION_DATA,
};

describe('SkillsPage', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <SkillsPage {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a heading with specific text', () => {
    const component = setup();
    const heading = component.getByRole('heading', {name: /Skills/i});
    expect(heading).toBeInTheDocument();
  });

  it('renders a table with skills data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({data: skillsJson}),
      })
    );

    const component = setup();
    const table = await component.findByRole('table');
    expect(table).toBeInTheDocument();
  });
});
