import { useContext } from 'react';
import EventContext from './EventContext';

export const useEventContext = () => {
  return useContext(EventContext);
};
