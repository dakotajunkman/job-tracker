import React from 'react';
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react';
import PropTypes, {arrayOf, func, shape, string} from 'prop-types';

export default function ContactsTable({contacts, openModal}) {
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
        data-testid="ContactsTable"
      >
        <Thead>
          <Tr>
            <Th>Company</Th>
            <Th>Contact Name</Th>
            <Th>Position</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contacts.map(contact => {
            const {company, positionTitle, fullName, id} = contact;
            return (
              <Tr
                key={`tr-${id}`}
                _hover={{cursor: 'pointer', color: '#396afc'}}
                _active={{color: '#2948ff'}}
                onClick={() => openModal(contact)}
              >
                <Td>{company.name}</Td>
                <Td>{fullName}</Td>
                <Td>{positionTitle}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

ContactsTable.propTypes = {
  contacts: arrayOf(
    shape({
      id: string.isRequired,
      positionTitle: string,
      fullName: string.isRequired,
      company: shape({
        id: string.isRequired,
        name: string.isRequired,
      }),
    })
  ),
  openModal: func.isRequired,
};

ContactsTable.defaultProps = {
  contacts: [],
};
