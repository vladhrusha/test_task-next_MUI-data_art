'use client';
import { Button, CardActions, CardContent, Popover, Stack } from '@mui/material';
import React, { useState } from 'react';
import { string } from 'zod';

import Card from '@mui/material/Card';

type CardProps = {
  question: string;
  answer: string;
};

const JokeCard = ({ question, answer }: CardProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenReactions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
    console.log('clicked');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  return (
    <Stack>
      <Card sx={{ minWidth: 275, width: '50%' }}>
        <CardContent>
          <p>Question: {question}</p>
          <p>Question: {answer}</p>

          <Stack>Reactions</Stack>
        </CardContent>

        <CardActions>
          <Button size='small' onClick={handleOpenReactions}>
            React
          </Button>
        </CardActions>
        <Popover
          //   id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {' '}
          the content
        </Popover>
      </Card>
    </Stack>
  );
};

export default JokeCard;
