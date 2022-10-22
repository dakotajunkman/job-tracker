import React from 'react';
import PropTypes, {any, object} from 'prop-types';
import {Button} from '@chakra-ui/react';

export default function PrimaryButton({children, ...props}) {
  return (
    <Button
      bgGradient="linear(135deg, #4472fc, #3753fa)"
      _hover={{
        bgGradient: 'linear(135deg, #396afc, #2948ff)',
      }}
      _active={{
        bgGradient: 'linear(135deg, #2f62fa, #2141fc)',
      }}
      color="white"
      shadow="md"
      {...props}
    >
      {children}
    </Button>
  );
}

PrimaryButton.propTypes = {
  children: any,
  props: object,
};

PrimaryButton.defaultProps = {};
