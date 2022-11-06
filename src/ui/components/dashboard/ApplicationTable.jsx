import React from 'react';
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react';
import PropTypes, {arrayOf, shape, string} from 'prop-types';
import StatusLabel from './StatusLabel';

export default function ApplicationTable({applications}) {
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
        data-testid="ApplicationTable"
      >
        <Thead>
          <Tr>
            <Th>Company</Th>
            <Th>Position</Th>
            <Th>Date Submitted</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {applications.map(application => {
            const {company, positionTitle, submitDate, status, id} = application;
            return (
              <Tr key={`tr-${id}`}>
                <Td>{company.name}</Td>
                <Td>{positionTitle}</Td>
                <Td>{submitDate}</Td>
                <Td>
                  <StatusLabel status={status} id={id} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

ApplicationTable.propTypes = {
  applications: arrayOf(
    shape({
      id: string.isRequired,
      positionTitle: string.isRequired,
      submitDate: string.isRequired,
      status: string.isRequired,
      skills: arrayOf(string),
      notes: string,
      company: shape({
        id: string.isRequired,
        name: string.isRequired,
      }),
    })
  ),
};

ApplicationTable.defaultProps = {
  applications: [],
};
