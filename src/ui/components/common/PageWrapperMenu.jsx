import React from 'react';
import {signOut} from 'next-auth/react';
import {Icon, IconButton, Link, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {GiHamburgerMenu} from 'react-icons/gi';
import {MdBusiness, MdPeopleAlt, MdBarChart, MdExitToApp} from 'react-icons/md';
import NextLink from 'next/link';

export default function PageWrapperMenu() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Navigation Menu"
        icon={<GiHamburgerMenu />}
        variant="ghost"
        color="#888"
        data-testid="NavigationMenu"
      />
      <MenuList>
        <NextLink href={'/'} passHref>
          <Link _hover={{textDecoration: 'none'}} data-testid="ViewApplicationsLink">
            <MenuItem icon={<Icon as={MdBusiness} w={6} h={6} />}>View Applications</MenuItem>
          </Link>
        </NextLink>
        <NextLink href={'/companies'} passHref>
          <Link _hover={{textDecoration: 'none'}} data-testid="ViewCompaniesLink">
            <MenuItem icon={<Icon as={MdBusiness} w={6} h={6} />}>View Companies</MenuItem>
          </Link>
        </NextLink>
        <NextLink href={'/#'} passHref>
          <Link _hover={{textDecoration: 'none'}} data-testid="ViewContactsLink">
            <MenuItem icon={<Icon as={MdPeopleAlt} w={6} h={6} />}>View Contacts</MenuItem>
          </Link>
        </NextLink>
        <NextLink href={'/#'} passHref>
          <Link _hover={{textDecoration: 'none'}} data-testid="ViewAnalyticsLink">
            <MenuItem icon={<Icon as={MdBarChart} w={6} h={6} />}>View Analytics</MenuItem>
          </Link>
        </NextLink>
        <MenuItem icon={<Icon as={MdExitToApp} w={6} h={6} />} onClick={() => signOut()}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
