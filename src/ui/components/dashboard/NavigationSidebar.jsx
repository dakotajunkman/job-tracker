import React from 'react';
import {Flex, Heading} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {MdBusiness, MdPeopleAlt, MdBarChart} from 'react-icons/md';
import NavigationLink from './NavigationLink';

export default function NavigationSidebar() {
  return (
    <Flex
      direction="column"
      bg="white"
      data-testid="NavigationSidebar"
      w="250px"
      minW="250px"
      p={2}
      pb={4}
      borderRadius="md"
      boxShadow="md"
      gap={2}
      color="#888"
    >
      <Heading size="md" color="#333" pl={8}>
        Navigation
      </Heading>
      <NavigationLink icon={MdBusiness} label="View Companies" href="/#" />
      <NavigationLink icon={MdPeopleAlt} label="View Contacts" href="/#" />
      <NavigationLink icon={MdBarChart} label="View Analytics" href="/#" />
    </Flex>
  );
}

NavigationSidebar.propTypes = {};

NavigationSidebar.defaultProps = {};
