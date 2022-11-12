import React, {useRef} from 'react';
import PropTypes, {bool, func, string} from 'prop-types';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import DangerButton from './buttons/DangerButton';
import SecondaryButton from './buttons/SecondaryButton';

export default function DeleteAlert({isOpen, onClose, onDelete, entityName}) {
  const cancelRef = useRef();

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      blockScrollOnMount={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {entityName}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete this {entityName.toLowerCase()}? You can't undo this
            action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter display="flex" gap={2}>
            <SecondaryButton innerRef={cancelRef} onClick={onClose}>
              Cancel
            </SecondaryButton>
            <DangerButton colorScheme="red" onClick={handleDelete}>
              Delete
            </DangerButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

DeleteAlert.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  onDelete: func.isRequired,
  entityName: string.isRequired,
};

DeleteAlert.defaultProps = {};
