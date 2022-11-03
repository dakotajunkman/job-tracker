import React from 'react';
import {signOut} from 'next-auth/react';
import {Button, Center, Flex, Heading, Link, Text, useBreakpointValue} from '@chakra-ui/react';
import PropTypes, {oneOfType, arrayOf, node} from 'prop-types';
('react-icons/md');
import PageWrapperMenu from './PageWrapperMenu';
import NextLink from 'next/link';

export default function PageWrapper({children, showBackground, showMenu}) {
  const signoutButton = (
    <Button variant="link" color="#888" onClick={() => signOut()} _hover={{color: '#396afc'}}>
      Sign Out
    </Button>
  );
  const hamburgerMenu = <PageWrapperMenu />;
  const menu = useBreakpointValue({
    base: hamburgerMenu,
    lg: signoutButton,
  });
  return (
    <Flex
      direction="column"
      h="100%"
      w="100%"
      minH="100vh"
      justifyContent="space-between"
      bg="#efefef"
      bgImg={showBackground ? "url('./images/backgrounds/landing-tile.png')" : 'none'}
      gap={16}
      data-testid="PageWrapper"
    >
      <Flex
        w="100%"
        minH="60px"
        bg="white"
        px={6}
        py={2}
        boxShadow="xl"
        justifyContent="space-between"
        data-testid="PageWrapperHeader"
      >
        <NextLink href={'/'} passHref>
          <Link
            py="4px"
            transition=".25s"
            _hover={{textDecoration: 'none', padding: '2px 0 6px 0'}}
          >
            <Heading
              bgGradient="linear(135deg, #396afc, #2948ff)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Job Tracker
            </Heading>
          </Link>
        </NextLink>
        <Flex>{showMenu && menu}</Flex>
      </Flex>
      <Flex w="100%" flexGrow="1" justifyContent="center" data-testid="PageWrapperBody">
        {children}
      </Flex>
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

PageWrapper.defaultProps = {
  showBackground: false,
  showMenu: true,
};
