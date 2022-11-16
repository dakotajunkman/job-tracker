import React from 'react';
import {render, within} from '@testing-library/react';
import SkillsTable from '../../../components/skills/SkillsTable';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import skillsJson from '../../../public/json/skillsExample.json';

const DEFAULT_PROPS = {
  skills: skillsJson.skills,
};

describe('SkillsTable', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <SkillsTable {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders the table column headers', () => {
    const component = setup();
    const columnNames = ['Ranking', 'Skill Name', 'Frequency'];
    columnNames.forEach(name => {
      const columnHeader = component.getByRole('columnheader', {name: name});
      expect(columnHeader).toBeInTheDocument();
    });
  });

  it('renders a row for each skills', () => {
    const component = setup();
    const rows = component.getAllByRole('row');
    expect(rows).toHaveLength(DEFAULT_PROPS.skills.length + 1); // plus header row
  });

  it('renders content in each row corresponding to the skill', () => {
    const component = setup();
    const rows = component.getAllByRole('row');
    rows.shift(); // Remove Header row
    rows.forEach((row, index) => {
      const {skillName, frequency} = DEFAULT_PROPS.skills[index];
      expect(within(row).getByText(skillName)).toBeInTheDocument();
      expect(within(row).getByText(frequency)).toBeInTheDocument();
    });
  });
});
