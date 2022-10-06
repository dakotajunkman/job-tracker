import React from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Home() {
  const {data, error} = useSWR('/api/', fetcher);

  if (error) {
    // return <p>Error</p>;
  }
  // if (!data) return <p>Loading...</p>;

  return (
    <>
      <h1>Job Tracker</h1>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
