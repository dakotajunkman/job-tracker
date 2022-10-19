import React from 'react';
import {Tag} from '@chakra-ui/react';
import PropTypes, {string} from 'prop-types';

export const APPLICATION_STATUS_MAP = {
  applied: {
    text: 'Applied',
    fontColor: '#fff',
    backgroundColor: '#396afc',
  },
  assigned_oa: {
    text: 'Assigned OA',
    fontColor: '#fff',
    backgroundColor: '#396afc',
  },
  completed_oa: {
    text: 'Completed OA',
    fontColor: '#fff',
    backgroundColor: '#34bbe6',
  },
  phone_screen_scheduled: {
    text: 'Phone Screen Scheduled',
    fontColor: '#000',
    backgroundColor: '#49da9a',
  },
  phone_screen_complete: {
    text: 'Phone Screen Complete',
    fontColor: '#000',
    backgroundColor: '#a3e048',
  },
  interview_scheduled: {
    text: 'Interview Scheduled',
    fontColor: '#000',
    backgroundColor: '#f7d038',
  },
  interview_complete: {
    text: 'Interview Complete',
    fontColor: '#fff',
    backgroundColor: '#eb7532',
  },
  received_offer: {
    text: 'Received Offer',
    fontColor: '#fff',
    backgroundColor: '#d93d54',
  },
  accepted_offer: {
    text: 'Accepted Offer',
    fontColor: '#000',
    backgroundColor: '#a3e048',
  },
  rejected_offer: {
    text: 'Rejected Offer',
    fontColor: '#fff',
    backgroundColor: '#d93d54',
  },
  rejected_by_company: {
    text: 'Rejected By Company',
    fontColor: '#fff',
    backgroundColor: '#396afc',
  },
  position_cancelled: {
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
