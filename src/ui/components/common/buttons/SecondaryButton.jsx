import React from 'react';
import PropTypes, {any, object} from 'prop-types';
import {Button} from '@chakra-ui/react';

export default function SecondaryButton({children, ...props}) {
  return (
    <Button
      variant="outline"
      color="#888"
      _hover={{color: '#396afc'}}
      _active={{color: '#2948ff'}}
      shadow="base"
      {...props}
    >
      {children}
    </Button>
  );
}

SecondaryButton.propTypes = {
  children: any,
  props: object,
};

SecondaryButton.defaultProps = {};
