import { useReducer, createContext } from 'react';

const DataContext = createContext();

const DtaProvider = ({ children }) => {
  const initState = {
    auth: false,
  };

  function reducer(state, action) {}

  const [state, dispatch] = useReducer(reducer, initState);
};
