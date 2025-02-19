import { useQuery } from 'react-query';

const baseURL = process.env.BASE_URL;

const useFetchJoke = () => {
  return useQuery({
    queryKey: ['joke'],
    queryFn: () => fetch(`${baseURL}/api/joke`).then((res) => res.json()),
  });
};

export default useFetchJoke;
