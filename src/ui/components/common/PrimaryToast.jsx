import React from 'react';
import {CloseButton, Flex, Heading, Icon, Text, useToast} from '@chakra-ui/react';

export default function PrimaryToast({title, description, icon}) {
  const toast = useToast();

  return (
    <Flex
      color="white"
      p={3}
      bg="blue.500"
      bgGradient="linear(135deg, #396afc, #2948ff)"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="md"
      gap={2}
      boxShadow="dark-lg"
    >
      <Icon as={icon} w={6} h={6} />
      <Flex direction="column">
        <Heading size="md">{title}</Heading>
        <Text>{description}</Text>
      </Flex>
      <CloseButton onClick={toast.closeAll} />
    </Flex>
  );
}

PrimaryToast.propTypes = {};

PrimaryToast.defaultProps = {};
