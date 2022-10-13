import React from 'react';
import {Box, Center, Flex, Heading, Text} from '@chakra-ui/react';
import PropTypes, {oneOfType, arrayOf, node} from 'prop-types';

export default function PageWrapper({children}) {
  return (
    <Flex
      direction="column"
      h="100%"
      w="100%"
      minH="100vh"
      justifyContent="space-between"
      bg="#efefef"
      bgImg="url('./images/backgrounds/landing-tile.png')"
      gap={16}
      data-testid="PageWrapper"
    >
      <Box
        w="100%"
        minH="60px"
        bg="white"
        pl={6}
        py={2}
        boxShadow="xl"
        data-testid="PageWrapperHeader"
      >
        <Heading bgGradient="linear(135deg, #396afc, #2948ff)" bgClip="text" fontWeight="extrabold">
          Job Tracker
        </Heading>
      </Box>
      <Center w="100%" flexGrow="1">
        {children}
      </Center>
      <Center
        bgGradient="linear(135deg, #396afc, #2948ff)"
        py={16}
        color="white"
        px={4}
        data-testid="PageWrapperFooter"
      >
        <Text>Job Tracker © Hudson Southey-Gordon, Dakota Junkman, Nic Nolan 2022</Text>
      </Center>
    </Flex>
  );
}

PageWrapper.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};

PageWrapper.defaultProps = {};
