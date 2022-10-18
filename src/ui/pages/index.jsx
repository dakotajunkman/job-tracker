import React from 'react';
import {useSession} from 'next-auth/react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Dashboard from '../components/dashboard/Dashboard';
import LandingPage from '../components/landing_page/LandingPage';

export default function Home() {
  const {data: session, status} = useSession();

  if (status === 'loading') return <LoadingSpinner />;

  /* Dashboard for Logged In Users */
  if (session) return <Dashboard />;

  /* Landing Page for Logged Out Users */
  return <LandingPage />;
}

Home.propTypes = {};

Home.defaultProps = {};
