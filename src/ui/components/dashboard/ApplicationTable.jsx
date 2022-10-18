import React from 'react';
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react';
import PropTypes from 'prop-types';
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
      <Table variant="striped" style={{tableLayout: 'fixed'}} minW="600px">
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
            const {company_name, position_title, submit_date, status, application_id} = application;
            return (
              <Tr>
                <Td>{company_name}</Td>
                <Td>{position_title}</Td>
                <Td>{submit_date}</Td>
                <Td>
                  <StatusLabel status={status} key={application_id} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

ApplicationTable.propTypes = {};

ApplicationTable.defaultProps = {};
