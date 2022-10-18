import React from 'react';
import {Flex, Heading, List, ListIcon, ListItem, Text, useBreakpointValue} from '@chakra-ui/react';
import {MdCheckCircle} from 'react-icons/md';
import PropTypes from 'prop-types';

export default function WhyJobTracker() {
  const fontSize = useBreakpointValue({
    base: '1.25rem',
    md: '1.75rem',
  });

  return (
    <Flex justifyContent="center">
      <Flex
        direction="column"
        height="100%"
        justifyContent="center"
        flexGrow="1"
        data-testid="WhyJobTracker"
      >
        <Heading
          bgGradient="linear(135deg, #396afc, #2948ff)"
          bgClip="text"
          fontWeight="extrabold"
          pl="36px"
        >
          Why use Job Tracker?
        </Heading>
        <List
          pt={12}
          spacing={16}
          color="#02299C"
          textShadow="1px 1px #fff"
          fontWeight="light"
          fontSize={fontSize}
        >
          <ListItem>
            <Flex alignItems="center">
              <ListIcon as={MdCheckCircle} color="#396afc" />
              <Text>Keep track of internship and job applications</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex alignItems="center">
              <ListIcon as={MdCheckCircle} color="#396afc" />
              <Text>Save information about interviews and contacts</Text>
            </Flex>
          </ListItem>

          <ListItem>
            <Flex alignItems="center">
              <ListIcon as={MdCheckCircle} color="#396afc" />
              <Text>Discover important skills required by employers</Text>
            </Flex>
          </ListItem>
        </List>
      </Flex>
    </Flex>
  );
}

WhyJobTracker.propTypes = {};

WhyJobTracker.defaultProps = {};
