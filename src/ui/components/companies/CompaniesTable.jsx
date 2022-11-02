import React from 'react';
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function CompaniesTable({companies}) {
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
            <Th>Company Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {companies.map(company => {
            const {name, id} = company;
            return (
              <Tr key={`tr-${id}`}>
                <Td>{name}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

CompaniesTable.propTypes = {};

CompaniesTable.defaultProps = {
  companies: [],
};
