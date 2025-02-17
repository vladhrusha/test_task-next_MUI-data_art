import { useEffect, useState } from 'react';

const useFetchJoke = () => {
  const [joke, setJoke] = useState();
  const [jokeError, setJokeError] = useState<any>();
  const [jokeLoading, setJokeLoading] = useState<boolean>(true);

  useEffect(() => {
    setJokeLoading(true);
  }, []);
};

export default useFetchJoke;
