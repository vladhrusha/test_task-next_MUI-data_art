'use client';
import { Button, CardActions, CardContent, Popover, Stack } from '@mui/material';
import React, { useState } from 'react';

//
import { useFetchJoke } from '@/hooks/joke';

import Card from '@mui/material/Card';

// type CardProps = {
//   question: string;
//   answer: string;
// };

type Vote = {
  value: number;
  label: '😂' | '👍' | '❤️';
};

type Joke = {
  id: string;
  question: string;
  answer: string;
  votes: Vote[];
  availableVotes: string[];
};

const dummyJoke: Joke = {
  id: '1',
  question: 'Why do programmers prefer dark mode',
  answer: 'Because light attracts bugs',
  votes: [
    {
      value: 10,
      label: '😂',
    },
    {
      value: 11,
      label: '👍',
    },

    {
      value: 12,
      label: '❤️',
    },
  ],
  availableVotes: ['😂', '👍', '❤️'],
};

const JokeCard = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const [joke, setJoke] = useState<Joke>(dummyJoke);

  const fetchJoke = () => {
    console.log('clicked next');
  };

  const postVote = (label: any) => {};

  return (
    <Stack>
      <Card
        sx={{
          minWidth: 440,
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '50%',
          justifyContent: 'space-around',
        }}
      >
        <CardContent component={Stack} rowGap='16px'>
          <p>Question: {joke.question}</p>
          <p>
            Answer:
            <span
              style={{
                filter: showAnswer ? 'none' : 'blur(4px)',
              }}
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {joke.answer}
            </span>
          </p>
        </CardContent>

        <CardActions>
          <Stack alignItems='center' width='100%'>
            <Stack flexDirection='row' columnGap='16px' justifyContent='center' alignItems='center'>
              {joke.votes.map((vote, idx) => {
                return (
                  <p
                    key={idx}
                    onClick={() => {
                      postVote(vote.label);
                    }}
                  >
                    <span>{vote.value}</span>
                    <span>{vote.label}</span>
                  </p>
                );
              })}
            </Stack>
            <Button sx={{ padding: '0', margin: 0, alignSelf: 'end' }} onClick={fetchJoke}>
              Next
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default JokeCard;
