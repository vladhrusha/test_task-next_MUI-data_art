import React from 'react';

import JokeCard from '@/components/Card/Card';
import { Stack } from '@mui/material';
const HomePage = () => {
  return (
    <Stack alignItems='center'>
      <JokeCard />
    </Stack>
  );
};

export default HomePage;
