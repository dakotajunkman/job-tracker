import React, {useState, useEffect} from 'react';
import PropTypes, {shape, string} from 'prop-types';
import useSWR from 'swr';
import PageWrapper from '../common/PageWrapper';
import NavigationSidebar from '../common/navigation/NavigationSidebar';
import {
  Flex,
  Heading,
  Icon,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import SkillsTable from '../skills/SkillsTable';
import LoadingSpinner from '../common/LoadingSpinner';

const fetcher = (url, token) =>
  fetch(url, {
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
  }).then(res => res.json());

export default function SkillsPage({session}) {
  const {jwt} = session;
  const {data: skillsData, error: skillsError} = useSWR(['/api/skills', jwt], fetcher);
  const [skills, setSkills] = useState([]);

  const showSidebar = useBreakpointValue({
    base: false,
    lg: true,
  });

  // Capture the data from SWR in our useState variable
  useEffect(() => setSkills(skillsData?.skills || []), [skillsData]);

  return (
    <PageWrapper>
      <Flex maxW="1200px" w="100%" gap={4} h="100%" alignItems="flex-start" mx={4}>
        {showSidebar && <NavigationSidebar />}
        <Flex
          direction="column"
          bg="white"
          flexGrow="1"
          p={4}
          pb={8}
          borderRadius="md"
          boxShadow="lg"
          gap={8}
          maxW="100%"
          overflowX="hidden"
        >
          <Flex direction="column">
              <Heading size="lg">Skills</Heading>
              <Text color="#888">Showing {skills ? skills.length : '0'} skills</Text>
            {(!skillsData || skillsError) ?(
              <LoadingSpinner />
            ) : (
              <SkillsTable skills={skills} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </PageWrapper>
  );
}

SkillsPage.propTypes = {
  session: shape({
    jwt: string.isRequired,
  }).isRequired,
};

SkillsPage.defaultProps = {};
