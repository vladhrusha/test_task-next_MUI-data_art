import { useRef } from 'react';

type useDebounceProps = {
  timerDelay?: number;
};

const useDebounce = ({ timerDelay = 500 }: useDebounceProps) => {
  const timerId = useRef<NodeJS.Timeout | undefined>(undefined);

  const debounce = (callback: () => any) => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(callback, timerDelay);
  };
  return debounce;
};

export default useDebounce;
