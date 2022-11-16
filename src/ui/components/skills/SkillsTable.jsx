import React from 'react';
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react';
import PropTypes, {arrayOf, func, number, shape, string} from 'prop-types';

export default function SkillsTable({skills}) {
  return (
    <TableContainer
      border="1px solid #ddd"
      borderRadius={4}
      my={2}
      boxShadow="base"
      whiteSpace="wrap"
    >
      <Table
        variant="striped"
        style={{tableLayout: 'fixed'}}
        minW="600px"
        data-testid="SkillsTable"
      >
        <Thead>
          <Tr>
            <Th>Ranking</Th>
            <Th>Skill Name</Th>
            <Th>Frequency</Th>
          </Tr>
        </Thead>
        <Tbody>
          {skills.map((skill, index) => {
            const {skillName, frequency, id} = skill;
            return (
              <Tr
                key={`tr-${id}`}
              >
                <Td>{index + 1}</Td>
                <Td>{skillName}</Td>
                <Td>{frequency}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

SkillsTable.propTypes = {
  skills: arrayOf(
    shape({
      id: string.isRequired,
      skillName: string.isRequired,
      frequency: number.isRequired
    })
  ),
};

SkillsTable.defaultProps = {
  skills: [],
};
