import React from 'react';
import {Tag} from '@chakra-ui/react';
import PropTypes, {string} from 'prop-types';

export const APPLICATION_STATUS_MAP = {
  APPLIED: {
    text: 'Applied',
    fontColor: '#fff',
    backgroundColor: '#396afc',
  },
  ASSIGNED_OA: {
    text: 'Assigned OA',
    fontColor: '#fff',
    backgroundColor: '#396afc',
  },
  COMPLETED_OA: {
    text: 'Completed OA',
    fontColor: '#fff',
    backgroundColor: '#34bbe6',
  },
  PHONE_SCREEN_SCHEDULED: {
    text: 'Phone Screen Scheduled',
    fontColor: '#000',
    backgroundColor: '#49da9a',
  },
  PHONE_SCREEN_COMPLETE: {
    text: 'Phone Screen Complete',
    fontColor: '#000',
    backgroundColor: '#a3e048',
  },
  INTERVIEW_SCHEDULED: {
    text: 'Interview Scheduled',
    fontColor: '#000',
    backgroundColor: '#f7d038',
  },
  INTERVIEW_COMPLETE: {
    text: 'Interview Complete',
    fontColor: '#fff',
    backgroundColor: '#eb7532',
  },
  RECEIVED_OFFER: {
    text: 'Received Offer',
    fontColor: '#fff',
    backgroundColor: '#d93d54',
  },
  ACCEPTED_OFFER: {
    text: 'Accepted Offer',
    fontColor: '#000',
    backgroundColor: '#a3e048',
  },
  REJECTED_OFFER: {
    text: 'Rejected Offer',
    fontColor: '#fff',
    backgroundColor: '#d93d54',
  },
  REJECTED_BY_COMPANY: {
    text: 'Rejected By Company',
    fontColor: '#fff',
    backgroundColor: '#396afc',
  },
  POSITION_CANCELLED: {
    text: 'Position Cancelled',
    fontColor: '#000',
    backgroundColor: '#f7d038',
  },
  error: {
    text: 'Error',
    fontColor: '#fff',
    backgroundColor: '#666',
  },
};

export default function StatusLabel({status, id}) {
  if (APPLICATION_STATUS_MAP[status] === undefined) status = 'error';
  const {text, backgroundColor, fontColor} = APPLICATION_STATUS_MAP[status];
  return (
    <Tag
      size={'md'}
      key={id}
      bg={backgroundColor}
      color={fontColor}
      borderRadius="full"
      boxShadow="base"
      textAlign="center"
    >
      {text}
    </Tag>
  );
}

StatusLabel.propTypes = {
  status: string.isRequired,
  id: string.isRequired,
};

StatusLabel.defaultProps = {};
