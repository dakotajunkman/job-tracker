import React from 'react';
import {useSession} from 'next-auth/react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {useRouter} from 'next/router';
import SkillsPage from '../components/skills/SkillsPage';

export default function Companies() {
  const {data: session, status} = useSession();
  const router = useRouter();

  if (status === 'loading') return <LoadingSpinner />;

  /* Redirect Logged Out Users */
  if (!session) {
    router.push('/');
    // Show spinner instead of white screen during redirect
    return <LoadingSpinner />;
  }

  return <SkillsPage session={session} />;
}

Companies.propTypes = {};

Companies.defaultProps = {};
