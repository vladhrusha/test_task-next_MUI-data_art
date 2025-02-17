import React from 'react';

import JokeCard from '@/components/Card/Card';
import { Stack } from '@mui/material';
const HomePage = () => {
  return (
    <Stack alignItems='center'>
      <JokeCard question='my question' answer='my answer' />
    </Stack>
  );
};

export default HomePage;
