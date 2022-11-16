import React from 'react';
import PropTypes, {any, object} from 'prop-types';
import {Button} from '@chakra-ui/react';

export default function DangerButton({children, ...props}) {
  return (
    <Button colorScheme="red" shadow="md" {...props}>
      {children}
    </Button>
  );
}

DangerButton.propTypes = {
  children: any,
  props: object,
};

DangerButton.defaultProps = {};
