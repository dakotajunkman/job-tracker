import React, {useEffect} from 'react';
import {Collapse, Flex, Heading, Icon, useDisclosure} from '@chakra-ui/react';
import ApplicationTable from './ApplicationTable';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';
import PropTypes, {arrayOf, bool, func, shape, string} from 'prop-types';

export default function ApplicationSection({heading, applicationData, startOpened, openModal}) {
  const {isOpen, onToggle} = useDisclosure();
  useEffect(() => {
    startOpened && onToggle();
  }, []);

  return (
    <Flex direction="column" data-testid="ApplicationSection">
      <Flex
        onClick={onToggle}
        alignItems="center"
        color={isOpen ? '#000' : '#888'}
        _hover={{color: isOpen ? '#444' : '#000', cursor: 'pointer'}}
        transition="0.2s"
        w="max-content"
      >
        <Icon as={isOpen ? MdKeyboardArrowDown : MdKeyboardArrowRight} w={6} h={6} pt={1} />
        <Heading size="md">
          {heading} ({applicationData.length})
        </Heading>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <ApplicationTable applications={applicationData} openModal={openModal} />
      </Collapse>
    </Flex>
  );
}

ApplicationSection.propTypes = {
  heading: string.isRequired,
  applicationData: arrayOf(
    shape({
      company: shape({
        id: string.isRequired,
        name: string.isRequired,
      }),
      positionTitle: string.isRequired,
      submitDate: string.isRequired,
      status: string.isRequired,
    })
  ),
  startOpened: bool,
  openModal: func.isRequired,
};

ApplicationSection.defaultProps = {
  heading: 'Applications',
  applicationData: [],
  startOpened: true,
};
