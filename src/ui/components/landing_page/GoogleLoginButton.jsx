import React from 'react';
import {signIn} from 'next-auth/react';
import {Button, Flex, Text} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Image from 'next/image';

export default function GoogleLoginButton({children}) {
  return (
    <Button
      h="50dp"
      p={0}
      bg="#4285F4"
      color="white"
      _hover={{background: '#4285F4'}}
      _active={{background: '#3367d6'}}
      minW="240px"
      borderRadius="sm"
      shadow="md"
      onClick={() => signIn('google')}
    >
      <Flex alignItems="center" gap="24px" pr="18px" w="100%">
        <Image
          src="/images/logos/btn_google_light_normal_ios.svg"
          alt="Google 'G' Logo"
          height="50dp"
          width="50dp"
        />
        <Text>Proceed with Google</Text>
      </Flex>
    </Button>
  );
}

GoogleLoginButton.propTypes = {};

GoogleLoginButton.defaultProps = {};
