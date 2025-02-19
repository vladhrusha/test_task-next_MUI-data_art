'use client';
import { Button, CardActions, CardContent, Popover, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//
import { useFetchJoke } from '@/hooks/joke';

import Card from '@mui/material/Card';
import { useMutation, useQuery } from 'react-query';

const baseURL = process.env.BASE_URL;

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

const JokeCard = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const { isLoading, error, data: joke, refetch } = useFetchJoke();

  const mutation = useMutation({
    mutationFn: (label: string) => {
      return axios.post(`${baseURL}/api/joke/${joke.message.id}`, { label });
    },
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error;

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
          <p>Question: {joke.message.question}</p>
          <p>
            Answer:{''}
            <span
              style={{
                filter: showAnswer ? 'none' : 'blur(4px)',
              }}
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {joke.message.answer}
            </span>
          </p>
        </CardContent>

        <CardActions>
          <Stack alignItems='center' width='100%'>
            <Stack flexDirection='row' columnGap='16px' justifyContent='center' alignItems='center'>
              {joke.message.votes.map((vote: Vote, idx: number) => {
                return (
                  <p
                    key={idx}
                    onClick={() => {
                      mutation.mutate(vote.label);
                    }}
                  >
                    <span>{vote.value}</span>
                    <span>{vote.label}</span>
                  </p>
                );
              })}
            </Stack>
            <Button
              sx={{ padding: '0', margin: 0, alignSelf: 'end' }}
              onClick={() => {
                refetch();
              }}
            >
              Next
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default JokeCard;
