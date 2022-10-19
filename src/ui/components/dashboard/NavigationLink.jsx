import React from 'react';
import {Icon, Link} from '@chakra-ui/react';
import NextLink from 'next/link';
import {any, string} from 'prop-types';

export default function NavigationLink({icon, label, href}) {
  return (
    <NextLink href={href} passHref>
      <Link
        fontWeight="600"
        display="flex"
        alignItems="center"
        gap={2}
        _hover={{color: '#396afc'}}
        _active={{color: '#2948ff'}}
      >
        <Icon as={icon} w={6} h={6} />
        {label}
      </Link>
    </NextLink>
  );
}

NavigationLink.propTypes = {
  icon: any.isRequired, // IconType
  label: string.isRequired,
  href: string,
};

NavigationLink.defaultProps = {
  href: '#',
};
