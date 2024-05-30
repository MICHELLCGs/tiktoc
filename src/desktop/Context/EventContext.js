import { useReducer, createContext } from 'react';
// import FunctionEvents from './FunctionEvents';

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const initState = {
    like: false,
    save: false,
    animationDots: false,
    volume: true,
    statusVideo: false,
    command: '',
    sizeVolume: 100,
    volumeBefore: 0,
    volumeNow: 0,
    doubleClickVideo: false,
    positionDoubleClickVideo: { x: null, y: null },
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'changeCommand': {
        return {
          ...state,
          command: action.payload,
        };
      }
      case 'checkAnimationPosition': {
        return {
          ...state,
          positionDoubleClickVideo: { x: action.payload.x, y: action.payload.y },
        };
      }
      case 'doubleClickVideo': {
        return {
          ...state,
          doubleClickVideo: action.payload ? action.payload : false,
        };
      }
      case 'like':
        return {
          ...state,
          like: action.payload ? action.payload : !state.like,
        };
      case 'save':
        return {
          ...state,
          save: action.payload ? action.payload : !state.save,
        };
      case 'animationDots':
        return {
          ...state,
          animationDots: !state.animationDots,
        };
      case 'statusVideo': {
        return {
          ...state,
          statusVideo: !state.statusVideo,
        };
      }
      case 'save-volume-now': {
        return {
          ...state,
          volumeNow: action.payload,
        };
      }
      case 'onChange-volume': {
        return {
          ...state,
          volumeBefore: action.payload,
        };
      }
      case 'volume': {
        return {
          ...state,
          volume: action.payload ? action.payload : !state.volume,
        };
      }
      case 'decrease-volume': {
        if (state.sizeVolume > 0) {
          return {
            ...state,
            sizeVolume: state.sizeVolume - (action.payload ? action.payload : 1) * 2.5,
          };
        }
      }
      case 'increase-volume': {
        if (state.sizeVolume < 100) {
          return {
            ...state,
            sizeVolume: state.sizeVolume + (action.payload ? action.payload : 1) * 2.5,
            volume: true,
          };
        } else {
          return {
            ...state,
            sizeVolume: 100,
            volume: true,
          };
        }
      }
      default:
        throw new Error("don't exist this action");
    }
  }
  const [state, dispatch] = useReducer(reducer, initState);
  return <EventContext.Provider value={[state, dispatch]}>{children}</EventContext.Provider>;
};

export { EventProvider };
export default EventContext;
