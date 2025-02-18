import { useQuery } from 'react-query';

const useFetchJoke = () => {
  return useQuery({
    queryKey: ['joke'],
    queryFn: () => fetch('http://localhost:3003/api/joke').then((res) => res.json()),
  });
};

export default useFetchJoke;
