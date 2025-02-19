'use client';
import React, { useEffect, useState } from 'react';

import { Box, Button, CardActions, CardContent, Popover, Stack } from '@mui/material';
import Card from '@mui/material/Card';

import axios from 'axios';

import { useFetchJoke } from '@/hooks/joke';

import { useMutation } from 'react-query';

import useDebounce from '@/hooks/useDebounce';

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
  const debounce = useDebounce({ timerDelay: 500 });

  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const { isLoading, error, data, refetch } = useFetchJoke();

  const [joke, setJoke] = useState<Joke | null>(null);

  useEffect(() => {
    if (data) {
      setJoke(data.message);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (label: string) => {
      return axios.post(`${baseURL}/api/joke/${joke!.id}`, { label });
    },
    onSuccess: (_, label) => {
      setJoke((prevJoke) =>
        prevJoke
          ? {
              ...prevJoke,
              votes: prevJoke.votes.map((vote) =>
                vote.label === label ? { ...vote, value: vote.value + 1 } : vote
              ),
            }
          : prevJoke
      );
    },
  });

  const handleMutation = (label: string) => {
    debounce(() => {
      mutation.mutate(label);
    });
  };

  if (isLoading) return 'Loading...';

  if (error || !joke) return 'An error has occurred: ' + error;

  return (
    <Card
      sx={{
        minWidth: '340px',
        maxWidth: '70%',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        padding: '16px',
      }}
    >
      <CardContent component={Stack} rowGap='16px'>
        <p>Question: {joke.question}</p>
        <p>
          Answer:{''}
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
            {joke.votes.map((vote: Vote, idx: number) => {
              return (
                <Box
                  component='p'
                  key={idx}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      borderRadius: '4px',
                    },
                  }}
                  onClick={() => {
                    handleMutation(vote.label);
                    // mutation.mutate(vote.label)
                  }}
                >
                  <span>{vote.value}</span>
                  <span>{vote.label}</span>
                </Box>
              );
            })}
          </Stack>
          <Button
            sx={{ padding: '0', margin: 0, alignSelf: 'end' }}
            onClick={() => {
              refetch();
              setShowAnswer(false);
            }}
          >
            Next
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default JokeCard;
